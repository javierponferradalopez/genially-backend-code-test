import { Nullable } from "../../../shared/domain/Nullable";
import Genially from "./Genially";
import { GeniallyId } from "./GeniallyId";

interface GeniallyRepository {
  save(genially: Genially): Promise<void>;
  find(id: GeniallyId): Promise<Nullable<Genially>>;
}

export default GeniallyRepository;
