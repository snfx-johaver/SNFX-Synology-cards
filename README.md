# SNFX Synology Cards

Frontend-only Home Assistant dashboard cards using the layout and styling of
[ruaan-deysel/ha-unraid](https://github.com/ruaan-deysel/ha-unraid), adapted for
**Synology blue**, the **built-in Synology DSM integration**, and optional
**Portainer discovery or manually mapped container entities**. No backend integration,
setup flow, credentials, NAS API calls or Synology Pro dependency. The browser consumes
Home Assistant states and calls existing entity actions only.

## Install

### HACS

1. In HACS, open **Custom repositories**.
2. Add `https://github.com/snfx-johaver/SNFX-Synology-cards` as **Dashboard**.
3. Download **SNFX Synology Cards** and reload your browser.
4. Check **Settings -> Dashboards -> Resources** (advanced mode): there should be
   one JavaScript module resource at
   `/hacsfiles/SNFX-Synology-cards/synology-cards.js`. Add it if HACS has not.
5. Add the Synology cards to your dashboard. Choose optional container support
   directly in each card's visual editor.

No Home Assistant restart or Devices & services entry is needed. Requires Home
Assistant 2025.12 or later. The package is currently installed as a HACS custom
repository, not listed in the default HACS catalog.

### Migrating from v2.x (backend Integration package)

Back up your dashboard configuration. Remove only **SNFX Synology Cards** from
**Settings -> Devices & services**; keep **Synology DSM** and **Portainer**.
Remove the old HACS Integration package/custom repository registration and add
the same repository as **Dashboard**, following the steps above. If installed
manually, remove the old `custom_components/synology_cards` directory after
removing its config entry.

Keep exactly one resource for these cards. Do not load an old integration bundle
alongside the Dashboard module. Hard-refresh all open HA browser tabs because
custom elements cannot be replaced in an already-open page.

Existing card types, NAS IDs, mappings, tabs and layout settings remain compatible.
Saved `portainer_endpoint` selections automatically retain Portainer mode unless
`container_source` explicitly overrides it. New Unified Dashboards default to
containers disabled. Existing standalone Docker cards default to Portainer mode.
No dashboard cards or selections are deleted during migration.

Version 1.x was already a Dashboard package; update it normally.

### Manual

Copy `dist/synology-cards.js` to `config/www/synology-cards.js`, then register
`/local/synology-cards.js?v=3.0.0` as a JavaScript module in Dashboard Resources.
Reload your browser. No backend files are needed.

## Optional containers

The Unified Dashboard and standalone Docker card editors have a **Container source**:

| Source | Configuration |
| --- | --- |
| Disabled | Hides the Docker tab, endpoint, container mappings and layout options; sends no container actions |
| Portainer | Select the Synology endpoint for automatic, endpoint-scoped discovery |
| Manual entities | Add one mapping per container from any integration exposing suitable HA entities |

All four cards are always available in the card picker. Nothing installs a
container manager or connects directly to a Docker API.

Portainer mode uses the built-in
[Portainer integration](https://www.home-assistant.io/integrations/portainer/).
If no endpoints are discovered, the editor links to its setup documentation.

In Manual entities mode, use entity pickers for the required **status entity** and
optional CPU, memory, power switch, start, stop and restart entities. A name is
optional and otherwise comes from the status entity's friendly name. Missing
metrics and unmapped controls are hidden.

Status may be a sensor, binary sensor, switch or input boolean. Set the exact
**Running state** and **Stopped state** emitted by that integration. Defaults are
`on`/`off` for binary sensors/switches/input booleans, or `running`/`exited` for
sensors. Unavailable/unknown status is never healthy. Transitional or unmatched
states are shown as-is and disable start/stop rather than assuming stopped.

CPU must report `%`; cumulative CPU time is not utilization. Memory must use a
recognized byte unit (B, kB, MB, GB, TB or binary equivalents). Controls are
explicit mappings: a switch uses `switch.turn_on/turn_off`; separate start/stop
or restart entities may be buttons, input buttons or scripts, using `press` or
`script.turn_on`. Separate start/stop mappings take precedence over a switch.
Stopping asks for confirmation; unavailable control entities are disabled and
service errors are visible. Only map actions belonging to the intended container.

## Configure in the UI

Add a card and search for **Synology Unified Dashboard Card**, or any of the
individual cards below. Every card has a visual editor.

All four cards default to **Full width** and **Auto height** in Home Assistant's
Sections layout. You can change these in the card editor's **Layout** tab.
Existing explicit `grid_options` or legacy `layout_options` take precedence;
reset them to use the new defaults, or enable both switches manually.

CPU percentages display two decimal places. RAM, container memory and storage
sizes display GB (or TB for larger capacities), with at most two decimal places.
Network speeds retain their automatic kB/s, MB/s or GB/s units.

Select your **Synology NAS**. In Portainer mode, explicitly select the **Synology
Portainer endpoint**. The card never guesses which endpoint is Synology:
containers must be Portainer container devices descending from that exact
endpoint, including containers nested under stacks. It does not search by
container name or entity prefix and does not include Unraid integration entities,
other Portainer endpoints, or stack switches.

The editor supports title, container grid/list mode, system details, visible
dashboard tabs, and optional entity overrides through native HA entity pickers.
Blank mappings use NAS-scoped discovery. Explicit mappings override discovery;
only map sensors belonging to the intended NAS.

The **Refresh entity discovery** button reloads device/entity registries. Cards
pick up the refreshed registry on the next HA state update; reload the browser
if no update arrives. After enabling disabled entities, allow the integration
to poll before expecting values.

The NAS is auto-selected only when exactly one Synology DSM NAS device exists.
Saved selections that no longer exist do not fall back to another NAS.
Only devices with DSM CPU, RAM or system sensors appear in the NAS selector;
non-system DSM records, storage devices and empty orphaned records are excluded.
Devices are not merged by name. Discovery recognizes system sensors even when the NAS is linked to
another device. Storage traversal supports both `via_device_id` and
`parent_device_id` relationships.
Integration-scoped entity metadata also identifies DSM devices when device
identifiers are omitted. Registry metadata is indexed once per snapshot and
loaded once per HA connection, not on every sensor update.
Editors ignore state-only updates; cards redraw only for readings belonging to
their selected NAS/endpoint or explicit entity mappings. Discovery/configuration
changes still update both.
Discovery uses full HA registry metadata so renamed entities work; if older
metadata omits stable keys, a suffix fallback is still restricted to the selected
device and integration.

### Card types

| Type | Purpose |
| --- | --- |
| `custom:synology-dashboard-card` | Unified tabbed Control Center |
| `custom:synology-server-card` | CPU/RAM/storage rings, model, DSM, uptime, security, traffic |
| `custom:synology-storage-card` | Volumes and physical drives, SMART, temperatures, threshold alerts |
| `custom:synology-docker-card` | Portainer or manual containers, grid/list, optional start/stop/restart |
Shared-folder, virtual-machine and UPS cards are intentionally omitted because
the selected integrations do not provide their required entities.
The Dashboard package does not install or configure DSM or container integrations for you.
There is no separate network card: aggregate download/upload rates and the DSM
management link are items on the primary Server Overview card.

### YAML alternative

```yaml
type: custom:synology-dashboard-card
server: YOUR_SYNOLOGY_DEVICE_REGISTRY_ID
container_source: portainer
portainer_endpoint: YOUR_SYNOLOGY_PORTAINER_ENDPOINT_DEVICE_ID
view_mode: grid
show_system_info: true
tabs:
  - overview
  - storage
  - docker
```

The visual editor supplies device registry IDs; these are **not** entity IDs,
IP addresses or Portainer's numeric endpoint IDs.

Manual container example (only status is required):

```yaml
type: custom:synology-docker-card
container_source: manual
view_mode: list
containers:
  - name: Media server
    status_entity: sensor.my_container_status
    running_state: running
    stopped_state: stopped
    cpu_entity: sensor.my_container_cpu
    memory_entity: sensor.my_container_memory
    power_entity: switch.my_container
    restart_entity: button.my_container_restart
```

Optional mappings, for example:

```yaml
type: custom:synology-server-card
entities:
  cpu_usage: sensor.my_nas_cpu_utilization
  ram_usage: sensor.my_nas_memory_utilization
```

Replace every example entity with an actual entity from your HA instance. These
are placeholders, not entities that the DSM integration creates.

## Entity coverage and gaps compared with Unraid

Missing readings show **Unavailable** or `--`, never a made-up zero or healthy
status. Unsupported-feature explanations stay in this documentation, not on
the cards. Error and warning colors remain
semantic red/orange; brand accents, selected tabs and progress bars are blue.

| Unraid card item | Synology/default-integration equivalent or limitation |
| --- | --- |
| CPU utilization | DSM `cpu_total_load` percentage, not CPU load averages |
| CPU package temperature | Not available; DSM **system temperature** is labelled explicitly instead |
| CPU power, processor model/cores/threads | Not exposed by DSM; NAS model is shown instead of a guessed processor |
| Memory usage/free/total | DSM RAM sensors; unit-aware formatting |
| Uptime | DSM uptime sensor, often disabled by default; enable it |
| OS version | DSM version from the HA device registry, not a separate sensor |
| License/registration badge | Unraid-specific; no Synology equivalent |
| Motherboard/fan/voltage telemetry | Not exposed by default DSM; fan speed mode is a control, not fan RPM |
| Unread notifications / general health | No notification-count entity; **Security Advisor** is shown and is not claimed to be total system health |
| Array state/capacity | Synology per-volume status/capacity; no Unraid array start/stop semantics |
| Total storage ring | Sum of selected NAS volume used/total sizes, weighted by capacity; requires all totals/used values, never averages percentages |
| Volume total size | Supported but disabled by default; enable each volume's total-size sensor |
| Parity validity, check progress/history, scrub/rebuild progress | No corresponding DSM entities or actions; not synthesized from volume status |
| Drive health/temperature/model | DSM drive status/temp plus HA drive device model |
| Disk SMART | DSM SMART sensor, usually disabled by default; enable per drive |
| Bad sectors / remaining drive life | DSM **threshold** binary sensors, not actual bad-sector counts or remaining-life percentages |
| Drive capacity/used/free, read/write I/O, spin state/controls | Not exposed by default DSM |
| USB boot drive | Unraid-specific; not shown as Synology boot storage |
| Shared-folder usage/quotas/protection | Not exposed by default DSM; shared-folder card omitted. Volume capacity is not folder usage |
| Interface RX/TX | DSM aggregate network rates only; units converted correctly |
| Per-NIC/bond/bridge identity, IP, link status/speed, MTU, transfer totals | No corresponding network entities in default DSM |
| DSM URL | Safe HTTP(S) configuration URL from HA device registry; not an IP/link sensor |
| Container name/state/image | Default Portainer device, switch/state sensor and image sensor (image appears in the name tooltip) |
| Container CPU/memory | Portainer sensors when available/enabled; list view shows them. CPU is displayed only if the unit is `%`; cumulative CPU time is not utilization |
| Container start/stop/restart | Portainer switch and restart button; stop asks for confirmation and service errors are visible |
| Container autostart/restart-policy toggle | No corresponding default Portainer entity |
| Image-update availability / check updates | No corresponding default Portainer entities; no false update badges |
| Container ports/WebUI/autostart metadata | Not exposed as corresponding default HA entities; not guessed |
| VM state, memory/CPU allocation, lifecycle | Neither DSM nor Portainer exposes Synology VMM entities; VM card omitted |
| UPS status/charge/load/runtime/power/voltage/health | Neither specified integration exposes these; UPS card intentionally omitted |

Enable additional sensors in **Settings -> Devices & services -> Synology DSM ->
your NAS/drive/volume -> Entities**, including disabled entities. Memory total,
uptime, SMART, and volume total size are especially useful. Portainer resource
sensors may also be disabled or unavailable depending on HA version/permissions.

The cards do not change polling intervals. DSM defaults to a slow polling
interval; Portainer normally polls every minute. Faster polling can affect NAS
hibernation. See the [DSM documentation](https://www.home-assistant.io/integrations/synology_dsm/)
and [Portainer documentation](https://www.home-assistant.io/integrations/portainer/).

## Development

Use Node.js 24 or later:

```text
cd frontend
npm ci
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:browser
```

Commit `dist/synology-cards.js` with source changes. It is a single bundled ES
module: Lit and icons are included, with no runtime CDN dependency. CI checks
types, unit tests, deterministic build output and Chromium desktop/mobile
rendering. Fixtures include two NAS devices, two Portainer endpoints, nested
stacks, renamed entities and unavailable sensors/containers. Tests also cover
per-card container modes, manual mappings, controls and selective live updates.

Development/browser fixtures validate the adapter against documented integration
schemas; they do not establish a connection to your real Home Assistant or NAS.

## Attribution

Apache-2.0. Adapted from the Unraid cards at upstream revision
`c816d9fd113df51c66ffde050a8dba52c799b2e1`. Original shared styles
and layout patterns are retained, with Synology-specific discovery, content and
controls. See [LICENSE](LICENSE) and [NOTICE](NOTICE). Not affiliated with
Synology, Unraid or Portainer.