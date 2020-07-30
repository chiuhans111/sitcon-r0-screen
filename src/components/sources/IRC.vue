<template>
  <div class="irc">
    <div
      :class="{
        irc_content: true,
        'irc_content-show': show,
        'irc_content-hide': !show,
      }"
    >
      IRC
      {{ ircBot.messages }}
    </div>
  </div>
</template>
<script>
import TGBOT from "../../scripts/TGBOT";

export default {
  props: ["show"],
  data() {
    return {
      ircBot: TGBOT().ircBot,
    };
  },
};
</script>
