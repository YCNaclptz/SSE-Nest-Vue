<script>
import HelloWorld from './components/HelloWorld.vue'
import ContenteditableIframe from './components/ContenteditableIframe.vue'
import SendSSE from './components/SendSSE.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    ContenteditableIframe,
    SendSSE
  }
}
</script>

<template>

  <!-- <ContenteditableIframe ></ContenteditableIframe> -->
  <div id="message-area">
    <SendSSE></SendSSE>
  </div>

</template>

<style scoped>
#message-area{
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 80%;
  background: #30384491;
  margin: 0 auto;
  padding: 1rem;
}
</style>
