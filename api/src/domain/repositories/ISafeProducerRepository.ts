import { SafeProducer } from "../entities/SafeProducer";

export interface ISafeProducerRepository {
  create(data: SafeProducer): Promise<SafeProducer>;
}
