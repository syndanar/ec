<template>
  <div
    v-if="items.length"
    class="items-table"
    :class="{ collapsed }"
  >
    <div
      class="items-table__header"
      @click="toggleCollapsed"
      @keydown="toggleCollapsed"
    >
      <div class="items-table__header-collapseArrow">
        ˅
      </div>
      <div class="items-table__header-tableName">
        {{ tableName }}
      </div>
    </div>
    <div
      class="items-table__row"

      v-for="item in items"
      :key="`item-row-${item.itemId}`"
    >
      <div class="items-table__cell item-name">
        {{ item.itemName }}
      </div>
      <div class="items-table__cell item-price">
        {{ itemPrice(item) }}
      </div>
      <div
        class="items-table__cell put-in-cart"
        title="Put in cart"
        @click="putInCart(item)"
        @keydown="putInCart(item)"
      >
        ➕
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { ItemModel } from '@/models/ItemModel';

@Component({
  name: 'items-table',
  components: {},
})
export default class ItemsTableComponent extends Vue {
  @Prop({ default: [] }) items!: ItemModel[];

  @Prop() tableName!: string;

  @Prop() exchangeRate!: number;

  collapsed = false;

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  itemPrice(item: ItemModel): string {
    return (item.price * this.exchangeRate).toFixed(2);
  }

  putInCart(item: ItemModel) {
    this.$emit('put-in-cart', item);
  }
}
</script>

<style scoped lang="scss">
.items-table {
  $this: &;

  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border: 1px solid #CCC;
  text-align: left;

  &__header {
    padding: 10px;
    background: #d2dee2;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;

    &-collapseArrow {
      margin-right: 0.5em;
      font-size: 0.7rem;
      transform: rotate(-180deg);
      transition: transform 0.25s linear;
    }
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 100px 60px;
    width: 100%;
    box-shadow: inset 0 1px #CCC;
    visibility: visible;
    max-height: calc(60px + 3rem);
    opacity: 1;
    transition: all 0.25s linear;

    .item-price {
      background: #F0F0F0;
      text-align: center;
      font-weight: bold;
      box-shadow: inset 1px 1px #CCC;
    }

    .put-in-cart {
      text-align: center;
      cursor: pointer;
      box-shadow: inset 1px 1px #CCC;

      &:hover {
        background: #F3F9FF;
      }
    }
  }

  &__cell {
    padding: 10px;
    border-bottom: 0;
  }

  &.collapsed {
    #{$this}__header {
      &-collapseArrow {
        transform: rotate(0deg);
      }
    }

    #{$this}__row {
      max-height: 0;
      overflow: hidden;
    }
  }
}
</style>
