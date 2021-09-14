<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order"
      v-for="(item, index) in list"
      :key="index">
        <div class="order__title">
          <span class="order__title__shopname">{{item.shopName}}</span>
          <span class="order__title__status">{{ item.isCancled?'已取消':'已下单' }}</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template
            v-for="(innerItem, innerIndex) in item.orderProducts"
            :key="innerIndex">
            <img
            class="order__content__img"
            v-if="innerIndex <=4"
            :src="innerItem.orderProduct.imgUrl"
            alt="">
            </template>
          </div>
          <div class="order__content__info">
            <div class="order__content__price">¥{{item.totalPrice}}</div>
            <div class="order__content__count">共{{item.totalCount}}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2"/>
</template>

<script>
import { get } from '../../utilis/request'
import { reactive, toRefs } from 'vue'
import Docker from '../../components/Docker.vue'
// 处理订单列表
const useOrderEffect = () => {
  const data = reactive({ list: [] })
  const getOrderList = async () => {
    const result = await get('/api/order')
    console.log('________________', result)
    if (result?.errno === 0) {
      // 计算总价
      const orderList = result.data
      orderList.forEach(element => {
        const products = element.orderProducts || []
        let totalPrice = 0
        let totalCount = 0
        products.forEach(productItem => {
          totalPrice += (productItem?.orderProduct?.price * productItem?.orderNum)
          totalCount += (productItem?.orderNum || 0)
        })
        element.totalPrice = totalPrice
        element.totalCount = totalCount
      })
      data.list = result.data
    }
  }
  getOrderList()
  const { list } = toRefs(data)
  return { list }
}
export default {
  components: { Docker },
  name: 'OrderList',
  setup () {
    const { list } = useOrderEffect()
    // console.log(list, 'XXXXXXXXXXXXXXXXXXXXXXXXXX')
    return { list }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.49rem;
  right: 0;
  background:#eee;
}
.title{
  line-height: .44rem;
  font-size: .16rem;
  color: #333;
  background: #FFF;
  text-align: center;
}
.orders{
  padding: 0 .18rem .3rem .18rem;
}
.order{
  background: #fff;
  padding: 0 .34rem 0 .16rem;
  margin-top: .16rem;
  &__title{
    display: flex;
    margin-bottom: .16rem;
    &__shopname{
      margin-top: .16rem;
      line-height: .22rem;
      font-size: .16rem;
      color: #333;
    }
    &__status{
      flex: 1;
      margin-top: .16rem;
      text-align: right;
      line-height: .2rem;
      font-size: .14rem;
      color: #999;
    }
  }
  &__content{
    display: flex;
    padding-bottom: .16rem;
    &__img {
      width: .4rem;
      height: .4rem;
      margin-right: .12rem;
    }
    &__info{
      text-align: right;
      flex: 1;
    }
    &__price{
      font-size: .14rem;
      color: #E93B3B;
      line-height: .2rem;
    }
    &__count{
      font-size: .12rem;
      color: #333;
      line-height: .14rem;
      margin-top: .04rem;
    }
  }
}
</style>
