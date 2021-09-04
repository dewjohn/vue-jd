<template>
  <div
  v-if="showCart && calculations.total > 0"
  @click="handleCartShowChange"
  class="mask"
  ></div>
  <div class="card">
    <div class="product" v-if="showCart && calculations.total > 0">
      <div class="product__header">
        <div class="product__header__all">
          <span class="product__header__all__icon iconfont"
          v-html="calculations.allchecked? '&#xe605;':'&#xe667;'"
          @click="() => {setcartItemsCkecked(shopId)}"
          ></span>
          全选
          </div>
        <div class="product__header__clear"><span class="product__header__clear__btn" @click="() => {cleanCartProducts(shopId)}">清空购物车</span></div>
      </div>
        <template v-for="item in productList" :key="item._id">
          <div v-if="item.count>0" class="product__item" >
            <div class="product__item__checked iconfont"
            v-html="item.check? '&#xe605;':'&#xe667;'"
            @click="() => {changeCartProductItemCheck(shopId, item._id)}"
            ></div>
            <img class="product__item__img" :src="item.imgUrl" alt="">
            <div class="product__item__detail">
                <h4 class="product__item__title">{{item.name}}</h4>
                <p class="product__item__price">
                    <span class="product__item__yen">&yen;</span>{{item.price}}
                    <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
                </p>
            </div>
            <div class="product__number">
                <span @click="() => { changeCartItemInfo(shopId, item._id, item,-1) }" class="product__number__minus">-</span>
                {{ item.count || 0 }}
                <span @click="() => { changeCartItemInfo(shopId, item._id, item,1) }" class="product__number__plus">+</span>
            </div>
          </div>
        </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img  @click="handleCartShowChange" class="check__icon__img" src="http://www.dell-lee.com/imgs/vue3/basket.png" alt="">
        <div class="check__icon__tag">{{ calculations.total }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{ calculations.price }}</span>
      </div>
      <div class="check__btn" v-show="calculations.total > 0">
        <router-link :to="{ path: `/orderConfirm/${shopId}`}">
        去结算
        </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effect/cartEffect'

const useCartEfffect = (shopId) => {
  const store = useStore()
  const { changeCartItemInfo, productList, calculations } = useCommonCartEffect(shopId)
  // 计算买的件数
  // const total = computed(() => {
  //   const productList = cartList[shopId]?.productList
  //   let count = 0
  //   if (productList) {
  //     for (var i in productList) {
  //       const product = productList[i]
  //       count += product.count
  //     }
  //   }
  //   return count
  // })
  // 计算买的总价
  // const price = computed(() => {
  //   const productList = cartList[shopId]?.productList
  //   let count = 0
  //   if (productList) {
  //     for (var i in productList) {
  //       const product = productList[i]
  //       if (product.check) {
  //         count += (product.count * product.price)
  //       }
  //     }
  //   }
  //   return count.toFixed(2)
  // })

  const changeCartProductItemCheck = (shopId, productId) => {
    store.commit('changeCartProductItemCheck', {
      shopId, productId
    })
  }
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', {
      shopId
    })
  }
  // 判断是否全选
  // const allchecked = computed(() => {
  //   const productList = cartList[shopId]?.productList
  //   let result = true
  //   if (productList) {
  //     for (var i in productList) {
  //       const product = productList[i]
  //       if (product.count > 0 && !product.check) {
  //         result = false
  //       }
  //     }
  //   }
  //   return result
  // })

  const setcartItemsCkecked = (shopId) => {
    store.commit('setcartItemsCkecked', {
      shopId
    })
  }
  return {
    calculations,
    productList,
    setcartItemsCkecked,
    changeCartProductItemCheck,
    cleanCartProducts,
    changeCartItemInfo
  }
}
const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}

export default {
  name: 'Card',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { showCart, handleCartShowChange } = toggleCartEffect()
    const {
      calculations, productList, cartList, changeCartProductItemCheck,
      cleanCartProducts, setcartItemsCkecked, changeCartItemInfo
    } = useCartEfffect(shopId)
    return {
      calculations,
      productList,
      shopId,
      cartList,
      changeCartProductItemCheck,
      cleanCartProducts,
      setcartItemsCkecked,
      showCart,
      handleCartShowChange,
      changeCartItemInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.mask{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0,0,0,.5);
  z-index: 1;
}
.card{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: #fff;
}
.check{
  display: flex;
  line-height: .49rem;
  box-sizing: border-box;
  border-top: .01rem solid #f1f1f1;
  &__icon{
    position: relative;
    width: .84rem;
    &__img{
      display: block;
      margin: .12rem auto;
      width: .28rem;
      height: .26rem;
    }
    &__tag{
      position: absolute;
      min-width: .2rem;
      left: 0.45rem;
      top: 0.01rem;
      background: #E93B3B;
      color: #fff;
      border-radius: 50%;
      font-size: .12rem;
      line-height: .2rem;
      text-align: center;
      transform: scale(.5);
      transform-origin: left center;
    }
  }
  &__info{
    flex: 1;
    color: #333;
    font-size: .12rem;
    &__price{
      color: #E93B3B;
      font-size: .18rem;
    }
  }
  &__btn{
    text-align: center;
    font-size: .14rem;
    width: .98rem;
    background: #4FB0F9;
    a {
      color: #fff;
      text-decoration: none;
    }
  }
}
.product{
    flex: 1;
    overflow-y: scroll;
    background:#FFF;
    &__header{
      display: flex;
      height: .52rem;
      border-bottom: #F1F1F1;
      line-height: .52rem;
      font-size: .14rem;
      color: #333333;
      &__all{
        width: .64rem;
        margin-left: .18rem;
        &__icon{
          display: inline-block;
          color: #0091FF;
          vertical-align: top;
        }
      }
      &__clear{
        flex: 1;
        text-align: right;
        margin-right: .18rem;
        &__btn{
          display: inline-block;
        }
      }
    }
    &__item{
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: .01rem solid #f1f1f1;
        &__img{
            width: .46rem;
            height: .46rem;
            margin-right: .16rem;
        }
        &__title{
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: #333;
        }
        &__price{
            margin: .06rem 0 0 0;
            line-height: .2rem;
            font-size: .14rem;
            color: #E93B3B;
        }
        &__yen{
            font-size: .12rem;
        }
        &__origin{
            margin-left: .06rem;
            line-height: .2rem;
            font-size: .12rem;
            color: #999;
            text-decoration: line-through;
        }
        &__checked{
          color: #0091FF;
          font-size: .2rem;
          line-height: .5rem;
          margin-right: .2rem;
        }
    }
    &__number{
        position: absolute;
        right: 0;
        bottom: .12rem;
        &__minus,
        &__plus {
            display: inline-block;
            width: .2rem;
            height: .2rem;
            border-radius: 50%;
            font-size: .2rem;
            text-align: center;line-height: .18rem;
        }
        &__minus{
            border: .01rem solid #666;
            margin-right: .1rem;
        }
        &__plus{
            background: #0091FF;
            color: #fff;
            margin-left: .05rem;
        }
    }
}
</style>
