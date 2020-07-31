<template>
  <div
    :class="{
      'lightningtalk-timeup': true,
      'lightningtalk-timeup-show': show,
    }"
  >
    <div class="loop" v-for="(text, i) in texts" :key="'text-' + i">
      <div class="loop-content">{{ text }}</div>
      <div class="loop-content">{{ text }}</div>
      <div class="loop-content">{{ text }}</div>
    </div>
    <img src="/img/timeup.png" class="lightningtalk-timeup_img" alt />
  </div>
</template>

<script>
import TGBOT from "../../scripts/TGBOT";

export default {
  props: ["show"],
  data() {
    return {};
  },
  computed: {
    texts() {
      let texts = [
        "時間到了！408 Request Timeout！",
        "ERROR ERROR ERROR ERROR ERROR",
        "Lightning Talk service timeout",
        "00:00:00 00:00:00 00:00:00 00:00:00",
        "應用程式已經停止回應 :( 請關閉應用程式。",
      ];

      let s = "";
      TGBOT()
        .ircBot.globalstate.messages.filter((x) => x.text != null)
        .map((x) => {
          s += x.text + " ";
          if (s.length > 30) {
            texts.shift();
            texts.push(s);
            s = "";
          }
        });
      if (s.length > 0) {
        while (s.length < 30) {
          s += "Timeout！";
        }
        texts.shift();
        texts.push(s);
      }

      let otherLines = [
        "The speaker didn't complete the talk in time",
        "連接超時，請檢查網路連線。連接超時，請檢查網路連線。。",
        "The connection has timed out.",
        "ERROR ERROR ERROR ERROR ERROR",
        "時間到了！408 Request Timeout！",
      ];

      let finalTexts = [];
      for (let i = 0; i < 5; i++) {
        finalTexts.push(otherLines[i]);
        finalTexts.push(texts[i]);
      }
      return finalTexts;
    },
  },
};
</script>
