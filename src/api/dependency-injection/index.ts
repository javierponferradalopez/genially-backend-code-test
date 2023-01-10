import { ContainerBuilder } from "node-dependency-injection";
import { registerApi } from "./api";
import { registerCore } from "./core";
import { registerShared } from "./shared";

/**
 * Initialize the dependency container.
 * Register each context separately and in order.
 */
const container = new ContainerBuilder();
registerShared(container);
registerCore(container);
registerApi(container);

export default container;
