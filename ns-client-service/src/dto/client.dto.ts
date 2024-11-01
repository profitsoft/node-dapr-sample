export class ClientDto {
  id?: number;
  name?: string;
  address?: string;
  tenantId: number;
  contractCount?: number;

  constructor(id: number, tenantId: number, name?: string, address?: string, contractCount?: number) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.tenantId = tenantId;
    this.contractCount = contractCount;
  }
}
