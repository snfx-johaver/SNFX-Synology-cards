// Cards adapted from ruaan-deysel/ha-unraid (Apache-2.0).
import "./server-card";
import "./storage-card";
import { registerDockerCard } from "./docker-card";
import "./dashboard-card";
import { PORTAINER_ENABLED } from "./features";

if (PORTAINER_ENABLED) registerDockerCard();
