<template>
  <div class="home-view">
    <div class="home-view__head">
      <div>
        <label for="exchangeRate">
          Exchange rate:
          <input type="range" min="20" max="80" step="0.1" v-model="exchangeRate"
                 id="exchangeRate"/>
          {{ Number(exchangeRate).toFixed(1) }}
        </label>
      </div>
    </div>
    <div class="home-view__body">
      <div class="home-view__tables">
        <items-table
          v-for="group in groups"
          :items="getGroupItems(group)"
          :table-name="group.groupName"
          :exchangeRate="exchangeRate"
          :key="`group-${group.groupId}`"
          @put-in-cart="putInCart"
        />
      </div>
      <div class="home-view__cart">
        <cart
          :items="cartItems"
          :exchangeRate="exchangeRate"
          @delete-item="deleteCartItem"
        />
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { GoodsStore } from '@/store/modules/goods';
import ItemsTable from '@/components/ItemsTable/ItemsTable.vue';
import { ItemGroupModel } from '@/models/ItemGroupModel';
import Cart from '@/components/Cart/Cart.vue';
import { ItemModel } from '@/models/ItemModel';
import { CartItemType } from '@/constants/types/CartItemType';

@Component({
  components: { Cart, ItemsTable },
})
export default class HomeView extends Vue {
  cartItems: CartItemType[] = [];

  exchangeRate = 70;

  public async mounted() {
    /**
     * Если требуется обновления данных каждые 15 секунд, можно установить интрвал тут.
     * Но не ясна цель обновления статичных данных.
     * Если для обновления модели по установленному курсу, то мне кажется - это bad practice.
     */
    await GoodsStore.fetchGoods();
    await GoodsStore.fetchNames();
  }

  get groups(): ItemGroupModel[] {
    return GoodsStore.getGroups;
  }

  get items() {
    return GoodsStore.getNamedItems;
  }

  deleteCartItem(item: CartItemType) {
    this.cartItems.splice(this.cartItems.indexOf(item), 1);
  }

  getGroupItems(group: ItemGroupModel) {
    return this.items.filter((item) => item.groupId === group.groupId);
  }

  getItemGroup(item: ItemModel): ItemGroupModel | undefined {
    return this.groups.find((v) => v.groupId === item.groupId);
  }

  putInCart(item: ItemModel) {
    const cartItem = this.cartItems.find((v) => v.item === item);
    if (cartItem) {
      cartItem.count = Number(cartItem.count) + 1;
    } else {
      this.cartItems.push({
        item,
        group: this.getItemGroup(item),
        count: 1,
      });
    }
  }
}
</script>

<style scoped lang="scss">
.home-view {
  display: flex;
  flex-direction: column;

  &__head {
    background: #F0F0F0;
    padding: 15px 25px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: calc(100% - 50px);

    label {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      input {
        margin: 0 0.5em;
      }
    }
  }

  &__body {
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 15px;
  }

  &__cart {
    padding: 020px;
  }
}
</style>
