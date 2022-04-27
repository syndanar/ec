import { ItemModel } from '@/models/ItemModel';
import { ItemGroupModel } from '@/models/ItemGroupModel';

export type CartItemType = {
  item: ItemModel,
  group: ItemGroupModel | undefined,
  count: number
}
