import { GeniallyId } from "./GeniallyId";

export default class GeniallyNotExist extends Error {
  constructor(id: GeniallyId) {
    super(`Genially <${id.toString()}> does no exist`);
  }
}
