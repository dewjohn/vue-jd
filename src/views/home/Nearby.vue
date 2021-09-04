<template>
      <div class="nearby">
        <h3 class="nearby__title">附近店铺</h3>
        <router-link  :to="`/shop/${item._id}`" v-for="item in nearbyList" :key="item._id">
          <ShopInfo :item="item"/>
        </router-link>

        <!-- <div class="nearby__item" v-for="item in nearbyList" :key="item._id">
          <img
            class="nearby__item__img"
            :src="item.imgUrl"
            :alt="item.name"
          />
          <div class="nearby__item__content">
            <div class="nearby__item__content__title">{{item.name}}</div>
            <div class="nearby__item__content__tags">
              <span class="nearby__item__content__tags__tag">月售: {{ item.sales }}</span>
              <span class="nearby__item__content__tags__tag">起送: {{ item.expressLimit }}</span>
              <span class="nearby__item__content__tags__tag">基础运费: {{ item.expressPrice }}</span>
            </div>
            <p class="nearby__item__content__highlight">
              {{item.slogan}}
            </p>
          </div>
        </div> -->
      </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utilis/request'
import ShopInfo from '../../components/ShopInfo.vue'

const getNearByListItem = () => {
  const nearbyList = ref([])
  const getNearByList = async () => {
    const result = await get('/api/shop/hot-list')
    console.log(result)
    if (result?.errno === 0) {
      nearbyList.value = result.data
      console.log(nearbyList.value)
    }
  }
  return { nearbyList, getNearByList }
}

export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup () {
    const { nearbyList, getNearByList } = getNearByListItem()
    getNearByList()
    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    color: $content-fontcolor;
    font-weight: normal;
  }
  a{
    text-decoration: none;
  }
}
</style>
