<template>
  <div>
    <nav-bar />
    <div>
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/main/navBar.vue'
export default {
  name: 'Home',
  components: {
    NavBar
  }
}
</script>
