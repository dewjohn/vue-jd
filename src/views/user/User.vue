<template>
  <div class="wrapper">
    <div class="header">
      <div class="header__info">
        <div class="header__info__name">{{ dataForm.username }}</div>
        <div class="header__info__id">Id: {{dataForm.id}}</div>
      </div>
      <img class="header__profile" src="http://www.dell-lee.com/imgs/vue3/near.png"/>
    </div>
    <div class="content">
      <div class="content__address" @click="handleaddress">
        <div class="content__address__icon iconfont">&#xe66b;</div>
        <div class="content__address__title">我的地址</div>
        <div class="content__address__arrow iconfont">&#xe602;</div>
      </div>
      <div
      class="content__exitbtn"
      @click="handleLogout">退出登录</div>
    </div>
  </div>
  <Docker :currentIndex="3"/>
</template>

<script>
import Docker from '../../components/Docker.vue'
import { get } from '../../utilis/request'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
// 获取账号和Id
const getInfo = () => {
  const dataForm = reactive({ username: '', id: '' })
  const getUser = async () => {
    const result = await get('/api/user')
    console.log(result)
    if (result?.errno === 0) {
      const { _id, username } = result.data
      dataForm.username = username
      dataForm.id = _id
    }
  }
  return { dataForm, getUser }
}
export default {
  name: 'User',
  components: { Docker },
  setup () {
    const router = useRouter()
    const handleLogout = () => {
      localStorage.removeItem('isLogin')
      router.push({ name: 'Login' })
    }
    const handleaddress = () => {
      router.push({ name: 'MyAddress' })
    }
    const { dataForm, getUser } = getInfo()
    getUser()
    return { Docker, handleLogout, handleaddress, dataForm }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  position: absolute;
  overflow-y: scroll;
  top: 0;
  left: 0;
  right: 0;
  bottom: .49rem;
  background: #f8f8f8;
}
.header{
  position: relative;
  height: 1.5rem;
  background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
  padding-top: 0.4rem;
  &__info{
    margin: .3rem .18rem 0 .18rem;
    background: #fff;
    height: .66rem;
    border-radius: .08rem;
    padding-top: .46rem;
    &__name{
      font-size: .24rem;
      color: #262628;
      text-align: center;
      line-height: .36rem;
    }
    &__id{
      margin-top: .04rem;
      font-size: .14rem;
      text-align: center;
      color: #C1C0C9;
    }
  }
  &__profile{
    position: absolute;
    left: 50%;
    top: .2rem;
    transform: translate(-50%);
    width: .94rem;
    height: .94rem;
    border-radius: 50%;
  }
}
.content{
  margin: .16rem .18rem 0 .18rem;
  &__address{
    display: flex;
    line-height: .22rem;
    font-size: .14rem;
    padding: .2rem;
    background: #FFFFFF;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.08);
    border-radius: 8px;
    &__icon{
      margin-right: .12rem;
      width: .22rem;
      height: .22rem;
      background: #32C5FF;
      border-radius: .08rem;
      text-align: center;
      font-weight: bold;
      color: #fff;
    }
    &__title{
      flex: 1;
    }
    &__arrow{
      width: .22rem;
      text-align: right;
      transform: rotate(180deg);
    }
  }
  &__exitbtn{
    margin-top: .18rem;
    height: .31rem;
    background: #0091ff;
    color: #fff;
    text-align: center;
    line-height: .31rem;
    border-radius: .04rem;
  }
}
</style>
