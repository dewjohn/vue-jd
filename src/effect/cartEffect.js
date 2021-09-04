import { useStore } from 'vuex'
import { computed } from 'vue'
// 购物车相关逻辑加入购物车取消购物车
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId, productId, productInfo, num
    })
    console.log(shopId, productId, productInfo)
  }
  // 获取购物车信息
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || []
    const NotEmptyProductList = {}
    for (const i in productList) {
      const product = productList[i]
      if (productList[i].count > 0) {
        NotEmptyProductList[i] = product
      }
    }
    return NotEmptyProductList
  })
  // 获取商铺名称
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || []
    return shopName
  })

  // 计算购买总价
  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    // let total = 0 // 计算购买数量
    // let price = 0 // 计算勾选商品价格
    // let allchecked = true
    const result = { total: 0, price: 0, allchecked: true }
    if (productList) {
      for (var i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.check) {
          result.price += (product.count * product.price)
        }
        if (product.count > 0 && !product.check) {
          result.allchecked = false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })
  return { cartList, changeCartItemInfo, productList, shopName, calculations }
}
