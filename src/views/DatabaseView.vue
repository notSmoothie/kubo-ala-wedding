<template>
  <div class="rsvp-container">
    <h2 class="rsvp-title">RSVP List</h2>

    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem">
      <div class="search-box">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by name or email..."
          class="search-input"
        />
      </div>

      <div class="filter-box">
        <i
          @click="toggleAttendance"
          :class="hideNotAttending ? 'positive' : 'negative'"
          class="rsvp-icon fas fa-user-check"
        ></i>
      </div>
    </div>

    <div v-if="rsvps.length > 0" class="rsvp-grid">
      <transition-group name="rsvp-transition" tag="div" class="rsvp-grid">
        <div v-for="rsvp in filteredRsvps" :key="rsvp.id" class="rsvp-card">
          <!-- Name and Email -->
          <div class="rsvp-header">
            <h3 class="rsvp-name">{{ rsvp.name }}</h3>
            <p class="rsvp-email">{{ rsvp.email }}</p>
          </div>
          <div v-if="rsvp.attendance">
            <!-- Accommodation Icon -->
            <div class="rsvp-detail">
              <span class="rsvp-label">
                <i class="rsvp-icon fas fa-bed"></i>
              </span>
              <span class="rsvp-value">{{ getAccommodationText(rsvp.accommodation) }}</span>
            </div>
            <!-- Transport Icon -->
            <div class="rsvp-detail">
              <span class="rsvp-label">
                <i class="rsvp-icon fas fa-car"></i>
              </span>
              <span class="rsvp-value"
                ><span>{{ getTransportText(rsvp.transport) }}</span></span
              >
            </div>
            <!-- Alcohol Preferences -->
            <div v-if="rsvp.alcohol" class="rsvp-detail">
              <span class="rsvp-label"><i :class="'fas fa-wine-glass'" class="rsvp-icon"></i></span>
              <span class="rsvp-value">{{ rsvp.alcohol }}</span>
            </div>
            <!-- Food Allergies -->
            <div v-if="rsvp.foodAllergies" class="rsvp-detail">
              <span class="rsvp-label"><i class="rsvp-icon fas fa-utensils"></i></span>
              <span class="rsvp-value">{{ rsvp.foodAllergies }}</span>
            </div>
          </div>
          <div class="rsvp-card-not" v-else>
            <i class="fas fa-times-circle rsvp-icon-big negative"></i>
          </div>
        </div>
      </transition-group>
    </div>
    <div v-else class="no-rsvps">
      <p>No RSVPs found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'

const rsvps = ref([])
const searchQuery = ref('')
const hideNotAttending = ref(false)

// Listen to a collection
const listenToCollection = () => {
  const colRef = query(collection(db, 'rsvps'), orderBy('createdAt', 'desc'))
  onSnapshot(colRef, (snapshot) => {
    rsvps.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  })
}

onMounted(() => {
  listenToCollection()
})

const filteredRsvps = computed(() => {
  return rsvps.value.filter((rsvp) => {
    const name = rsvp.name.toLowerCase()
    const email = rsvp.email.toLowerCase()
    const query = searchQuery.value.toLowerCase()

    // Check if it matches the query
    const matchesQuery = name.includes(query) || email.includes(query)

    // Check if attendance should be considered
    const matchesAttendance = hideNotAttending.value ? rsvp.attendance : true

    return matchesQuery && matchesAttendance
  })
})

const toggleAttendance = () => {
  hideNotAttending.value = !hideNotAttending.value
}

const getAccommodationText = (accommodation) => {
  switch (accommodation) {
    case 0:
      return 'No Accommodation'
    case 1:
      return '1 Night'
    case 2:
      return '2 Nights'
    default:
      return ''
  }
}

const getTransportText = (transport) => {
  switch (transport) {
    case 0:
      return 'No Transport'
    case 1:
      return 'To Wedding'
    case 2:
      return 'From Wedding'
    case 3:
      return 'To and From Wedding'
    default:
      return ''
  }
}
</script>

<style scoped>
/* Container */
.rsvp-container {
  margin: 0 auto;
  padding: 2rem 1rem;
  border-radius: 12px;
}

/* Transition for cards */
.rsvp-transition-enter-active,
.rsvp-transition-leave-active {
  opacity: 0;
  transform: translateX(-50px);
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out;
}

.rsvp-transition-enter-to {
  opacity: 1;
  transform: translateX(0); /* Cards animate into their normal position */
}

/* For the leave transition */
.rsvp-transition-leave-to {
  opacity: 0;
  transform: translateX(-50px); /* Cards move off-screen to the left */
}

/* Title */
.rsvp-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
  font-weight: 700;
}

/* Actions */
.actions {
  text-align: center;
  margin-bottom: 1.5rem;
}

.add-rsvp-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-rsvp-button:hover {
  background-color: #0056b3;
}

.add-rsvp-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.search-box {
  width: 30vw;
  text-align: start;
  margin-bottom: 1rem;
}

.filter-box {
  width: 30vw;
  text-align: end;
  margin-bottom: 1rem;
}

.search-input {
  width: 80%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;
  max-width: 500px;
  margin: 0 auto;
}

.search-input:focus {
  border-color: #82019c;
}

.rsvp-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(500px, 1fr)
  ); /* Adjust the minimum size for better use of space */
  gap: 1.5rem;
}

.rsvp-card-not {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* For smaller screens (mobile) */
@media (max-width: 600px) {
  .rsvp-grid {
    grid-template-columns: 1fr; /* 1 card per row on mobile */
  }
}

/* RSVP Card */
.rsvp-card {
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 10px;
  min-height: 150px;
  outline: 1px solid #8c019933;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Card Header */
.rsvp-header {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.rsvp-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #34495e;
}

.rsvp-email {
  font-size: 0.875rem;
  color: #888;
}

/* RSVP Details */
.rsvp-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  padding: 0.1rem 0.3rem;
  color: #555;
}

.rsvp-detail:nth-child(odd) {
  background-color: #f9f9f9; /* Light gray for odd rows */
}

.rsvp-detail:nth-child(even) {
  background-color: #ffffff; /* White for even rows */
}

/* Optionally, add a hover effect for interaction */
.rsvp-detail:hover {
  background-color: #e8e8e8; /* Slightly darker gray for hover */
}

.rsvp-label {
  font-weight: 500;
  color: #2c3e50;
  margin: 0 5px;
}

.rsvp-value {
  font-weight: 500;
  text-align: end;
}

.rsvp-value.positive {
  color: #28a745;
}

.rsvp-value.negative {
  color: #dc3545;
}

.rsvp-icon {
  font-size: 1.25rem;
}

.rsvp-icon-big {
  font-size: 2rem;
}

.rsvp-icon.positive {
  color: #28a745;
}

.negative {
  color: #dc3545;
}

/* No RSVPs */
.no-rsvps {
  text-align: center;
  font-size: 1.25rem;
  color: #999;
}
</style>
