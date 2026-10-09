"""Verify optional Portainer setup and options using real Home Assistant flows."""

from unittest.mock import AsyncMock, patch

from homeassistant.config_entries import SOURCE_USER
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.synology_cards.const import CONF_USE_PORTAINER, DOMAIN


async def test_setup_without_portainer(hass):
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": SOURCE_USER}
    )
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "user"
    with patch("custom_components.synology_cards.async_setup_entry", return_value=True):
        result = await hass.config_entries.flow.async_configure(
            result["flow_id"], {CONF_USE_PORTAINER: False}
        )
        await hass.async_block_till_done()
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["data"] == {CONF_USE_PORTAINER: False}


async def test_reject_portainer_without_config_entry(hass):
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {CONF_USE_PORTAINER: True}
    )
    assert result["type"] is FlowResultType.FORM
    assert result["errors"] == {"base": "portainer_not_configured"}


async def test_setup_with_portainer(hass):
    MockConfigEntry(domain="portainer").add_to_hass(hass)
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": SOURCE_USER}
    )
    with patch("custom_components.synology_cards.async_setup_entry", return_value=True):
        result = await hass.config_entries.flow.async_configure(
            result["flow_id"], {CONF_USE_PORTAINER: True}
        )
        await hass.async_block_till_done()
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["data"] == {CONF_USE_PORTAINER: True}


async def test_single_instance(hass):
    MockConfigEntry(domain=DOMAIN, data={CONF_USE_PORTAINER: False}).add_to_hass(hass)
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": SOURCE_USER}
    )
    assert result["type"] is FlowResultType.ABORT
    assert result["reason"] == "single_instance_allowed"


async def test_options_enable_and_disable(hass):
    entry = MockConfigEntry(domain=DOMAIN, data={CONF_USE_PORTAINER: False})
    entry.add_to_hass(hass)
    result = await hass.config_entries.options.async_init(entry.entry_id)
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {CONF_USE_PORTAINER: True}
    )
    assert result["errors"] == {"base": "portainer_not_configured"}
    MockConfigEntry(domain="portainer").add_to_hass(hass)
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {CONF_USE_PORTAINER: True}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert entry.options == {CONF_USE_PORTAINER: True}
    result = await hass.config_entries.options.async_init(entry.entry_id)
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {CONF_USE_PORTAINER: False}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert entry.options == {CONF_USE_PORTAINER: False}


async def test_options_reload_callback(hass):
    from custom_components.synology_cards import async_update_options

    entry = MockConfigEntry(domain=DOMAIN, data={CONF_USE_PORTAINER: True})
    entry.add_to_hass(hass)
    with patch.object(hass.config_entries, "async_reload", new_callable=AsyncMock) as reload_entry:
        await async_update_options(hass, entry)
    reload_entry.assert_awaited_once_with(entry.entry_id)
