import { GoodsDto } from '@/services/api/dto/GoodsDto';

export class ItemModel {
  public itemId: number;

  public itemName?: string;

  public groupId: number;

  public price: number;

  public amount: number;

  constructor(dto: GoodsDto) {
    this.itemId = dto.T;
    this.groupId = dto.G;
    this.price = dto.C;
    this.amount = dto.P;
  }

  setName(name: string) {
    this.itemName = name;
  }
}
