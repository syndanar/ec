<template>
  <div class="cart">
    <div
      class="cart__row cart__header"
    >
      <div>Наименование товара и описание</div>
      <div>Количество</div>
      <div>Цена</div>
      <div></div>
    </div>
    <div
      class="cart__row cart__item"
      v-for="(item, idx) in items"
      :key="`cart-item-${idx}`"
    >
      <div class="cart__row-name">
        {{ item.group.groupName }}. {{ item.item.itemName }}
      </div>
      <div class="cart__row-count">
        <label
          :for="`cart-item-count-${item.item.itemId}`"
        >
          <input
            v-model="item.count"
            placeholder="Кол-во"
            type="number"
            @change="checkCount(item)"
            :id="`cart-item-count-${item.item.itemId}`"
          /> шт.
        </label>
        <div
          :class="{active: item.count > item.item.amount}"
          class="cart__row-countError"
        >
          Количество ограничено
        </div>
      </div>
      <div class="cart__row-price">
        <span>{{ (item.item.price * exchangeRate).toFixed(2) }} руб.</span> / шт.
      </div>
      <div class="cart__row-actions">
        <button
          class="cart__row-actions-delete"
          @click="deleteItem(item)"
          @keydown="deleteItem(item)"
        >
          Удалить
        </button>
      </div>
    </div>

    <div
      class="cart__footer"
      v-if="totalPrice > 0"
    >
      Общая стоиомсть: <span class="totalPrice">{{ totalPrice.toFixed(2) }} руб.</span>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { CartItemType } from '@/constants/types/CartItemType';

@Component({
  name: 'cart',
  components: {},
})
export default class CartComponent extends Vue {
  @Prop() items!: CartItemType[];

  @Prop() exchangeRate!: number;

  deleteItem(item: CartItemType) {
    this.$emit('delete-item', item);
  }

  checkCount(item: CartItemType) {
    if (item.count < 1) {
      this.deleteItem(item);
    }
  }

  get totalPrice(): number {
    return this.items.reduce((acc, v) => acc + v.count * this.exchangeRate * v.item.price, 0);
  }
}
</script>

<style scoped lang="scss">
.cart {
  &__header {
    color: #999;
  }

  &__row {
    font-size: 14px;
    text-align: left;
    display: grid;
    grid-template-columns: 1fr 150px 180px 60px;
    align-items: baseline;
    border-bottom: 1px solid #F0F0F0;
    padding: 15px 0;
    position: relative;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      border-bottom: 0;
    }

    &-count {
      label {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-right: 10px;
      }

      input {
        width: 50px;
        padding: 5px;
        outline: none;
        border: 1px solid #d2dee2;
        border-radius: 3px;

        &:focus {
          border: 1px solid #9FA3B0;
        }
      }
    }

    &-countError {
      width: 90px;
      padding: 6px;
      margin-top: 5px;
      z-index: 1;
      background: #FFE0B2;
      color: #EF6C00;
      font-size: 0.8rem;
      border: 1px dashed #EF6C00;
      opacity: 0;
      visibility: hidden;
      max-height: 0;
      transition: all 0.25s linear;
      overflow: hidden;

      &.active {
        opacity: 1;
        visibility: visible;
        max-height: 100%;
      }

    }

    &-price {
      span {
        font-weight: bold;
      }
    }

    &-actions {
      &-delete {
        background: none;
        border: none;
        cursor: pointer;
        color: #2c3e50;

        &:hover {
          color: #33C;
        }
      }
    }
  }

  &__footer {
    padding-top: 0.75em;
    text-align: right;
    font-size: 0.8rem;
    color: #999;

    & .totalPrice {
      color: #EF6C00;
      font-size: 1.25em;
      font-weight: bold;
    }
  }

}

</style>
