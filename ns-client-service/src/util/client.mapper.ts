import { ClientEntity } from '../entity/client.entity';
import { ClientDto } from '../dto/client.dto';

export class ClientMapper {
  static toDto(client: ClientEntity): ClientDto {
    return new ClientDto(
      client.id!,
      client.tenantId,
      client.name,
      client.address,
      client.contractCount,
    );
  }
}