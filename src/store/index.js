import Vuex from 'vuex'

const setLocalStorage = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalStorage = () => {
  try {
    return JSON.parse(localStorage.cartList)
  } catch (e) {
    return {}
  }
}

export default Vuex.createStore({
  state: {
    cartList: getLocalStorage(),
    addressList: []
    // cartList: {
    //     shopId: {
    //       shopName: '沃尔玛',
    //         productList: {
    //               productId: {
    //                 _id: '1',
    //                 name: '番茄',
    //                 imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
    //                 sales: 10,
    //                 price: 33.6,
    //                 oldPrice: 33.9,
    //                 count: 2
    //               }
    //             },
    //               productId: {
    //                 _id: '2',
    //                 name: '沃尔玛',
    //                 imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
    //                 sales: 10,
    //                 price: 33.6,
    //                 oldPrice: 33.9,
    //                 count: 2
    //               }
    //           }
    // }
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo } = payload
      let shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }
      if (!shopInfo) { shopInfo = {} }
      let products = shopInfo.productList[productId]
      if (!products) {
        products = productInfo
        products.count = 0
      }
      products.count += payload.num
      if (payload.num > 0) { products.check = true }
      if (products.count < 0) { products.count = 0 }
      shopInfo.productList[productId] = products
      state.cartList[shopId] = shopInfo
      // console.log(shipId, productId, productInfo)
      setLocalStorage(state)
    },
    changeCartProductItemCheck (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalStorage(state)
    },
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalStorage(state)
    },
    setcartItemsCkecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (var key in products) {
          const product = products[key]
          product.check = true
        }
      }
      setLocalStorage(state)
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalStorage(state)
    },
    // 点击确认订单的确认支付后清空购物车
    clearCartData (state, shopId) {
      console.log(shopId, '================')
      state.cartList[shopId].productList = {}
      setLocalStorage(state)
    },
    changeAddressList (state, addressList) {
      // console.log(addressList)
      state.addressList.splice(0, state.addressList.length, ...addressList)
    }
  },
  actions: {
  },
  modules: {
  }
})
