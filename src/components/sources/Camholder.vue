<template>
  <div class="camholder">
    <div :class="{
        show:state.mode == 'PPT+IRC' || state.mode == 'SLIDO+IRC'
    }">
      <p class="camholder-text">Join TG chat</p>
      <p class="camholder-text">@SITCON2020-R0</p>
    </div>

    <div :class="{
        show: state.mode ==  'PPT+SLIDO'
    }">
      <p class="camholder-text">Join at slido.com</p>
      <p class="camholder-text">#{{slidocode}}</p>
    </div>
  </div>
</template>

<script>
import TGBOT from "../../scripts/TGBOT";

export default {
  props: {},
  components: {},
  data() {
    return {
      state: TGBOT().controlBot.globalstate,
    };
  },
  computed: {
    slidocode() {
      if (this.state.session) {
        return this.state.session.code;
      }
      return "";
    },
  },
};
</script>
