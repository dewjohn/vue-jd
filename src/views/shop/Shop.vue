<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe602;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe647;</span>
        <input class="search__content__input" placeholder="请输入商品名称搜索"/>
      </div>
    </div>
    <shop-info :item="item" :hideBorder="true" v-show="item.imgUrl"/>
    <Content :shopName="item.name"/>
    <Card />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utilis/request'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from '../shop/Content.vue'
import Card from '../shop/Card.vue'
// 获取当前商铺信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({
    item: {}
  })
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0) {
      data.item = result.data
      console.log(result, '++++++++++++++++++++++++++')
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}
// 返回上一页
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Card },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const { handleBackClick } = useBackRouterEffect()
    getItemData()
    return { item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper{
  padding: 0 .18rem;
}
.search{
  display: flex;
  margin: .2rem 0 .04rem 0;
  height: .32rem;
  line-height: .32rem;
  &__back{
    width: .42rem;
    display: inline-block;
    font-size: .24rem;
    color: #b6b6b6;
  }
  &__content{
    flex: 1;
    display: flex;
    background: $search-bg;
    border-radius: 16px;
    &__icon{
      width: .44rem;
      text-align: center;
      color: $search-fontcolor;
    }
    &__input{
      display: block;
      width: 100%;
      padding-right: .2rem;
      height: .32rem;
      border: none;
      outline: none;
      background:none;
      &::placeholder{
          font-size: .14rem;
          color: #333333;
          line-height: .16rem;
      }
    }
  }
}
</style>
