<template>
  <div class="camholder">
    <div
      :class="{
        show:state.mode == 'PPT+IRC' || state.mode == 'SLIDO+IRC'|| state.mode == 'STBY'|| state.mode == 'PPT'
    }"
    >
      <p class="camholder-text">Join TG chat</p>
      <p class="camholder-text">@SITCONgeneral</p>
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
