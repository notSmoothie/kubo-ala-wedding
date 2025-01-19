<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const isMobile = ref(window.innerWidth <= 768)
const menuOpen = ref(false)
const activeSection = ref('')

const updateActiveSection = (section) => {
  activeSection.value = section
}

const updateDeviceWidth = () => {
  isMobile.value = window.innerWidth <= 768
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

onMounted(() => {
  window.addEventListener('resize', updateDeviceWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDeviceWidth)
})
</script>

<template>
  <div>
    <!-- Desktop TopBar -->
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

    <!-- Mobile Burger Menu -->
    <div v-else>
      <div class="burgerMenu" @click="toggleMenu">
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </div>
      <div :class="['mobileMenu', { open: menuOpen }]">
        <router-link :to="{ path: '/', hash: '#top' }" @click="toggleMenu">
          <div :class="{ active: activeSection === 'top' }">Úvod</div>
        </router-link>
        <router-link :to="{ path: '/', hash: '#timer' }" @click="toggleMenu">
          <div :class="{ active: activeSection === 'timer' }">Čas</div>
        </router-link>
        <router-link :to="{ path: '/', hash: '#middle' }" @click="toggleMenu">
          <div :class="{ active: activeSection === 'middle' }">Informácie</div>
        </router-link>
        <div style="color: darkgray">Program</div>
        <router-link to="/rsvp" @click="toggleMenu">
          <div :class="{ active: activeSection === 'rsvp' }">Potvrdenie účasti</div>
        </router-link>
        <div class="cornerStone">Alenka & Jakub</div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="menuOpen"
        style="
          z-index: 5;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(3px);
        "
      ></div>
    </Transition>

    <RouterView @updateActiveSection="updateActiveSection"></RouterView>
  </div>
</template>

<style scoped>
/* TopBar for Desktop */
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

/* Burger Menu Icon */
.burgerMenu {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 10;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
}

.burgerMenu span {
  display: block;
  height: 3px;
  background: black;
  border-radius: 2px;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.burgerMenu span.open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.burgerMenu span.open:nth-child(2) {
  opacity: 0;
}

.burgerMenu span.open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile Menu */
.mobileMenu {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: -75%; /* Initially hidden off-screen */
  width: 60%;
  height: 100%;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  background: white;
  z-index: 9;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition: left 0.3s ease; /* Smooth slide-in effect */
}

.mobileMenu.open {
  left: 0; /* Slide in */
}

.mobileMenu div {
  margin-bottom: 15px;
  color: black;
  font-size: 18px;
}

.mobileMenu div.active {
  color: rgb(108, 0, 216);
  font-weight: bold;
}

@media screen and (max-width: 768px) {
  .cornerStone {
    margin-left: unset !important;
  }
}

.cornerStone {
  margin-top: auto;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}
</style>
