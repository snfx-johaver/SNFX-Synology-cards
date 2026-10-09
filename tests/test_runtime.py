"""Verify frontend module registration, unload and bundle switching."""

from types import SimpleNamespace
from unittest.mock import AsyncMock, Mock, patch

from homeassistant.components import frontend

from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.synology_cards import async_setup_entry, async_unload_entry
from custom_components.synology_cards.const import CONF_USE_PORTAINER, DOMAIN, VERSION


async def test_only_selected_bundle_is_loaded(hass):
    entry = MockConfigEntry(domain=DOMAIN, data={CONF_USE_PORTAINER: False})
    entry.add_to_hass(hass)
    hass.data[frontend.DATA_EXTRA_MODULE_URL] = frontend.UrlManager(Mock(), [])
    register = AsyncMock()
    with (
        patch.object(hass, "http", SimpleNamespace(async_register_static_paths=register), create=True),
    ):
        assert await async_setup_entry(hass, entry)
        assert hass.data[frontend.DATA_EXTRA_MODULE_URL].urls == {f"/synology_cards/synology-cards-dsm.js?v={VERSION}"}
        register.assert_awaited_once()
        assert await async_unload_entry(hass, entry)
        assert not hass.data[frontend.DATA_EXTRA_MODULE_URL].urls
        hass.config_entries.async_update_entry(entry, options={CONF_USE_PORTAINER: True})
        assert await async_setup_entry(hass, entry)
        assert hass.data[frontend.DATA_EXTRA_MODULE_URL].urls == {f"/synology_cards/synology-cards.js?v={VERSION}"}
        register.assert_awaited_once()
