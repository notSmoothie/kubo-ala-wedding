<template>
  <div class="program-container">
    <h1 class="program-title">Program svadby</h1>
    <hr
      style="
        margin-bottom: 40px;
        margin-top: 10px;
        width: 250px;
        border: 1px solid #d697ff;
        background-color: #d697ff;
      "
    />

    <div class="timeline">
      <img class="timeline-start" src="../assets/heart.svg" alt="Heart" width="25" />
      <!-- 14:30 Arrival -->
      <div class="timeline-item">
        <div class="timeline-time">14:30</div>
        <div class="timeline-content">
          <h3>🚗 Príchod na obrad</h3>
          <p>
            Pred začiatkom sa presuňte k miestu obradu, v prípade pekného počasia bude obrad na
            začiatku areálu, v prípade dažďa priamo v penzióne.
          </p>
          <p class="note">Ak ste ubytovaní, dorazte mierne v predstihu.</p>
        </div>
      </div>

      <!-- 15:00 Ceremony -->
      <div class="timeline-item">
        <div class="timeline-time">15:00</div>
        <div class="timeline-content">
          <h3>💍 Obrad</h3>
          <p>Povieme si svoje áno.</p>
        </div>
      </div>

      <!-- Menu -->
      <div class="timeline-item menu-section">
        <div class="timeline-content">
          <h3>🍽️ Večera</h3>
          <p>
            Po obrade, gratuláciách, spoločnej fotografii a úvodných slovách na nás čaká spoločná
            večera v penzióne.
          </p>
          <div class="menu-list">
            <p><b>Prípitok:</b> ružové šumivé víno (samozrejme aj v nealko verzii)</p>
            <p>
              <b>Predjedlo:</b> Syrová roláda plnená jarnou bryndzou s mladou zeleninou a bylinkovým
              kaviárom
            </p>
            <p><b>Polievka:</b> Silný kohúti vývar so zeleninou a rezancami</p>
            <p>
              <b>Hlavné jedlo:</b> Kurací supreme s hráškovým pyré pečeným zemiakom s Creme Fresh a
              demi glace
            </p>
          </div>
          <p class="note">
            Pozn.: mysleli sme na všetky alergie/intolerancie, ale pre istotu sa kľudne pripomeňte
            obsluhe
          </p>
        </div>
      </div>

      <!-- Group Photo -->
      <div class="timeline-item">
        <div class="timeline-content">
          <h3>📸 Skupinové foto</h3>
          <p>
            Po večeri nás čaká spoločná fotka. Pripravte si svoje najkrajšie úsmevy! Táto fotka
            zostane pamiatkou na náš špeciálny deň.
          </p>
        </div>
      </div>

      <!-- Opening the dance floor -->
      <div class="timeline-item">
        <div class="timeline-content">
          <h3>💃 Otvoríme tanečný parket</h3>
          <p>
            Prvý mladomanželský tanec oficiálne otvorí tanečnú zábavu! Pridajte sa k nám a
            roztancujme spolu parket do neskorých nočných hodín.
          </p>
        </div>
      </div>

      <!-- Photo Booth available -->
      <div class="timeline-item">
        <div class="timeline-time">18:30 - 21:30</div>
        <div class="timeline-content">
          <h3>📷 Fotobúdka k dispozícii</h3>
          <p>
            V tomto čase bude k dispozícií fotobúdka - budeme radi, ak nám zanecháte foto a odkaz v
            svadobnej fotoknihe. Môžete ju využiť kedykoľvek v tomto časovom rozmedzí.
          </p>
          <p class="note">
            Zároveň vás o tomto čase poprosíme, aby ste sa odpojili z Wifi, aby mala fotobúdka čo
            najviac internetu (fotky z búdky budú dostupné aj neskôr online)
          </p>
        </div>
      </div>

      <!-- Evening Activities -->
      <div class="timeline-item">
        <div class="timeline-content">
          <h3>🎉 Večerný program</h3>
          <p>
            Okrem iného náš čaká samozrejme svadobná torta, prskavky, druhá (alebo aj tretia) večera
            vo forme bufetových stolov, veľa zábavy a tanca
          </p>
        </div>
      </div>

      <!-- Midnight -->
      <div class="timeline-item">
        <div class="timeline-time">Polnoc</div>
        <div class="timeline-content">
          <h3>👰 Čepčenie</h3>
          <p>O polnoci odčepčíme a vytancujeme nevestu</p>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-content" style="margin-bottom: 0; padding-bottom: 0">
          <h3>Pokračujeme až do rána</h3>
        </div>
      </div>
      <img class="timeline-end" src="../assets/heart.svg" alt="Heart" width="25" />
    </div>

    <hr
      style="margin-top: 60px; width: 250px; border: 1px solid #d697ff; background-color: #d697ff"
    />

    <!-- Drinks Section -->
    <div class="drinks-section">
      <h2 style="display: flex; justify-content: center;">Nápoje</h2>
      <div class="drinks-container">
        <div class="drinks-column">
          <h3>🍸 Alkoholické nápoje</h3>
          <ul>
            <li>Domáca Jabĺčkovica</li>
            <li>Domáca Mirabelkovica</li>
            <li>Vodka</li>
            <li>Gin</li>
            <li>Ružový G&T</li>
            <li>Jägermeister</li>
            <li>Tmavý rum</li>
            <li>Čapované pivo, Martins 12°</li>
            <li>Biele víno - Tramín Červený</li>
            <li>Červené víno - Zwiegeltrebe</li>
            <li>Šumivé víno</li>
          </ul>
        </div>
        <div class="drinks-column">
          <h3>🥤 Nealkoholické nápoje</h3>
          <ul>
            <li>Káva</li>
            <li>Čapovaná Kofola</li>
            <li>Limonáda</li>
            <li>Ostatné nealko na vyžiadanie na bare</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const emit = defineEmits(['updateActiveSection'])

onMounted(() => {
  emit('updateActiveSection', 'program')
})
</script>

<style scoped>
.program-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
  padding: 100px 20px 40px;
}

.program-title {
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  color: #2c3e50;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  width: 2px;
  height: 100%;
  background: #d697ff;
}

.timeline-start {
  position: absolute;
  left: 21px;
  transform: translateX(-50%);
  top: -20px;
}

.timeline-end {
  position: absolute;
  left: 21px;
  transform: translateX(-50%) rotate(180deg);
  bottom: -20px;
}

.timeline-item {
  position: relative;
  padding-left: 90px;
  margin-bottom: 30px;
}

.timeline-time {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #d697ff;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
  text-align: center;
  min-width: 40px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.timeline-content {
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #d697ff;
}

.timeline-content h3 {
  margin-top: 0;
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.timeline-content p {
  margin: 10px 0;
  font-size: 1.1rem;
  line-height: 1.6;
}

.note {
  font-style: italic;
  color: #333333;
  background-color: rgba(214, 151, 255, 0.08);
  padding: 5px;
  border-radius: 0px 5px 5px 0px;
  border-left: 3px solid #d697ff;
  padding-left: 10px;
}

.menu-section {
  margin: 30px 0;
}

.menu-list {
  list-style: none;
  text-align: left;
  padding: 0;
}

.menu-list p {
  margin: 10px 0;
  line-height: 1.6;
  font-size: 1.1rem;
}

.menu-item {
  font-weight: bold;
  color: #2c3e50;
}

.drinks-section {
  padding: 30px;
  border-radius: 10px;
  margin-top: 20px;
}

.drinks-section h2 {
  margin-bottom: 30px;
  font-size: 2rem;
  color: #2c3e50;
}

.drinks-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.drinks-column {
  flex: 1;
  min-width: 250px;
}

.drinks-column h3 {
  border-bottom: 2px solid #d697ff;
  padding-bottom: 10px;
  margin-bottom: 15px;
  color: #2c3e50;
}

.drinks-column ul {
  list-style: none;
  padding: 0;
}

.drinks-column li {
  margin: 8px 0;
  position: relative;
  padding-left: 20px;
  font-size: 1.1rem;
}

.drinks-column li:before {
  content: '•';
  color: #d697ff;
  position: absolute;
  left: 0;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .program-container {
    padding-top: 60px;
  }

  .timeline-time {
    width: 50px;
  }

  .timeline-start {
    position: absolute;
    left: 16px;
    transform: translateX(-50%);
    top: -20px;
  }

  .timeline-end {
    position: absolute;
    left: 16px;
    transform: translateX(-50%) rotate(180deg);
    bottom: -20px;
  }

  .timeline::before {
    left: 15px;
  }

  .timeline-item {
    padding-left: 60px;
  }

  .timeline-time {
    font-size: 0.9rem;
    min-width: 30px;
  }

  .drinks-container {
    flex-direction: column;
  }
}
</style>
