"""Load Synology cards with optional Portainer support."""

from pathlib import Path

from homeassistant.components import frontend
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import CONF_USE_PORTAINER, DOMAIN, STATIC_URL, VERSION

type SynologyCardsEntry = ConfigEntry[str]


async def async_setup_entry(hass: HomeAssistant, entry: SynologyCardsEntry) -> bool:
    """Serve bundled modules and load only the configured feature set."""
    data = hass.data.setdefault(DOMAIN, {})
    if not data.get("static_registered"):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL, str(Path(__file__).parent / "www"), False)]
        )
        data["static_registered"] = True
    use_portainer = entry.options.get(
        CONF_USE_PORTAINER, entry.data[CONF_USE_PORTAINER]
    )
    filename = "synology-cards.js" if use_portainer else "synology-cards-dsm.js"
    entry.runtime_data = f"{STATIC_URL}/{filename}?v={VERSION}"
    frontend.add_extra_js_url(hass, entry.runtime_data)
    entry.async_on_unload(entry.add_update_listener(async_update_options))
    return True


async def async_update_options(hass: HomeAssistant, entry: SynologyCardsEntry) -> None:
    """Reload the frontend module choice after options change."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: SynologyCardsEntry) -> bool:
    """Stop loading this integration's module in new browser sessions."""
    frontend.remove_extra_js_url(hass, entry.runtime_data)
    return True
