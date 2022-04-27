import { GoodsDto } from '@/services/api/dto/GoodsDto';
import {
  Action, getModule, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import { store } from '@/store';
import { apiService } from '@/services/api/ApiService';
import { ItemModel } from '@/models/ItemModel';
import { NamesDto } from '@/services/api/dto/NamesDto';
import { ItemGroupModel } from '@/models/ItemGroupModel';

@Module({
  name: 'goods',
  namespaced: true,
  dynamic: true,
  store,
})
class GoodsModule extends VuexModule {
  items: ItemModel[] = [];

  groups: ItemGroupModel[] = [];

  itemNames: Record<number, string> = {};

  @Action({ rawError: true, commit: 'setGoods' })
  async fetchGoods(): Promise<GoodsDto[]> {
    return apiService.goods.fetch();
  }

  @Action({ rawError: true, commit: 'setGoodsNames' })
  async fetchNames(): Promise<NamesDto> {
    return apiService.names.fetch();
  }

  @Mutation
  setGoods(goods: GoodsDto[]): void {
    this.items = [];
    goods.forEach((item) => {
      this.items.push(new ItemModel(item));
    });
  }

  @Mutation
  setGoodsNames(names: NamesDto): void {
    this.groups = [];
    Object.keys(names).forEach((groupId) => {
      this.groups.push(new ItemGroupModel(Number(groupId), names[groupId].G));
      Object.keys(names[groupId].B).forEach((itemId) => {
        this.itemNames[Number(itemId)] = names[groupId].B[itemId].N;
      });
    });
  }

  get getItems(): ItemModel[] {
    console.log('getting here');
    return this.items;
  }

  get getGroups(): ItemGroupModel[] {
    return this.groups;
  }

  get getNamedItems(): ItemModel[] {
    return this.items.map((item) => {
      item.setName(this.itemNames[item.itemId] || '');
      return item;
    });
  }
}

export const GoodsStore = getModule(GoodsModule);
