<template>
  <div class="wrapper">
    <div class="head">
      <div @click="handleBack" class="head__arrow iconfont">&#xe602;</div>
      <div class="head__title">管理收货地址</div>
      <div class="head__new" @click="handleNewAddress">新建</div>
    </div>
    <Address
    v-for="address in addressList"
    :key="address._id"
    :address="address"
    @click="() => handleEditAddress(address._id)"/>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useAddressEffect } from '../../effect/addressEffect'
import { toRefs } from 'vue'
import { useStore } from 'vuex'
import Address from '../../components/Address.vue'

export default {
  name: 'MyAddress',
  components: { Address },
  setup () {
    const router = useRouter()
    const store = useStore()
    const { addressList } = toRefs(store.state)
    const handleBack = () => {
      router.back()
    }
    const { getAddressList } = useAddressEffect()
    getAddressList(true)
    // console.log(addressList)
    const handleEditAddress = (id) => {
      router.push(`/editnewaddress/${id}`)
    }
    const handleNewAddress = () => {
      router.push({ name: 'EditNewAddress' })
    }
    return { handleBack, getAddressList, addressList, handleEditAddress, handleNewAddress }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background:#eee;
}
.head{
  display: flex;
  line-height: .44rem;
  background: #fff;
  height: .44rem;
  &__arrow{
    line-height: .16rem;
    margin: .143rem 0 .137rem .184rem;
    color: #B6B6B6;
  }
  &__title{
    flex: 1;
    font-size: .16rem;
    color: #333;
    text-align: center;
  }
  &__new{
    font-size: .14rem;
    margin: 0 .18rem 0 0;
    color: #333;
    text-align: right;
  }
}
</style>
