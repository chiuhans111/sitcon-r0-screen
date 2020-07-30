<template>
  <div id="app">
    <Session v-if="state.layout == Layouts.Session"></Session>
    <Forum v-if="state.layout == Layouts.Forum"></Forum>
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
