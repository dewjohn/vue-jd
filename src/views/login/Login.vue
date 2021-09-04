/* eslint-disable vue/no-parsing-error */
<template>
    <div class="wrapper">
        <img  class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" alt="头像">
        <div class="wrapper__input">
            <input  v-model="username" type="text" class="wrapper__input__content" placeholder="请输入账号">
        </div>
        <div class="wrapper__input">
            <input  v-model="password" type="password" class="wrapper__input__content" placeholder="请输入密码">
        </div>
        <div class="wrapper__login-button" @click="handleLogin">登录</div>
        <div class="wrapper__register-button" @click="handleRegister">注册</div>
        <Toast v-if="showToast" :errMessage="toastMessage"/>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import Toast, { useToastEffect } from '../../components/Toast.vue'
import { post } from '../../utilis/request'

const useLoginEffect = (showToastFuc) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const handleLogin = async () => {
    try {
      const { username, password } = data
      if (username === '' || password === '') {
        showToastFuc('登录失败')
        return
      }
      const result = await post('/api/user/login', {
        username: username,
        password: password
      })
      if (result.data.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        console.log(result)
        showToastFuc('登录失败')
      }
    } catch (e) {
      showToastFuc('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return {
    username,
    password,
    handleLogin
  }
}
// 点击跳转注册页面
const userRegisterEffect = () => {
  const router = useRouter()
  const handleRegister = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegister }
}

export default {
  name: 'Login',
  components: { Toast },
  setup () {
    const { showToast, toastMessage, showToastFuc } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToastFuc)
    const { handleRegister } = userRegisterEffect()
    // const handleLogin = () => {
    //   post('/api/user/login', {
    //     username: data.username,
    //     password: data.password
    //   }).then(() => {
    //     console.log('成功')
    //     localStorage.isLogin = true
    //     router.push({ name: 'Home' })
    //   }).catch(() => {
    //     console.log('失败')
    //     showToastFuc('登录失败')
    //   })
    // }

    return {
      handleLogin,
      handleRegister,
      username,
      password,
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
    &__login-button{
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
    &__register-button{
        text-align: center;
        font-size: 14px;
        color: rgba(0,0,0,0.50);
        letter-spacing: 0;
    }
}
</style>
