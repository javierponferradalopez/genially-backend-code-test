import { Nullable } from "../../../shared/domain/Nullable";
import GeniallysCounter from "./GeniallysCounter";

interface GeniallysCounterRepository {
  save(genially: GeniallysCounter): Promise<void>;
  first(): Promise<Nullable<GeniallysCounter>>;
}

export default GeniallysCounterRepository;
