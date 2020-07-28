<template>
  <div>
    IRC
    {{ircBot.messages}}
  </div>
</template>
<script>
import TGBOT from '../../scripts/TGBOT'

export default {
  data() {
    return {
      ircBot: TGBOT()
    };
  },
};
</script>
