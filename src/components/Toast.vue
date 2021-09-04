<template>
    <div class="toast">
        {{errMessage}}
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'Toast',
  props: ['errMessage']
}

export const useToastEffect = () => {
  const toastData = reactive({
    showToast: false,
    toastMessage: ''
  })
  const showToastFuc = (msg) => {
    toastData.showToast = true
    toastData.toastMessage = msg
    setTimeout(() => {
      toastData.showToast = false
      toastData.toastMessage = ''
    }, 2000)
  }
  const { showToast, toastMessage } = toRefs(toastData)
  return { showToast, toastMessage, showToastFuc }
}
</script>

<style lang="scss" scoped>
.toast{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,.35);
    padding: .1rem .1rem;
    border-radius: .05rem;
    color: #fff;

}
</style>
