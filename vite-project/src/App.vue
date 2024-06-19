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
  <SendSSE></SendSSE>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
