<script setup>
import { onMounted, onUnmounted, provide, ref, defineEmits } from 'vue'
import TimerComponent from '../components/TimerComponent.vue'

const isMobile = ref(window.innerWidth <= 768)

const emit = defineEmits(['updateActiveSection'])
const activeSection = ref('')

const updateDeviceWidth = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  window.addEventListener('resize', updateDeviceWidth)

  const sections = document.querySelectorAll('.snapSection')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
          emit('updateActiveSection', activeSection.value)
        }
      })
    },
    {
      threshold: 0.5
    }
  )

  sections.forEach((section) => {
    console.log(section)

    observer.observe(section)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDeviceWidth)
})

provide('activeSection', activeSection)
</script>

<template>
  <div class="page-container">
    <div class="card snapSection" id="top" style="padding-top: 0; justify-content: start">
      <div class="card-left" style="margin-bottom: 0 !important">
        <img height="100vh" src="../assets/pic2.jpg" alt="Couple Photo" class="couple-photo" />
      </div>
      <div class="card-right">
        <div class="cardContent">
          <div class="contentWrap">
            <div class="invitationDate">25.4.2025</div>
            <h1 class="heading">Príďte s nami osláviť náš veľký deň</h1>

            <p class="invitation-text">
              S radosťou Vás vítame na tomto mieste, kde budeme zdieľať všetky potrebné informácie a
              pripravovať Vás na náš nezabudnuteľný deň. <br />
              <br />Veríme, že spoločne vytvoríme deň, ktorý bude plný lásky, smiechu a
              nezabudnuteľných momentov.<br />
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="card snapSection" id="timer">
      <div class="card-full">
        <img src="../assets/border1.png" style="height: 10vh; transform: scaleX(-1)" />
        <div style="display: flex; justify-content: center; position: relative">
          <TimerComponent style="margin: 8vh 0"></TimerComponent>
        </div>
        <img src="../assets/border1.png" style="height: 10vh" />
      </div>
    </div>

    <div class="card snapSection" id="middle" style="flex-wrap: wrap">
      <h1
        :style="isMobile ? `order: -2` : ''"
        style="font-size: 3rem; padding-top: 1rem; width: 100vw"
      >
        Užitočné informácie
      </h1>

      <div class="card-left">
        <div
          v-if="!isMobile"
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: 100%;
          "
        >
          <div style="display: flex; flex-direction: row">
            <div class="colorPatch" style="background-color: #ffffff">Biela</div>
            <div class="colorPatch" style="background-color: #f2e2c9; margin-left: -40px">
              Krémová
            </div>
            <div class="colorPatch" style="background-color: #cf9fff; margin-left: -40px">
              Fialová
            </div>
            <div class="colorPatch" style="background-color: #cec2eb; margin-left: -40px">
              Bledofialová
            </div>
          </div>
        </div>
        <div
          v-else
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: 100%;
          "
        >
          <div style="display: flex; flex-direction: column">
            <div style="display: flex; align-items: center; justify-content: center">
              <div class="colorPatchMobile" style="background-color: #ffffff"></div>
              <div style="margin-left: 20px">Biela</div>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                flex-direction: row-reverse;
                justify-content: center;
                margin-top: -10%;
              "
            >
              <div class="colorPatchMobile" style="background-color: #f2e2c9"></div>
              <div style="margin-right: 20px">Krémová</div>
            </div>
            <div style="display: flex; align-items: center; margin-top: -10%">
              <div
                class="colorPatchMobile"
                style="background-color: #cf9fff; justify-content: center"
              ></div>
              <div style="margin-left: 20px">Fialová</div>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                flex-direction: row-reverse;
                justify-content: center;
                margin-top: -10%;
              "
            >
              <div class="colorPatchMobile" style="background-color: #cec2eb"></div>
              <div style="margin-right: 20px">Bledofialová</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-right" :style="isMobile ? `order: -1` : ''">
        <div class="cardContent">
          <div class="contentWrap">
            <div class="subheading">Svadobné farby</div>
            <p>
              Svadba bude zladená do týchto farieb. Farby síce máme, ale
              <b>dress code stanovený nie je</b>
              - budeme radi ak sa budete cítiť pohodlne.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-right">
        <div class="cardContent">
          <div class="contentWrap">
            <div class="subheading">Svadobné dary</div>
            <p style="margin-bottom: 20px">
              Najväčším darom pre nás bude, ak tento deň strávite s nami, a užijete si ho. Pokiaľ by
              ste nás aj napriek tomu radi obdarovali, na mieste bude krabička na obálky.
            </p>
            <p>
              Nerobte si starosti k kyticami, nevestu najviac poteší <b>1 červená ružička</b> od
              každého hosťa.
            </p>
          </div>
        </div>
      </div>
      <div class="card-left">
        <img
          style="padding: 20px"
          :style="isMobile ? `width: 80%` : `width: 50%`"
          src="../assets/cute.png"
        />
      </div>
    </div>
    <div class="card">
      <div class="card-left" style="text-align: left">
        <img style="width: 100%" src="../assets/dolina2.jpg" />
      </div>
      <div class="card-right" :style="isMobile ? `order: -1` : ''">
        <div class="cardContent">
          <div class="contentWrap">
            <div class="subheading">Ubytovanie</div>
            <p>
              V penzióne sú k dispozícií <b>2-lôžkové</b> izby s kapacitou <b>50 osôb</b>.
              Ubytovanie Vám veľmi radi rezervujeme (stačí uviesť vo formulári). V cene ubytovania
              sú aj raňajky.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="height: 50vh">
      <div class="card-full">
        <div class="cardContent">
          <div class="contentWrap">
            <div class="subheading">Miesto svadby</div>

            <p>
              Svoje áno si povieme v krásnom <b>penzióne Dolina</b> v obci <b>Horné Lefantovce</b> o
              <b>15:00</b>. Celý areál bude v deň svadby uzavretý, takže ste vítaní kedykoľvek od
              10:00. Parkovacích miest je dostatok. V prípade potreby veľmi radi zabezpečíme dopravu
              na a zo svadby. Koniec svadby je otvorený, takže času na zábavu bude dostatok.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="card" style="height: 50vh">
      <div class="card-full">
        <div style="width: 100%; height: 50vh">
          <iframe
            width="100%"
            height="100%"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Dolina,%20Lie%C4%8Debn%C3%BD%20%C3%BAstav,%20951%2045%20Horn%C3%A9%20Lefantovce,%20Slovensko+(Penzi%C3%B3n%20Dolina)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
