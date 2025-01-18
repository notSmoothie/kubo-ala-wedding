<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
const isMobile = ref(window.innerWidth <= 768)

const activeSection = ref('')

const updateActiveSection = (section) => {
  activeSection.value = section
}

const updateDeviceWidth = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  window.addEventListener('resize', updateDeviceWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDeviceWidth)
})
</script>

<template>
  <div v-if="!isMobile && $route.path !== '/'" class="topBar">
    <router-link :to="{ path: '/test', hash: '#top' }">
      <div :class="{ active: activeSection === 'top' }">Úvod</div>
    </router-link>
    <router-link :to="{ path: '/test', hash: '#timer' }">
      <div :class="{ active: activeSection === 'timer' }">Čas</div>
    </router-link>
    <router-link :to="{ path: '/test', hash: '#middle' }">
      <div :class="{ active: activeSection === 'middle' }">Informácie</div>
    </router-link>
    <div style="color: darkgray">Program</div>
    <router-link to="/about">
      <div :class="{ active: activeSection === 'rsvp' }">Potvrdenie účasti</div>
    </router-link>
    <div class="cornerStone">Alenka & Jakub</div>
  </div>
  <RouterView @updateActiveSection="updateActiveSection"></RouterView>
</template>

<style scoped>
.topBar {
  z-index: 5;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  backdrop-filter: blur(5px);
  background-color: #ffffff25;
}

a {
  text-decoration: none;
}

.topBar div {
  margin: 0 15px;
  padding: 20px 10px;
  color: black;
  text-decoration: none;
  transition:
    color 0.3s ease,
    font-weight 0.3s ease;
}

.topBar div.active {
  color: rgb(108, 0, 216);
  font-weight: bolder;
}

.cornerStone {
  margin-left: auto !important;
  font-weight: bolder;
}
</style>
