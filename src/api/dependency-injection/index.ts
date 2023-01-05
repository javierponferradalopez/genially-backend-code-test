import { ContainerBuilder } from "node-dependency-injection";
import { registerApi } from "./api";
import { registerCore } from "./core";

const container = new ContainerBuilder();
registerCore(container);
registerApi(container);

export default container;
