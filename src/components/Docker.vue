<template>
  <div class="docker">
    <div v-for="(item,index) in dockerList" :key="item.icon" :class="{'docker__item':true,'docker__item--active' :index  === currentIndex}">
        <router-link :to='item.to'>
          <div class="iconfont" v-html="item.icon"></div>
          <div class="docker__title">{{item.text}}</div>
        </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      { icon: '&#xe6a4;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe608;', text: '购物车', to: { name: 'Cart' } },
      { icon: '&#xe61e;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe658;', text: '我的', to: { name: 'User' } }
    ]
    return {
      dockerList
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/variables.scss";
@import "../style/mixins.scss";
.docker {
  position: absolute;
  display: flex;
  box-sizing: border-box;
  padding: 0.1rem 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  color: $content-fontcolor;
  border-top: 1px solid $content-fontBgcolor;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      font-size: 0.2rem;
      margin-bottom: 0.02rem;
    }
    a {
      color: $content-fontcolor;
      text-decoration: none;
    }
    &--active {
      a{
        color: #1fa4fc;
      }
    }
  }
}
</style>
