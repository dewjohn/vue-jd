import { useStore } from 'vuex'
import { get } from '../utilis/request'

export const useAddressEffect = () => {
  const store = useStore()
  const getAddressList = async (judge) => {
    const addressList = store.state.addressList
    if (judge || !addressList.length) {
      const result = await get('/api/user/address')
      if (result?.data?.length) {
        // console.log(result.data, '+++++++++++++++')
        store.commit('changeAddressList', result.data)
      }
    }
  }
  return { getAddressList }
}
