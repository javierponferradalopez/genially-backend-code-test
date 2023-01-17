import { ContainerBuilder } from "node-dependency-injection";
import { registerApi } from "./api";
import { registerCoreGenially } from "./core/genially";
import { registerCoreGeniallysCounter } from "./core/geniallys-counter";
import { registerShared } from "./shared";

/**
 * Initialize the dependency container.
 * Register each context separately and in order.
 */
const container = new ContainerBuilder();
registerShared(container);
registerCoreGenially(container);
registerCoreGeniallysCounter(container);
registerApi(container);

export default container;
