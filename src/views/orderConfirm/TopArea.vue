<template>
    <div class="header">
      <div class="header__top">
        <div @click="handleBackClick" class="header__top__icon iconfont">&#xe602;</div>
        确认订单
      </div>
      <div class="header__receiver">
        <div class="header__receiver__title">收货地址</div>
        <div class="header__receiver__address">北京理工大学国防科技园2号楼10层</div>
        <div class="header__receiver__info">
          <span class="header__receiver__info__msg">瑶妹（先生）</span>
          <span class="header__receiver__info__msg">18911024266</span>
        </div>
        <div class="header__receiver__enter iconfont">&#xe602;</div>
      </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'OrderConfirm',
  setup () {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    return { handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
.header{
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
  background-repeat: no-repeat;
  &__top{
    position: relative;
    padding-top: .4rem;
    line-height: .24rem;
    color: #fff;
    font-size: .16rem;
    text-align: center;
    &__icon{
      position: absolute;
      left: .18rem;
    }
  }
  &__receiver{
    position: absolute;
    left: .18rem;
    right: .18rem;
    bottom: 0;
    height: 1.11rem;
    background: #fff;
    border-radius: .04rem;
    &__title{
      line-height: .22rem;
      padding: .16rem 0 .14rem .16rem;
      font-size: .16rem;
      color: #333333;
    }
    &__address{
      line-height: .2rem;
      padding: 0 .4rem 0 .16rem;
      font-size: .14rem;
      color: #333333;
    }
    &__info{
      padding: .06rem 0 0 .16rem;
      &__msg{
        margin-right: .06rem;
        line-height: .18rem;
        font-size: .12px;
        color: #666666;
      }
    }
    &__enter{
      position: absolute;
      color: #666;
      font-size: .16rem;
      line-height: .16rem;
      right: .16rem;
      top: .54rem;
      transform: rotate(180deg);
    }
  }
}
</style>
