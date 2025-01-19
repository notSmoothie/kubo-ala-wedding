<template>
  <div class="thank-you-container">
    <div class="thank-you-message">
      <h1>Ďakujeme za vyplnenie!</h1>
      <p>
        Vaša odpoveď bola úspešne odoslaná. <br />
        Potvrdenie dostanete emailom.
      </p>
      <div style="display: flex; flex-direction: column">
        <router-link to="/" class="redirect-button">Späť na domovskú stránku</router-link>
        <router-link to="/rsvp" class="redirect-button">Ďalší formulár</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, onMounted } from 'vue'

const emit = defineEmits(['updateActiveSection'])

onMounted(() => {
  emit('updateActiveSection', 'rsvp')
})
</script>

<style scoped>
.thank-you-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
}

.thank-you-message {
  text-align: center;
  max-width: 600px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 50px;
}

p {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 20px;
}

.redirect-button {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1.1rem;
  color: white;
  background-color: #d697ff;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.redirect-button:hover {
  background-color: #b87ecf;
}

.redirect-button:active {
  background-color: #9e6ab8;
}
</style>
