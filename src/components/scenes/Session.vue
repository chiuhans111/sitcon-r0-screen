<template>
  <div class="session">
    <div class="session-top">
      <Topbar></Topbar>
    </div>
    <div class="session-middle">
      <div class="session-left">
        <Slido :show="state.mode == 'SLIDO+IRC'"></Slido>
      </div>
      <div class="session-right">
        <div class="session-right_top">
          <Camholder></Camholder>
        </div>
        <div class="session-right_bottom">
          <Slido :show="state.mode == 'PPT+SLIDO'"></Slido>
          <IRC :show="state.mode == 'PPT+IRC' || state.mode == 'SLIDO+IRC'"></IRC>
        </div>
      </div>
    </div>
    <div class="session-bottom">
      <Bottombar></Bottombar>
    </div>
  </div>
</template>

<script>
import TGBOT from "../../scripts/TGBOT";

import Bottombar from "../sources/Bottombar";
import Topbar from "../sources/Topbar";
import IRC from "../sources/IRC";
import Slido from "../sources/Slido";
import Camholder from "../sources/Camholder";

export default {
  props: {},
  components: {
    Bottombar,
    Topbar,
    IRC,
    Slido,
    Camholder,
  },
  data() {
    return {
      state: TGBOT().controlBot.globalstate,
    };
  },
  computed: {},
};
</script>
