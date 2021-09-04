<template>
  <div class="wrapper">
    <div class="head">
      <div class="head__arrow iconfont" @click="handleBack">&#xe602;</div>
      <div class="head__title">{{ addressId?'编辑收货地址':'新建收货地址' }}</div>
      <div class="head__save" @click="updateAddress">保存</div>
    </div>
    <div class="form">
      <div class="form__item">
        <div class="form__item__label">所在城市：</div>
        <input class="form__item__content" placeholder="北京市" v-model="formData.city">
      </div>
      <div class="form__item">
        <div class="form__item__label">小区/大厦/学校：</div>
        <input class="form__item__content" placeholder="如北理工大学国防科技园" v-model="formData.department">
      </div>
      <div class="form__item">
        <div class="form__item__label">楼号-门牌号：</div>
        <input class="form__item__content" placeholder="如2号楼10层" v-model="formData.houseNumber">
      </div>
      <div class="form__item">
        <div class="form__item__label">收货人：</div>
        <input class="form__item__content" placeholder="小慕" v-model="formData.name">
      </div>
      <div class="form__item">
        <div class="form__item__label">联系电话：</div>
        <input class="form__item__content" placeholder="18911023277" v-model="formData.phone">
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { get, patch, post } from '../../utilis/request'
// import { getAddressList } from '../../effect/addressEffect'
import { useRoute, useRouter } from 'vue-router'

const useHandleBackEffect = (router) => {
  const handleBack = () => {
    router.back()
  }
  return { handleBack }
}

const useFormEffect = (addressId, router) => {
  const formData = reactive(
    { city: '', department: '', houseNumber: '', name: '', phone: '' }
  )
  const getAddressItem = async () => {
    const result = await get(`/api/user/address/${addressId}`)
    if (result.errno === 0 && result?.data) {
      // console.log(result.data)
      const { city, department, houseNumber, name, phone } = result.data
      formData.city = city
      formData.department = department
      formData.houseNumber = houseNumber
      formData.name = name
      formData.phone = phone
    }
  }
  const updateAddress = async () => {
    if (addressId) {
      const result = await patch(`/api/user/address/${addressId}`, { data: formData })
      if (result?.errno === 0 && result?.data) {
        router.back()
        console.log(result, '+++++++++++++')
      } else {
        const result = await post('/api/user/address', { data: formData })
        if (result?.errno === 0) {
          router.back()
        }
      }
    }
  }
  if (addressId) { getAddressItem() }
  return { formData, getAddressItem, updateAddress }
}

export default {
  name: 'EditNewAddress',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const addressId = route.params?.id
    const { handleBack } = useHandleBackEffect(router)
    const { formData, getAddressItem, updateAddress } = useFormEffect(addressId, router)
    return { addressId, handleBack, formData, getAddressItem, updateAddress }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #eee;
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
  &__save{
    font-size: .14rem;
    margin: 0 .18rem 0 0;
    color: #333;
    text-align: right;
  }
}
.form{
  margin-top: .12rem;
  padding: 0 .18rem;
  background: #fff;
  border-top: .01rem solid #f1f1f1;
  border-bottom: .01rem solid #f1f1f1;
  &__item{
    display: flex;
    padding: .12rem 0;
    line-height: .2rem;
    border-bottom: .01rem solid #f1f1f1;
    &__label{
      font-size: .14rem;
      color: #666;
      line-height: .2rem;
    }
    &__content{
      flex: 1;
      font-size: .14rem;
      color: #333;
      border:none;
      outline: none;
    }
  }
}
</style>
