<template>
  <div class="irc">
    <div
      :class="{
        irc_content: true,
        'irc_content-show': show,
        'irc_content-hide': !show,
      }"
      ref="content"
    >
      <template v-for="(msg, i) in state.messages">
        <div class="irc_message-time" v-if="msg.t" :key="'msg-time' + i">
          {{ msg.t }}
        </div>

        <div class="irc_message" :key="'msg-' + i" v-if="msg.text">
          <div class="irc_message-username ">
            {{ msg.from.first_name }}
            {{ msg.from.last_name }}
            :
          </div>
          <div class="irc_message-text">
            {{ msg.text }}
          </div>

          <!-- <div
            v-if="msg.sticker"
            class="irc_message-sticker"
            :style="{
              backgroundImage: `url(${getFileUrl(msg.sticker.thumb.file_id)})`,
            }"
          ></div> -->

          <!-- <div
            v-if="msg.photo"
            class="irc_message-sticker"
            :style="{
              backgroundImage: `url(${getFileUrl(msg.photo[0].file_id)})`,
            }"
          ></div> -->

          <!-- {{ msg }} -->
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import TGBOT from "../../scripts/TGBOT";

export default {
  props: ["show"],
  data() {
    return {
      state: TGBOT().ircBot.globalstate,
      file_paths: {},
    };
  },
  methods: {
    getFileUrl(file_id) {
      if (this.file_paths[file_id] == undefined) {
        let me = this;
        this.file_paths[file_id] = "";
        let ircBot = TGBOT().ircBot;
        ircBot
          .request("getFile", {
            file_id,
          })
          .then((response) => {
            me.file_paths[file_id] =
              "https://api.telegram.org/file/bot" +
              ircBot.token +
              "/" +
              response.result.file_path;
            me.$forceUpdate();
          });
      }

      return this.file_paths[file_id];
    },
  },
  updated() {
    this.$refs.content.scrollTop = this.$refs.content.scrollHeight;
  },
};
</script>
