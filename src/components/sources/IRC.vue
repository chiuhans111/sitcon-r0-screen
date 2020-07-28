<template>
  <div>
    IRC
    {{ircBot.messages}}
  </div>
</template>
<script>
import Bots from '../../scripts/TGBOT'

export default {
  data() {
    return {
      ircBot: Bots.ircBot
    };
  },
};
</script>
