<template>
    <div class="content">
        <div class="category">
            <div :class="{'category__item': true, 'category__item--active': currentTab == item.tab}"
            @click="() => handleCategoriesClick(item.tab)"
            v-for="(item, index) in Categories"
            :key="index"
            >{{item.name}}</div>
        </div>
        <div class="product">
            <div class="product__item" v-for="item in list" :key="item._id">
                <img class="product__item__img" :src="item.imgUrl" alt="">
                <div class="product__item__detail">
                    <h4 class="product__item__title">{{item.name}}</h4>
                    <p class="product__item__sales">月售{{item.sales}}件</p>
                    <p class="product__item__price">
                        <span class="product__item__yen">&yen;</span>{{item.price}}
                        <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
                    </p>
                </div>
                <div class="product__number">
                    <span @click="() => { changeCartItem(shopId, item._id, item, -1, shopName) }" class="product__number__minus">-</span>
                    <!-- {{ cartList?.[shopId]?.productList?.[item._id]?.count || 0 }} -->
                    {{getProductCartCount(shopId, item._id)}}
                    <span @click="() => { changeCartItem(shopId, item._id, item, 1, shopName) }" class="product__number__plus">+</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { get } from '../../utilis/request'
import { useRoute } from 'vue-router'
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useCommonCartEffect } from '../../effect/cartEffect'
import { useStore } from 'vuex'

const Categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }]

const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] })
  const getContentData = async (tab) => {
    const result = await get(`/api/shop/${shopId}/products`, { tab: currentTab.value })
    if (result?.errno === 0 && result.data.length) {
      content.list = result.data
    }
  }
  watchEffect(() => { getContentData() })
  const { list } = toRefs(content)
  return { list }
}

const useTabEffect = () => {
  const currentTab = ref(Categories[0].tab)
  const handleCategoriesClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleCategoriesClick }
}
// 购物车相关逻辑
const useCartEfffect = () => {
  const store = useStore()
  const { cartList, changeCartItemInfo } = useCommonCartEffect()
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', {
      shopId, shopName
    })
  }
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num, shopName)
    changeShopName(shopId, shopName)
  }
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }

  return { cartList, changeCartItem, getProductCartCount }
}

export default {
  name: 'Content',
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleCategoriesClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { cartList, changeCartItem, getProductCartCount } = useCartEfffect()
    return { Categories, list, handleCategoriesClick, currentTab, cartList, shopId, changeCartItem, getProductCartCount }
  }
}
</script>

<style lang="scss" scoped>
.content{
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 1.5rem;
    bottom: .5rem;
}
.category{
    height: 100%;
    overflow-y: scroll;
    width: .76rem;
    background: #f5f5f5;
    &__item{
        line-height: .4rem;
        text-align: center;
        font-size: 14px;
        color: #333;
        &--active{
            background:#fff
        }
    }
}
.product{
    flex: 1;
    overflow-y: scroll;
    &__item{
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: .01rem solid #f1f1f1;
        &__img{
            width: .68rem;
            height: .68rem;
            margin-right: .16rem;
        }
        &__title{
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: #333;
        }
        &__sales{
            margin: .06rem 0;
            line-height: .16rem;
            font-size: .12rem;
            color: #333;
        }
        &__price{
            margin: 0;
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
