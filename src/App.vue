<template>
  <div id="app">
    <h3>layout</h3>
    <p>
      {{ Bots.controlBot.globalstate.layout }}
    </p>
    <h3>mode</h3>
    <p>
      {{ Bots.controlBot.globalstate.mode }}
    </p>
    <h3>auto session</h3>
    <p>
      {{ Bots.controlBot.globalstate.auto }}
    </p>
    <h3>speaker</h3>
    <p>
      {{ Bots.controlBot.globalstate.speaker }}
    </p>
    <h3>session</h3>
    <p>
      {{ Bots.controlBot.globalstate.session }}
    </p>
  </div>
</template>

<script>
import TGBOT from "./scripts/TGBOT";


export default {
  name: "App",
  components: {
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
