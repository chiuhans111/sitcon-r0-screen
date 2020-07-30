<template>
  <div>
    <div class="session">
      <div class="session-top">
        <Topbar></Topbar>
      </div>
      <div class="session-middle">
        <div class="forum-left">
          <Slido :show="state.mode == 'SLIDO'"></Slido>
        </div>
        <div class="forum-right">
          <div class="forum-right_top"></div>
          <div class="forum-right_bottom">
            <div
              v-for="(speaker, i) in Speakers"
              :class="{
                forum_speaker: true,
                'forum_speaker-show': state.speaker == speaker,
              }"
              :key="'speaker-' + i"
              :style="{
                backgroundImage: `url(${speaker.img})`,
              }"
            ></div>
          </div>
        </div>
      </div>
      <div class="session-bottom">
        <Bottombar></Bottombar>
      </div>
    </div>
  </div>
</template>

<script>
import TGBOT from "../../scripts/TGBOT";

import Bottombar from "../sources/Bottombar";
import Topbar from "../sources/Topbar";
import Slido from "../sources/Slido";

import Speakers from "../../scripts/Scene/Speakers";

export default {
  props: {},
  components: {
    Bottombar,
    Topbar,
    Slido,
  },
  data() {
    return {
      state: TGBOT().controlBot.globalstate,
      Speakers,
    };
  },
};
</script>
