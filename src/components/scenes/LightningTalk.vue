<template>
  <div class="session lightningtalk">
    <div class="overlay">
      <Timeup :show="state.mode == 'TIMEUP'"></Timeup>
    </div>
    <div class="session-top">
      <Topbar></Topbar>
    </div>
    <div class="session-middle">
      <div class="session-left">
        <LightningTalkSTBY :show="state.mode == 'STBY'"></LightningTalkSTBY>
      </div>
      <div class="session-right">
        <div class="session-right_top">
          <Camholder></Camholder>
        </div>
        <div class="session-right_bottom">
          <IRC :show="state.mode == 'PPT' || state.mode == 'STBY'"></IRC>
        </div>
      </div>
    </div>
    <div class="session-bottom">
      <Bottombar></Bottombar>
    </div>
  </div>
</template>

<script>
// "STBY",  "PPT", "TIMEUP"
import TGBOT from "../../scripts/TGBOT";

import Bottombar from "../sources/Bottombar";
import Topbar from "../sources/Topbar";
import IRC from "../sources/IRC";
import LightningTalkSTBY from "../sources/LightningTalkSTBY";
import Timeup from "../sources/Timeup";
import Camholder from "../sources/Camholder";
// import Slido from "../sources/Slido";

export default {
  props: {},
  components: {
    Bottombar,
    Topbar,
    IRC,
    Timeup,
    // Slido,
    LightningTalkSTBY,
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
