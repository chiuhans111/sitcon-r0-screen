<template>
  <div id="app">
    <Session v-if="state.layout == Layouts.Session"></Session>
    <Forum v-if="state.layout == Layouts.Forum"></Forum>

    <h3>layout</h3>
    <p>{{ Bots.controlBot.globalstate.layout }}</p>
    <h3>mode</h3>
    <p>{{ Bots.controlBot.globalstate.mode }}</p>
    <h3>auto session</h3>
    <p>{{ Bots.controlBot.globalstate.auto }}</p>
    <h3>speaker</h3>
    <p>{{ Bots.controlBot.globalstate.speaker }}</p>
    <h3>session</h3>
    <p v-if="Bots.controlBot.globalstate.session">
      {{ Bots.controlBot.globalstate.session.title }}
    </p>
  </div>
</template>

<script>
import TGBOT from "./scripts/TGBOT";
import Session from "./components/scenes/Session";
import Forum from "./components/scenes/Forum";

import Layouts from "./scripts/Scene/Layouts";

export default {
  name: "App",
  components: {
    Session,
    Forum,
  },
  data() {
    return {
      Bots: TGBOT(),
      state: TGBOT().controlBot.globalstate,
      Layouts,
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
