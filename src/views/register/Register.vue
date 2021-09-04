/* eslint-disable vue/no-parsing-error */
<template>
    <div class="wrapper">
        <img  class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" alt="头像">
        <div class="wrapper__input">
            <input  v-model="username" type="text" class="wrapper__input__content" placeholder="请输入用户名">
        </div>
        <div class="wrapper__input">
            <input  v-model="password" type="password" class="wrapper__input__content" placeholder="请输入密码">
        </div>
        <div class="wrapper__input">
            <input  v-model="ensurement" type="password" class="wrapper__input__content" placeholder="请确认密码">
        </div>
        <div class="wrapper__register-button" @click="handleRegister">注册</div>
        <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登录</div>
        <Toast v-if="showToast" :errMessage="toastMessage"/>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { post } from '../../utilis/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'
import { reactive, toRefs } from 'vue'

const userRegisterEffect = (showToastFuc) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: '',
    ensurement: ''
  })
  const handleRegister = async () => {
    try {
      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password
      })
      if (result.data.errno === 0) {
        console.log('1111')
        router.push({ name: 'Login' })
      } else {
        console.log('2222')
        showToastFuc('注册失败')
      }
    } catch (result) {
      console.log(result)
      showToastFuc('注册失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleRegister }
}

const userLoginEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleLoginClick }
}

export default {
  name: 'Register',
  components: { Toast },
  setup () {
    const { showToast, toastMessage, showToastFuc } = useToastEffect()
    const { username, password, ensurement, handleRegister } = userRegisterEffect(showToastFuc)
    const { handleLoginClick } = userLoginEffect()
    return {
      handleLoginClick,
      handleRegister,
      username,
      password,
      ensurement,
      showToast,
      toastMessage
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    &__img{
        display: block;
        width: .66rem;
        height: .66rem;
        margin: 0 auto .4rem auto;
    }
    &__input{
        box-sizing: border-box;
        height: .48rem;
        padding: 0 .16rem;
        margin: 0 .4rem .16rem .4rem;
        background: #F9F9F9;
        border: 1px solid rgba(0,0,0,0.10);
        border-radius: 6px;
        &__content{
            width: 100%;
            line-height: .48rem;
            border:none;
            outline: none;
            background:none;
            font-size: .16rem;
            color:rgba(0,0,0,0.50);
            &::placeholder {
                color:rgba(0,0,0,0.50);
            }
        }
    }
    &__register-button{
        margin: .32rem .4rem .16rem .4rem;
        height: .48rem;
        font-size: .16rem;
        line-height: .48rem;
        text-align: center;
        background: #0091FF;
        box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
        border-radius: .04rem;
        color: #fff;
    }
    &__register-link{
        text-align: center;
        font-size: 14px;
        color: rgba(0,0,0,0.50);
        letter-spacing: 0;
    }
}
</style>
