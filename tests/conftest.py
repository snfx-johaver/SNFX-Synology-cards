"""Home Assistant integration test fixtures."""

import pytest


@pytest.fixture(autouse=True)
def custom_integrations(enable_custom_integrations):
    """Allow the test Home Assistant to load this repository's integration."""
