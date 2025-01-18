<script setup>
import { reactive } from 'vue'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

const formData = reactive({
  name: '',
  attendance: '',
  email: '',
  accommodation: '',
  nights: '',
  transport: {
    arrival: false,
    departure: false
  },
  allergy: '',
  alcoholPreference: 'none'
})

const handleSubmit = async () => {
  try {
    const docRef = await addDoc(collection(db, 'rsvps'), formData)
    console.log('RSVP submitted with ID:', docRef)

    alert('RSVP submitted successfully!')
    formData.value = {} // Clear the form
  } catch (error) {
    console.error('Error submitting RSVP:', error)
    alert('There was an error submitting your RSVP.')
  }
}
</script>

<template>
  <div class="form-container">
    {{ formData }}

    <h1>Potvrdenie účasti</h1>
    <p>
      DORAZÍTE? DAJTE NÁM VEDIEŤ! Budeme vďační, ak vyplníte krátku zpetnú väzbu a pomôžete nám tak
      s plánovaním celého dňa. Prosíme o vyplnenie za každého hosťa samostatne. Pokiaľ zakliknete
      neúčasť, nie je potreba vyplňovať dalšie odpovede.
    </p>

    <form @submit.prevent="handleSubmit">
      <!-- Name Input -->
      <label for="name">Meno</label>
      <input
        v-model="formData.name"
        type="text"
        id="name"
        placeholder="Zadajte svoje meno"
        required
      />

      <!-- Attendance Option -->
      <label>Rád sa zúčastním.</label>
      <input v-model="formData.attendance" type="radio" value="attending" id="attending" required />
      <label for="attending">Veľmi ma to mrzí, ale nedorazím</label>
      <input
        v-model="formData.attendance"
        type="radio"
        value="not-attending"
        id="not-attending"
        required
      />

      <!-- Email Input -->
      <label for="email">Email pre novinky:</label>
      <input v-model="formData.email" type="email" id="email" placeholder="Zadajte svoj email" />

      <!-- Accommodation -->
      <label>Ubytovanie:</label>
      <label for="pension">Rád by som sa ubytoval v penzióne.</label>
      <input v-model="formData.accommodation" type="radio" id="pension" value="pension" />

      <!-- Nights Selection -->
      <div v-if="formData.accommodation === 'pension'">
        <label>Koľko nocí?</label>
        <label for="one-night">1 (sobota)</label>
        <input v-model="formData.nights" type="radio" value="1" id="one-night" />
        <label for="two-nights">2 (piatok aj sobota)</label>
        <input v-model="formData.nights" type="radio" value="2" id="two-nights" />
      </div>

      <label for="no-accommodation">Ubytovanie nepotrebujem.</label>
      <input
        v-model="formData.accommodation"
        type="radio"
        value="no-accommodation"
        id="no-accommodation"
      />

      <!-- Transportation -->
      <label>Doprava:</label>
      <label for="arrival">Rád by som sa nechal doviesť na svadbu.</label>
      <input v-model="formData.transport.arrival" type="checkbox" id="arrival" />
      <label for="departure">Rád by som sa nechal odviesť zo svadby.</label>
      <input v-model="formData.transport.departure" type="checkbox" id="departure" />
      <label for="self-transport">Dopravu si zabezpečím.</label>
      <input v-model="formData.transport" type="checkbox" id="self-transport" />

      <!-- Allergy Input -->
      <label for="allergy">Alergia na jedlo:</label>
      <textarea
        v-model="formData.allergy"
        id="allergy"
        placeholder="Napíšte, ak máte nejaké alergie."
      />

      <!-- Alcohol Preference -->
      <label for="alcohol-preference">Preferencia alkoholu:</label>
      <select v-model="formData.alcoholPreference" id="alcohol-preference">
        <option value="none">Žiadne</option>
        <option value="beer">Pivo</option>
        <option value="wine">Víno</option>
        <option value="spirits">Špirálové nápoje</option>
      </select>

      <!-- Submit Button -->
      <button type="submit">ODOSLAŤ</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  font-family: 'Roboto', sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2.2rem;
}

p {
  text-align: center;
  color: #7f8c8d;
  font-size: 1rem;
  margin-bottom: 30px;
}

label {
  display: block;
  margin-top: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #2c3e50;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #3498db;
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
}

input[type='radio'],
input[type='checkbox'] {
  width: auto;
  margin-right: 10px;
}

textarea {
  resize: vertical;
  height: 150px;
}

button {
  background-color: #3498db;
  color: white;
  padding: 15px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
  width: 100%;
  margin-top: 20px;
}

button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

input[type='radio']:checked,
input[type='checkbox']:checked {
  background-color: #3498db;
  border-color: #3498db;
}

input[type='radio']:focus,
input[type='checkbox']:focus {
  outline: none;
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
}

select {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
}

select:focus {
  border-color: #3498db;
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
}

@media (max-width: 600px) {
  .form-container {
    padding: 20px;
  }

  h1 {
    font-size: 1.8rem;
  }

  p {
    font-size: 0.9rem;
  }

  label,
  button {
    font-size: 1rem;
  }

  input,
  select,
  textarea {
    font-size: 1rem;
  }
}
</style>
