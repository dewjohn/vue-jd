<template>
    <div class="product">
      <div class="product__title">{{shopName}}</div>
      <div class="product__list">
          <div class="product__item" v-for="(item, index) in productList" :key="index">
              <img class="product__item__img" :src="item.imgUrl" alt="">
              <div class="product__item__detail">
                  <h4 class="product__item__title">{{item.name}}</h4>
                  <p class="product__item__price">
                    <span class="product__item__single">
                      <span class="product__item__yen">&yen;</span>{{item.price}}  x  {{ item.count }}
                    </span>
                    <span class="product__item__total">
                      <span class="product__item__yen">&yen;</span>{{ (item.count*item.price).toFixed(2) }}
                    </span>
                  </p>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effect/cartEffect'
export default {
  name: 'ProductList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)
    return { productList, shopName }
  }
}
</script>

<style lang="scss" scoped>
.product{
  margin: .16rem .18rem .55rem .18rem;
  background:#fff;
  &__title{
    padding: .16rem .16rem .12rem .16rem;
    line-height: .22rem;
    font-size: .16rem;
    color: #333333;
  }
  &__list{
    position: absolute;
    overflow-y: scroll;
    margin: 0 .18rem;
    left: 0;
    right: 0;
    bottom: .6rem;
    top: 2.6rem;
  }
  &__item{
      position: relative;
      display: flex;
      padding: .08rem .16rem;
      background:#fff;
      &__img{
          width: .46rem;
          height: .46rem;
          margin-right: .16rem;
      }
      &__detail{
        flex: 1;
      }
      &__title{
          margin: 0;
          line-height: .2rem;
          font-size: .14rem;
          color: #333;
      }
      &__price{
        display: flex;
        margin: 0;
        line-height: .2rem;
        font-size: .14rem;
        color: #E93B3B;
      }
      &__total{
        flex: 1;
        text-align: right;
        font-size: .14rem;
        color: #000000;
      }
      &__yen{
          font-size: .12rem;
      }
  }
}
</style>
