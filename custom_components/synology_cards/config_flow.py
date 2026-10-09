"""Configure which Synology cards to load."""

from typing import Any

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.data_entry_flow import FlowResult

from .const import CONF_USE_PORTAINER, DOMAIN


def _schema(use_portainer: bool) -> vol.Schema:
    return vol.Schema({vol.Required(CONF_USE_PORTAINER, default=use_portainer): bool})


class SynologyCardsConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Set up the cards once per Home Assistant installation."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        errors = {}
        if user_input is not None:
            if (
                user_input[CONF_USE_PORTAINER]
                and not self.hass.config_entries.async_entries("portainer")
            ):
                errors["base"] = "portainer_not_configured"
            else:
                return self.async_create_entry(title="SNFX Synology Cards", data=user_input)
        return self.async_show_form(
            step_id="user",
            data_schema=_schema(
                user_input[CONF_USE_PORTAINER]
                if user_input
                else bool(self.hass.config_entries.async_entries("portainer"))
            ),
            errors=errors,
        )

    @staticmethod
    @callback
    def async_get_options_flow(
        config_entry: config_entries.ConfigEntry,
    ) -> "SynologyCardsOptionsFlow":
        return SynologyCardsOptionsFlow()


class SynologyCardsOptionsFlow(config_entries.OptionsFlow):
    """Change optional Docker support without reinstalling the integration."""

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        errors = {}
        if user_input is not None:
            if (
                user_input[CONF_USE_PORTAINER]
                and not self.hass.config_entries.async_entries("portainer")
            ):
                errors["base"] = "portainer_not_configured"
            else:
                return self.async_create_entry(title="", data=user_input)
        default = self.config_entry.options.get(
            CONF_USE_PORTAINER, self.config_entry.data[CONF_USE_PORTAINER]
        )
        return self.async_show_form(
            step_id="init",
            data_schema=_schema(user_input[CONF_USE_PORTAINER] if user_input else default),
            errors=errors,
        )
