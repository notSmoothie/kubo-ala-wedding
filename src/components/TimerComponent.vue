<template>
  <div id="timer-container">
    <div v-for="timer in timeLeft" :key="timer" id="timer">{{ timer }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const timeLeft = ref('00:00:00')

const targetDate = new Date('2025-05-24T15:00:00').getTime()

onMounted(() => {
  const initialTimeLeft = targetDate - new Date().getTime()
  timeLeft.value = formatTime(initialTimeLeft)
})

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const days = Math.floor(totalSeconds / (60 * 60 * 24))
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
  const seconds = totalSeconds % 60

  const fullArray = []

  if (days > 0) {
    fullArray.push(`${days} dní`)
  }
  if (days > 0 || hours > 0) {
    fullArray.push(`${String(hours).padStart(2, '0')} hodín`)
  }
  if (days > 0 || hours > 0 || minutes > 0) {
    fullArray.push(`${String(minutes).padStart(2, '0')} minút`)
  }

  if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
    fullArray.push(`${String(seconds).padStart(2, '0')} sekúnd`)
  } else {
    fullArray.push('Hotovo!')
  }

  return fullArray
}
</script>

<style scoped>
#timer {
  font-weight: 300;
  font-size: 3rem;
  margin: 20px 0;
}
</style>
