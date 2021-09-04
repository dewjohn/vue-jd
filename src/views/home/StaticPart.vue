<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe7f1;</span>
    北京理工大学国防科技园2号楼10层
    <span class="iconfont position__notice">&#xe85a;</span>
  </div>
  <div class="search">
    <span class="iconfont">&#xe647;</span>
    <span class="search__text">山姆会员商店优惠商品</span>
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
      alt="轮播图"
    />
  </div>

  <div class="icons">
    <div class="icons__item" v-for="item in staticList" :key="item.id">
      <img
        class="icons__item__img"
        src="http://www.dell-lee.com/imgs/vue3/超市.png"
      />
      <p class="icons__item__desc">超市便利</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const staticList = [
      { id: 1, imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png', desc: '超市便利' },
      { id: 2, imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png', desc: '超市便利' },
      { id: 3, imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png', desc: '超市便利' },
      { id: 4, imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png', desc: '超市便利' },
      { id: 5, imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png', desc: '超市便利' },
      { id: 6, imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png', desc: '超市便利' },
      { id: 7, imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png', desc: '超市便利' },
      { id: 8, imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png', desc: '超市便利' }
    ]
    return {
      staticList
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
.position {
  position: relative;
  padding: 0.3rem 0.24rem 0.2rem 0;
  line-height: 0.22px;
  font-size: 0.16rem;
  @include ellipse;
  &__icon {
    font-size: 0.2rem;
    margin-right: 0.08rem;
  }
  &__notice {
    position: absolute;
    font-size: 0.2rem;
    right: 0;
  }
  color: $content-fontcolor;
}
.search {
  vertical-align: center;
  height: 0.32rem;
  line-height: 0.32rem;
  background: $search-bg;
  color: $search-fontcolor;
  border-radius: 0.16rem;
  font-size: 0.16rem;
  margin-bottom: 0.12rem;
  .iconfont {
    font-size: 0.14rem;
    position: relative;
    display: inline-block;
    top: 0.01rem;
    padding: 0 0.16rem;
  }
  &__text {
    display: inline-block;
    font-size: 0.14rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
.icons {
  margin-top: 0.16rem;
  display: flex;
  flex-wrap: wrap;
  &__item {
    width: 20%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}
.gap {
  margin: 0 -0.18rem;
  height: 0.1rem;
  background: $content-fontBgcolor;
}
</style>
