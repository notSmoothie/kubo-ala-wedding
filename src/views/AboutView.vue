<script setup>
import { onMounted, reactive } from 'vue'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

const emit = defineEmits(['updateActiveSection'])

const formData = reactive({
  name: '',
  attendance: null,
  email: '',
  accommodation: 0,
  transport: 0,
  foodAllergies: '',
  alcoholPreference: 'none'
})

onMounted(() => {
  emit('updateActiveSection', 'rsvp')
})

const handleTransport = (value) => {
  if (value === 0) {
    formData.transport = 0
  } else {
    formData.transport ^= 1 << (value - 1)
  }
}

const handleSubmit = async () => {
  try {
    const docRef = await addDoc(collection(db, 'rsvps'), formData)
    console.log('RSVP submitted with ID:', docRef)

    alert('RSVP submitted successfully!')
    formData.value = {}
  } catch (error) {
    console.error('Error submitting RSVP:', error)
    alert('There was an error submitting your RSVP.')
  }
}
</script>

<template>
  <div class="container">
    <div class="form-container">
      <div style="font-size: 2rem; margin-bottom: 10px">Dorazíte? Dajte nám vedieť!</div>
      <div class="infotext-wrap">
        <p>
          Budeme vďační, ak vyplníte krátku spätnú väzbu a pomôžete nám tak s plánovaním celého dňa.
          Prosíme o vyplnenie za každého hosťa samostatne.
        </p>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-group row">
          <div class="col">
            <label for="name">Meno</label>
            <input
              v-model="formData.name"
              type="text"
              id="name"
              placeholder="Zadajte svoje meno"
              required
            />
          </div>
          <div class="col">
            <label for="email">Email pre novinky:</label>
            <input
              v-model="formData.email"
              type="email"
              id="email"
              placeholder="Zadajte svoj email"
            />
          </div>
        </div>
        <!-- Attendance Section -->
        <div class="form-group attendance-section">
          <label for="attendance">Účasť:</label>
          <div class="button-group">
            <button
              type="button"
              :class="{ active: formData.attendance === true }"
              @click="formData.attendance = true"
              required
            >
              Áno, rád sa zúčastním
            </button>
            <button
              type="button"
              :class="{ active: formData.attendance === false }"
              @click="formData.attendance = false"
              required
            >
              Nie, nebudem sa môcť zúčastniť
            </button>
          </div>
        </div>

        <!-- Show the rest of the form only if attending -->
        <div v-if="formData.attendance === true">
          <!-- Accommodation Section -->
          <div class="form-group row">
            <div class="col">
              <label>Ubytovanie:</label>
              <div class="button-group">
                <button
                  type="button"
                  :class="{ active: formData.accommodation === 0 }"
                  @click="formData.accommodation = 0"
                >
                  Bez ubytovania
                </button>
                <button
                  type="button"
                  :class="{ active: formData.accommodation === 1 }"
                  @click="formData.accommodation = 1"
                >
                  1 noc (piatok)
                </button>
                <button
                  type="button"
                  :class="{ active: formData.accommodation === 2 }"
                  @click="formData.accommodation = 2"
                >
                  2 noci (piatok aj sobota)
                </button>
              </div>
            </div>
          </div>
          <!-- Transportation Section -->
          <div class="form-group">
            <label>Doprava:</label>
            <div class="button-group">
              <button
                type="button"
                :class="{ active: formData.transport === 0 }"
                @click="handleTransport(0)"
              >
                Vlastná doprava
              </button>
              <button
                type="button"
                :class="{
                  active: formData.transport === 1 || formData.transport === 3
                }"
                @click="handleTransport(1)"
              >
                Potrebujem doviezť na svadbu
              </button>
              <button
                type="button"
                :class="{
                  active: formData.transport === 2 || formData.transport === 3
                }"
                @click="handleTransport(2)"
              >
                Potrebujem odviezť zo svadby
              </button>
            </div>
          </div>
          <!-- Allergy & Alcohol Sections -->
          <div class="form-group row">
            <div class="col">
              <label for="allergy">Jedlo:</label>
              <textarea
                v-model="formData.allergy"
                id="allergy"
                placeholder="Napíšte, ak máte nejaké alergie alebo preferenice."
              />
            </div>
            <div class="col">
              <label for="alcohol-preference">Alkohol:</label>
              <select v-model="formData.alcoholPreference" id="alcohol-preference">
                <option value="none">Žiadne</option>
                <option value="beer">Pivo</option>
                <option value="wine">Víno</option>
                <option value="spirits">Liehoviny</option>
              </select>
            </div>
          </div>
          <!-- Submit Button -->
          <button type="submit" class="submit-button">ODOSLAŤ</button>
        </div>
        <div v-else-if="formData.attendance === false">
          <button type="submit" class="submit-button small">ODOSLAŤ</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 100vw;
  padding: 40px;
  background-color: #f4f4f9d6;
  justify-items: center;
  border-radius: 10px;
}

form {
  min-width: 45vw;
}

.infotext-wrap {
  max-width: 700px;
  text-align: center;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow-y: scroll;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 20px; /* Adds space between the columns */
}

.col {
  flex: 1;
  min-width: 45%; /* Ensures fields stay side by side */
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.attendance-section {
  margin-bottom: 30px;
}

.button-group {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

button.small {
  max-width: 50%;
}

button {
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  color: #2c3e50;
  font-size: 1rem;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

button.active {
  border: 1px solid #e0b0ff;
  background-color: #d697ff;
  color: white;
}

button:hover {
  background-color: #d697ff;
  color: white;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

label {
  display: block;
  font-weight: bold;
  font-size: 1rem;
  color: #2c3e50;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px 5px;
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
  border-color: #d697ff;
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
}

input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  border-color: #d697ff;
  outline: none;
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
}

textarea {
  resize: vertical;
  height: 70px;
}

button[type='submit'] {
  background-color: #d697ff;
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

button[type='submit']:hover {
  background-color: #d697ffbb;
  transform: translateY(-2px);
}

button[type='submit']:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }

  .col {
    min-width: 100%;
  }
}
</style>
