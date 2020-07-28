<template>
  <div id="app">
    <Session :ircMessages="Bots.ircBot.messages"></Session>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
