import { Nullable } from "../../../shared/domain/Nullable";
import GeniallysCounter from "./GeniallysCounter";

interface GeniallyCounterRepository {
  save(genially: GeniallysCounter): Promise<void>;
  first(): Promise<Nullable<GeniallysCounter>>;
}

export default GeniallyCounterRepository;