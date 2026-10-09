"""Verify frontend module registration, unload and bundle switching."""

from types import SimpleNamespace
from unittest.mock import AsyncMock, Mock, patch

from homeassistant.components import frontend
import pytest

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


@pytest.mark.parametrize("use_portainer", [False, True])
async def test_real_setup_serves_selected_bundle_and_options_switch_it(
    hass, hass_client, use_portainer
):
    entry = MockConfigEntry(
        domain=DOMAIN, data={CONF_USE_PORTAINER: use_portainer}
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    filename = "synology-cards.js" if use_portainer else "synology-cards-dsm.js"
    url = f"/synology_cards/{filename}?v={VERSION}"
    assert url in hass.data[frontend.DATA_EXTRA_MODULE_URL].urls
    client = await hass_client()
    response = await client.get(url)
    assert response.status == 200
    bundle = await response.text()
    assert "disk_smart_status" in bundle
    assert ("restart_container" in bundle) is use_portainer

    hass.config_entries.async_update_entry(
        entry, options={CONF_USE_PORTAINER: not use_portainer}
    )
    await hass.async_block_till_done()
    other = "synology-cards-dsm.js" if use_portainer else "synology-cards.js"
    assert f"/synology_cards/{other}?v={VERSION}" in hass.data[frontend.DATA_EXTRA_MODULE_URL].urls
    assert url not in hass.data[frontend.DATA_EXTRA_MODULE_URL].urls
    assert await hass.config_entries.async_unload(entry.entry_id)
    assert f"/synology_cards/{other}?v={VERSION}" not in hass.data[frontend.DATA_EXTRA_MODULE_URL].urls
