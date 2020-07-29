<template>
  <div id="app">
    <Session></Session>

    <h3>layout</h3>
    <p>{{ Bots.controlBot.globalstate.layout }}</p>
    <h3>mode</h3>
    <p>{{ Bots.controlBot.globalstate.mode }}</p>
    <h3>auto session</h3>
    <p>{{ Bots.controlBot.globalstate.auto }}</p>
    <h3>speaker</h3>
    <p>{{ Bots.controlBot.globalstate.speaker }}</p>
    <h3>session</h3>
    <p v-if="Bots.controlBot.globalstate.session">{{ Bots.controlBot.globalstate.session.title }}</p>
  </div>
</template>

<script>
import TGBOT from "./scripts/TGBOT";
import Session from "./components/scenes/Session";

export default {
  name: "App",
  components: {
    Session,
  },
  data() {
    return {
      Bots: TGBOT(),
    };
  },
  beforeDestroy() {
    this.Bots.destroy();
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
