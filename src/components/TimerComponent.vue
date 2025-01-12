<template>
    <div id="timer-container">
      <span>Svoje ÁNO si povieme za:</span>

      <div v-for="timer in timeLeft" :key="timer" id="timer">{{ timer }}</div>

    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const timeLeft = ref('00:00:00');
  let worker = null;
  
  const targetDate = new Date('2025-05-24T18:37:00').getTime();
  
  onMounted(() => {
    const initialTimeLeft = targetDate - new Date().getTime();
    timeLeft.value = formatTime(initialTimeLeft);
  
    startTimer(targetDate);
  });
  
  function startTimer(targetDate) {
    if (!worker) {
      worker = new Worker(new URL('../../timerWorker.js', import.meta.url), {
        type: 'module',
      });
  
      worker.onmessage = (event) => {
        if (event.data.type === 'TIMER_UPDATE') {
          timeLeft.value = formatTime(event.data.timeLeft);
        } else if (event.data.type === 'TIMER_EXPIRED') {
          alert('The wedding has arrived!');
        }
      };
    }
  
    // Send the target date to the worker to start the countdown
    worker.postMessage({
      type: 'START_TIMER',
      targetDate,
    });
  }
  
  function formatTime(milliseconds) {
    const fullArray = [];
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    if(days > 0){
        fullArray.push(`${days} dní `)
    }

    if(hours > 0){
        fullArray.push(`${String(hours).padStart(2, '0')} hodín`)
    }

    if(minutes > 0){
        fullArray.push(`${String(minutes).padStart(2, '0')} minút`)
    }

    if(seconds > 0){
        fullArray.push(`${String(seconds).padStart(2, '0')} sekúnd`)
    }

    return fullArray
  
  }
  </script>
  
  <style scoped>
  #timer {
    font-size: 3rem;
    margin: 20px 0;
  }
  </style>