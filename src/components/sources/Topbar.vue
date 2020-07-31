<template>
  <div class="topbar">
    <div class="topbar-title">
      <div class="topbar-title_time">{{time}}</div>
      <template v-if="state.session">
        <div class="topbar-title_title">{{state.session.title}}</div>
        <div class="topbar-title_speakers">
          <span
            class="topbar-title_speakers-speaker"
            v-for="(speaker, i) in state.session.speakers"
            :key="'speaker'+i"
          >{{speaker.name}}</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import TGBOT from "../../scripts/TGBOT";
import time from "../../scripts/Time/time";
import timeFormat from "../../scripts/Format/time";

export default {
  name: "App",
  components: {},
  data() {
    return {
      state: TGBOT().controlBot.globalstate,
      time: "00:00",
      timeInterval: null,
    };
  },
  mounted() {
    let me = this;
    this.timeInterval = setInterval(function () {
      me.time = timeFormat.hhmm(time());
    }, 1000);
  },
  beforeDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  },
};
</script>
