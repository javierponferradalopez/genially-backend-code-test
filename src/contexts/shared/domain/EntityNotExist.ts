export default class EntityNotExist extends Error {
  constructor(entityName: string, id: string) {
    super(`${entityName} <${id}> does no exist`);
  }
}
