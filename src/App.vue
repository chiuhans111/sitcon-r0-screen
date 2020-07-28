<template>
  <div id="app">
    <Session :ircMessages="ircBot.messages"></Session>
  </div>
</template>

<script>
import Bots from "./scripts/TGBOT";

import Session from "./components/scenes/Session";

export default {
  name: "App",
  components: {
    Session,
  },
  data() {
    return {
      ircBot: Bots.ircBot,
    };
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
