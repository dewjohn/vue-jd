<template>
    <div class="order">
      <div class="order__price">
        <span class="order__price__title">实付金额</span>
         <span class="order__price__prices"> ¥{{calculations.price}}</span></div>
      <div class="order__btn" @click="() => {handleSubmitClick(true)}">提交订单</div>
    </div>
    <div class="mask" v-show="showConfirm" @click="() => {handleSubmitClick(false)}">
      <div class="mask__content" @click.stop>
        <h3 class="mask__content__title">确认要离开收银台？</h3>
        <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
        <div class="mask__content__btns">
          <span
          class="mask__content__btns__lbtn"
          @click="() => {handleOrderConfirm(true)}"
          >取消订单</span>
          <span
          class="mask__content__btns__rbtn"
          @click="() => {handleOrderConfirm(false)}"
          >确认支付</span>
        </div>
      </div>
    </div>
</template>

<script>
import { useCommonCartEffect } from '../../effect/cartEffect'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
import { post } from '../../utilis/request'

// 下订单
const useMakeOrderEffect = (shopName, shopId, productList) => {
  const router = useRouter()
  const store = useStore()
  // 确认订单传 isCancle: false 取消订单 isCancle: true
  const handleOrderConfirm = async (isCancle) => {
    console.log(productList)
    const products = []
    for (var i in productList.value) {
      var product = productList.value[i]
      products.push({
        id: parseInt(product._id, 10),
        num: product.count
      })
    }
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId: shopId,
        shopName: shopName.value,
        isCancle,
        products
      })
      console.log(result)
      if (result?.data?.errno === 0) {
        router.push({ name: 'OrderList' })
        store.commit('clearCartData', shopId)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return { handleOrderConfirm }
}

// 点击确认支付还是取消订单
const useConfirmCancleEffect = () => {
  const showConfirm = ref(false)
  const handleSubmitClick = (state) => {
    showConfirm.value = state
  }
  return { showConfirm, handleSubmitClick }
}

export default {
  name: 'Order',
  setup () {
    const route = useRoute()
    const shopId = parseInt(route.params.id, 10)
    const { calculations, shopName, productList } = useCommonCartEffect(shopId)
    const { handleOrderConfirm } = useMakeOrderEffect(shopName, shopId, productList)
    const { showConfirm, handleSubmitClick } = useConfirmCancleEffect()
    return { calculations, handleOrderConfirm, showConfirm, handleSubmitClick }
  }
}
</script>

<style lang="scss" scoped>
.order{
  display: flex;
  height: .49rem;
  line-height: .49rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  &__price{
    flex: 1;
    background: #fff;
    font-size: .14rem;
    color: #333333;
    &__title{
      font-size: .14rem;
      color: #333;
      line-height: .20rem;
      margin: .14rem .05rem .15rem .24rem;
    }
    &__prices{
      font-size: .16rem;
      color: #333;
      line-height: .22rem;
      margin: .14rem 0 .13rem 0;
    }
  }
  &__btn{
    width: .98rem;
    background: #4FB0F9;
    color: #fff;
    text-align: center;
    font-size: .14rem;
  }
}
.mask{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(0,0,0,0.50);
  &__content{
    width: 3rem;
    height: 1.57rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    text-align: center;
    &__title{
      margin: .24rem 0 .08rem 0;
      font-size: .18rem;
      color: #333;
      line-height: .2rem;
    }
    &__desc{
      margin: 0 0 .24rem 0;
      font-size: .14rem;
      color: #666;
    }
    &__btns{
      font-size: .14rem;
      color: #0091FF;
      line-height: .2rem;
      margin-top: .30rem;
      &__lbtn{
        padding: .06rem .12rem .06rem .12rem;
        border: 1px solid #4FB0F9;
        border-radius: 16px;
        margin-right: .24rem;
      }
      &__rbtn{
        padding: .06rem .12rem .06rem .12rem;
        border: 1px solid #4FB0F9;
        border-radius: 16px;
        color: #fff;
        background: #4FB0F9;
      }
    }
  }
}
</style>
