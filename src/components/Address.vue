<template>
<div class="address">
  <div class="address__info">
    <div class="address__info__name">{{address.name}}</div>
    <div class="address__info__tel">{{address.phone}}</div>
  </div>
  <div class="address__add">{{address.city}} {{address.department}} {{address.houseNumber}}</div>
  <div class="address__icon iconfont">&#xe602;</div>
</div>
</template>

<script>
export default {
  name: 'Address',
  props: ['address']
}
</script>

<style lang="scss" scoped>
.address{
  position: relative;
  margin: .2rem .18rem 0 .18rem;
  background: #fff;
  padding: .18rem .64rem .18rem .16rem;
  &__info{
    display: flex;
    font-size: .14rem;
    color: #999;
    line-height: .2rem;
    margin-bottom: .08rem;
    &__name{
      width: 1rem;
    }
    &__tel{
      flex: 1;
    }
  }
  &__icon{
    position: absolute;
    right: .2rem;
    transform: rotate(180deg);
    top: .44rem;
  }
}
</style>
