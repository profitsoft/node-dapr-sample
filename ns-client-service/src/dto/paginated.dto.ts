export class PaginatedDto<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;

  constructor(data: T[], total: number, limit: number, offset: number) {
    this.data = data;
    this.total = total;
    this.limit = limit;
    this.offset = offset;
  }
}