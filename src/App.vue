<script setup></script>

<template>
  <header>
    <div class="card">
      <img
        src="./assets/flipborder.png"
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          top: 38%;
          left: 63%;
          width: 65vw;
        "
      />
      <!-- <img
        src="./assets/border1.png"
        style="
          position: absolute;
          top: 50%;
          z-index: 3;
          left: 50%;
          transform: translate(-50%, -50%);
          top: 38%;
          left: 63%;
          width: 65vw;
        "
      />
      <img
        src="./assets/border2.png"
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          top: 38%;
          left: 63%;
          width: 65vw;
        "
      /> -->
      <div class="card-left">
        <img src="./assets/pic.jpg" alt="Couple Photo" class="couple-photo" />
      </div>
      <div class="card-right">
        <div class="contentwrap">
          <h1 class="heading">Alenka a Jakub</h1>
          <p class="invitation-text">
            Join us for the wedding<br />
            <b>Date:</b> July 20th, 2024<br />
            <b>Venue:</b> The Grand Venue<br />
            <b>Time:</b> 5:00 PM<br /><br />
            We can't wait to celebrate our big day with you! Please RSVP using the link below.<br /><br />
          </p>
          <a href="your-rsvp-link" class="rsvp-button">RSVP Here</a>
        </div>
      </div>
    </div>
  </header>
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
