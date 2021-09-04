<template>
  <div class="wrapper">
    <div class="title">我的全部购物</div>
    <div
    class="isempty"
    v-if="Object.keys(cartWithProducts).length === 0">当前购物车为空</div>
    <div class="carts" v-for="(item, index) in cartWithProducts" :key="index">
      <div class="content">
        <div class="content__title">{{item.shopName}}</div>
        <div class="content__items">
          <!-- 每一件商品 -->
          <template
          v-for="(innerItem, innerIndex) in item.productList"
          :key="innerIndex">
          <div class="content__item"
          v-if="innerItem.count > 0">
            <img class="content__item__img" :src="innerItem.imgUrl">
            <div class="content__item__info">
              <div class="content__item__info__title">{{ innerItem.name }}</div>
              <div class="content__item__info__total">
                <span class="content__item__info__total__cal">¥{{innerItem.price}} x {{innerItem.count}}</span>
                <span class="content__item__info__total__price">¥{{ (innerItem.price * innerItem.count).toFixed(2) }}</span>
              </div>
            </div>
          </div>
          </template>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="1"/>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Docker from '../../components/Docker.vue'
const useCartEffect = () => {
  const store = useStore()
  const cartList = store.state.cartList
  const cartWithProducts = computed(() => {
    const newCarList = {}
    for (const shopId in cartList) {
      let total = 0
      const products = cartList[shopId].productList
      for (const productId in products) {
        const product = products[productId]
        total += (product.count || 0)
      }
      if (total > 0) {
        newCarList[shopId] = cartList[shopId]
      }
    }
    return newCarList
  })
  return { cartWithProducts }
}

export default {
  name: 'Cart',
  components: { Docker },
  setup () {
    const { cartWithProducts } = useCartEffect()
    console.log(cartWithProducts)
    return { cartWithProducts, Docker }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: .49rem;
  background: #eee;
}
.isempty{
  line-height: .44rem;
  text-align: center;
  font-size: .16rem;
  color: #000;
}
.title{
  height: .44rem;
  background: #fff;
  text-align: center;
  font-size: .16rem;
  color: #333;
  line-height: .44rem;
}
.content{
  margin: .16rem .18rem .16rem .18rem;
  background: #fff;
  &__title{
    padding: .16rem 0 .16rem .16rem;
    font-size: .16rem;
    color: #333;
    line-height: .22rem;
  }
  &__items{
    margin: 0 .16rem;
  }
  &__item{
    display: flex;
    padding-bottom: .16rem;
    &__img{
      width: .46rem;
      height: .46rem;
    }
    &__info{
      flex: 1;
      margin: 0 .16rem;
      &__title{
        font-size: .14rem;
        color: #333;
      }
      &__total{
        display: flex;
        margin-top: .06rem;
        &__cal{
          font-size: .14rem;
          color: #E93B3B;
          line-height: .2rem;
        }
        &__price{
          flex: 1;
          font-size: .14rem;
          color: #000;
          text-align: right;
          line-height: .2rem;
        }
      }
    }
  }
}
</style>
