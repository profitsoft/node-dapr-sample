export class ClientDto {
  id?: number;
  name?: string;
  address?: string;
  tenantId: number;

  constructor(id: number, tenantId: number, name?: string, address?: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.tenantId = tenantId;
  }
}
