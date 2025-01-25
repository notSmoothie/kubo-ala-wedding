<script setup>
import { onMounted, reactive, ref } from 'vue'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const router = useRouter()

const emit = defineEmits(['updateActiveSection'])

const isSubmitting = ref(false)

const formData = reactive({
  name: '',
  attendance: null,
  email: '',
  accommodation: null,
  transport: null,
  food: '',
  alcohol: [],
  alcoholCustom: ''
})

const formValidations = reactive({
  name: true,
  attendance: true,
  accommodation: true,
  transport: true
})

const toggleAlcohol = (option) => {
  const index = formData.alcohol.indexOf(option)
  if (index > -1) {
    formData.alcohol.splice(index, 1)
  } else {
    formData.alcohol.push(option)
  }
}

const validateForm = () => {
  formValidations.name = !!formData.name
  formValidations.attendance = formData.attendance !== null
  formValidations.accommodation = formData.attendance === false || formData.accommodation !== null
  formValidations.transport = formData.attendance === false || formData.transport !== null

  setTimeout(() => {
    formValidations.name = true
    formValidations.attendance = true
    formValidations.accommodation = true
    formValidations.transport = true
  }, 3000)
}

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
  if (isSubmitting.value) return

  isSubmitting.value = true

  validateForm()

  if (
    !formValidations.name ||
    !formValidations.attendance ||
    !formValidations.accommodation ||
    !formValidations.transport
  ) {
    isSubmitting.value = false
    return
  }

  let sendableData = { ...formData }

  if (formData.attendance === false) {
    delete sendableData.accommodation
    delete sendableData.transport
    delete sendableData.food
    delete sendableData.alcohol
  }

  if (formData.alcoholCustom) {
    const customIndex = formData.alcohol.findIndex((option) => option === 'custom')
    if (customIndex !== -1) {
      formData.alcohol[customIndex] = `Iné: ${formData.alcoholCustom}`
    }
  }

  delete sendableData.alcoholCustom

  sendableData.alcohol = formData.alcohol.join(', ')

  try {
    await addDoc(collection(db, 'rsvps'), sendableData)
    router.push('/thank-you')
  } catch (error) {
    console.error('Error submitting RSVP:', error)
    isSubmitting.value = false
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
      <form style="max-width: 95%" novalidate @submit.prevent="handleSubmit">
        <div class="form-group row">
          <div class="col">
            <label for="name">Meno:</label>
            <input
              v-model="formData.name"
              type="text"
              id="name"
              :class="{ 'input-invalid': !formValidations.name }"
              placeholder="Zadajte svoje meno"
              required
            />
          </div>
          <div class="col">
            <label for="email">Email pre novinky:</label>
            <input
              required
              v-model="formData.email"
              type="email"
              id="email"
              placeholder="Zadajte svoj email"
            />
          </div>
        </div>
        <!-- Attendance Section -->
        <div class="form-group attendance-section">
          <div style="margin: 15px" class="button-group">
            <button
              type="button"
              :class="{
                active: formData.attendance === true,
                'button-invalid': !formValidations.attendance
              }"
              @click="formData.attendance = true"
              required
            >
              Áno, vidíme sa 🫠
            </button>
            <button
              type="button"
              :class="{
                active: formData.attendance === false,
                'button-invalid': !formValidations.attendance
              }"
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
                  :class="{
                    active: formData.accommodation === 0,
                    'button-invalid': !formValidations.accommodation
                  }"
                  @click="formData.accommodation = 0"
                >
                  Bez ubytovania
                </button>
                <button
                  type="button"
                  :class="{
                    active: formData.accommodation === 1,
                    'button-invalid': !formValidations.accommodation
                  }"
                  @click="formData.accommodation = 1"
                >
                  1 noc (piatok)
                </button>
                <button
                  type="button"
                  :class="{
                    active: formData.accommodation === 2,
                    'button-invalid': !formValidations.accommodation
                  }"
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
                :class="{
                  active: formData.transport === 0,
                  'button-invalid': !formValidations.accommodation
                }"
                @click="handleTransport(0)"
              >
                Vlastná doprava
              </button>
              <button
                type="button"
                :class="{
                  active: formData.transport === 1 || formData.transport === 3,
                  'button-invalid': !formValidations.accommodation
                }"
                @click="handleTransport(1)"
              >
                Chcem doviezť na svadbu
              </button>
              <button
                type="button"
                :class="{
                  active: formData.transport === 2 || formData.transport === 3,
                  'button-invalid': !formValidations.accommodation
                }"
                @click="handleTransport(2)"
              >
                Chcem odviezť zo svadby
              </button>
            </div>
          </div>
          <!-- Allergy & Alcohol Sections -->
          <div class="form-group row">
            <div class="col">
              <label for="allergy">Jedlo:</label>
              <textarea
                v-model="formData.food"
                id="allergy"
                placeholder="Napíšte, ak máte nejaké alergie alebo preferencie."
              />
            </div>
            <!-- Alcohol Chips Section -->
            <div class="form-group row">
              <div class="col">
                <label for="alcohol-preference">Pitie:</label>
                <div class="chips-container">
                  <button
                    type="button"
                    :class="{
                      active: formData.alcohol.includes('Abstinent'),
                      'button-invalid': !formValidations.accommodation
                    }"
                    @click="toggleAlcohol('Abstinent')"
                  >
                    Abstinent
                  </button>
                  <!-- Underage Option -->
                  <button
                    type="button"
                    :class="{
                      active: formData.alcohol.includes('Pod-18'),
                      'button-invalid': !formValidations.accommodation
                    }"
                    @click="toggleAlcohol('Pod-18')"
                  >
                    &lt;18
                  </button>
                  <button
                    type="button"
                    :class="{
                      active: formData.alcohol.includes('Pivo'),
                      'button-invalid': !formValidations.accommodation
                    }"
                    @click="toggleAlcohol('Pivo')"
                  >
                    Pivo
                  </button>
                  <button
                    type="button"
                    :class="{
                      active: formData.alcohol.includes('Biele Víno'),
                      'button-invalid': !formValidations.accommodation
                    }"
                    @click="toggleAlcohol('Biele Víno')"
                  >
                    Biele Víno
                  </button>
                  <button
                    type="button"
                    :class="{
                      active: formData.alcohol.includes('Červené Víno'),
                      'button-invalid': !formValidations.accommodation
                    }"
                    @click="toggleAlcohol('Červené Víno')"
                  >
                    Červené Víno
                  </button>
                  <button
                    type="button"
                    :class="{
                      active: formData.alcohol.includes('Vodka'),
                      'button-invalid': !formValidations.accommodation
                    }"
                    @click="toggleAlcohol('Vodka')"
                  >
                    Vodka
                  </button>
                  <button
                    type="button"
                    :class="{
                      active: formData.alcohol.includes('Rum'),
                      'button-invalid': !formValidations.accommodation
                    }"
                    @click="toggleAlcohol('Rum')"
                  >
                    Rum
                  </button>
                  <button
                    type="button"
                    :class="{
                      active: formData.alcohol.includes('Whiskey'),
                      'button-invalid': !formValidations.accommodation
                    }"
                    @click="toggleAlcohol('Whiskey')"
                  >
                    Whiskey
                  </button>
                  <button
                    type="button"
                    :class="{
                      active: formData.alcohol.includes('Gin'),
                      'button-invalid': !formValidations.accommodation
                    }"
                    @click="toggleAlcohol('Gin')"
                  >
                    Gin
                  </button>
                  <button
                    type="button"
                    :class="{
                      active: formData.alcohol.includes('Domáce'),
                      'button-invalid': !formValidations.accommodation
                    }"
                    @click="toggleAlcohol('Domáce')"
                  >
                    Domáce
                  </button>
                  <button
                    type="button"
                    :class="{
                      active: formData.alcohol.includes('custom'),
                      'button-invalid': !formValidations.accommodation
                    }"
                    @click="toggleAlcohol('custom')"
                  >
                    Iné
                  </button>
                  <input
                    type="text"
                    style="margin: 0"
                    v-if="formData.alcohol.includes('custom')"
                    v-model="formData.alcoholCustom"
                    placeholder="Iné..."
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Submit Button -->
          <button :disabled="isSubmitting" type="submit" class="submit-button">
            <div
              style="display: flex; align-items: center; width: 100%; justify-content: center"
              v-if="isSubmitting"
            >
              <span class="spinner"></span>
              <span>Odosielam...</span>
            </div>
            <span v-else>ODOSLAŤ</span>
          </button>
        </div>
        <div v-else-if="formData.attendance === false">
          <button :disabled="isSubmitting" type="submit" class="submit-button">
            <div
              style="display: flex; align-items: center; width: 100%; justify-content: center"
              v-if="isSubmitting"
            >
              <span class="spinner"></span>
              <span>Odosielam...</span>
            </div>
            <span v-else>ODOSLAŤ</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 90vw;
  padding: 3vh 5vw;
  background-color: #f4f4f9d6;
  justify-items: center;
  border-radius: 10px;
}

form {
  min-width: 55vw;
}

.infotext-wrap {
  max-width: 700px;
  padding: 10px;
  text-align: center;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow-y: scroll;
}

.submit-button {
  max-width: 90vw;
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

.chips-container {
  display: flex;
  gap: 10px;
  max-width: calc(min(95vw, 700px));
  flex-wrap: wrap;
  margin-top: 10px;
}

.chips-container button {
  padding: 8px 15px;
  border-radius: 16px;
  background-color: #f4f4f9;
  color: #2c3e50;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid #ddd;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.chips-container button.active {
  background-color: #d697ff99;
  color: black;
  border: 1px solid #e0b0ff;
}

.chips-container button:hover {
  background-color: #d697ff;
  color: white;
  transform: translateY(-2px);
}

.chips-container button:active {
  transform: translateY(0);
}

.chips-container button:disabled {
  background-color: #ddd;
  color: #aaa;
  cursor: not-allowed;
  box-shadow: none;
}

.chips-container button:disabled:hover {
  background-color: #ddd;
}

.spinner {
  border: 3px solid #ffffff; /* Light gray for the outer border */
  border-top: 3px solid #bb54ff; /* Bright blue for the top border */
  border-radius: 50%;
  width: 20px; /* Increased size */
  height: 20px; /* Increased size */
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: 12px; /* Added a bit more space */
  vertical-align: middle; /* Align the spinner with the text */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.form-group:not(:last-child) {
  margin-bottom: 15px;
  padding: 0 15px;
}

.attendance-section {
  margin-bottom: 30px;
}

.button-group {
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

.input-invalid {
  border-color: red;
}

.button-invalid {
  border: 1px solid red;
  background-color: #ffcccc;
}

button.active {
  border: 1px solid #e0b0ff;
  background-color: #d697ff99;
  color: black;
}

button:hover {
  background-color: #d697ff;
  color: white;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

button:disabled {
  background-color: #ddd; /* Light gray to indicate disabled state */
  color: #aaa; /* Dim the text */
  cursor: not-allowed; /* Change cursor to show the button is not clickable */
  box-shadow: none; /* Remove any box shadow to indicate it's inactive */
}

button:disabled:hover {
  background-color: #ddd; /* Maintain the same background color when hovered */
  transform: none; /* Prevent any hover effects */
}

label {
  display: block;
  font-weight: bold;
  font-size: 1.2rem;
  color: #2c3e50;
}

input,
select,
textarea {
  width: 95%;
  padding: 12px 5px;
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1.1rem;
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
  .chips-container {
    justify-content: center;
  }

  form {
    min-width: 100vw;
  }

  button.active:hover {
    border: 1px solid #e0b0ff;
    background-color: #d697ff99;
    color: black;
  }

  button:hover {
    background-color: unset;
    color: unset;
    transform: unset;
  }

  .chips-container button:hover {
    background-color: inherit;
    color: inherit;
    transform: inherit;
  }

  .chips-container button.active:hover {
    background-color: #d697ff99;
    color: inherit;
    transform: inherit;
  }

  .row {
    flex-direction: column;
  }

  .col {
    min-width: 100%;
  }
}
</style>
