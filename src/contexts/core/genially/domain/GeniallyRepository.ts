import Genially from "./Genially";
import { GeniallyId } from "./GeniallyId";

interface GeniallyRepository {
  /**
   * Save changes from genially
   */
  save(genially: Genially): Promise<void>;

  /**
   * Search a genially by identifier
   *
   * @throws {GeniallyNotExist}
   */
  find(id: GeniallyId): Promise<Genially>;

  /**
   * Delete a genially by indentifier
   */
  delete(id: GeniallyId): Promise<void>;
}

export default GeniallyRepository;
