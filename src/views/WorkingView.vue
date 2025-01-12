<script setup>
var userLang = navigator.language || navigator.userLanguage

var soon = {
  en: 'Coming very soon',
  sk: 'Už za okamih...',
  cs: 'Již za okamih...'
}
</script>

<template>
 <div class="texts">
     <img style="height: 7vh; margin-bottom: 20px;" src="../assets/wip.png">
      <div >{{ soon[userLang] ?? 'Coming very soon...' }}</div>
 </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.texts {
  font-size: 2rem;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
