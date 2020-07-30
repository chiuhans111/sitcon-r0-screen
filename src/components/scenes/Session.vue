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
        <div class="session-right_top"></div>
        <div class="session-right_bottom">
          <Slido :show="state.mode == 'PPT+SLIDO'"></Slido>
          <IRC
            :show="state.mode == 'PPT+IRC' || state.mode == 'SLIDO+IRC'"
          ></IRC>
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


export default {
  props: {},
  components: {
    Bottombar,
    Topbar,
    IRC,
    Slido,
  },
  data() {
    return {
      state: TGBOT().controlBot.globalstate,
    };
  },
  computed: {},
};
</script>
