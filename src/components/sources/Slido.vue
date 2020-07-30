<template>
  <div class="slido">
    <div
      :class="{
        slido_content: true,
        'slido_content-show': show,
        'slido_content-hide': !show,
      }"
    >
      <iframe :src="slidourl" frameborder="0" class="slido_iframe"></iframe>
      {{ slidourl }}
      {{ slidocode }}
    </div>
  </div>
</template>
<script>
import TGBOT from "../../scripts/TGBOT";

export default {
  props: ["show"],
  data() {
    return {
      state: TGBOT().controlBot.globalstate,
    };
  },
  computed: {
    slidourl() {
      if (this.state.session) {
        if (this.state.session.qa) {
          return "https://wall.sli.do/event/" + this.state.session.hash;
        }
      }
      return "";
    },
    slidocode() {
      if (this.state.session) {
        return this.state.session.code;
      }
      return "";
    },
  },
};
</script>
