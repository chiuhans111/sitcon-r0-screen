<template>
  <div :class="{
        'lightningtalk-timeup': true,
    'lightningtalk-timeup-show': show
    }">
    <div class="loop" v-for="(text,i) in texts" :key="'text-'+i">
      <div class="loop-content">{{text}}</div>
      <div class="loop-content">{{text}}</div>
      <div class="loop-content">{{text}}</div>
    </div>
    <img src="/img/timeup.png" class="lightningtalk-timeup_img" alt />
  </div>
</template>

<script>
export default {
  props: ["show"],
  data() {
    return {
      texts: [
        "時間到了！408 Request Timeout！",
        "時間到了！408 Request Timeout！",
        "時間到了！408 Request Timeout！",
        "時間到了！408 Request Timeout！",
        "時間到了！408 Request Timeout！",
        "時間到了！408 Request Timeout！",
        "時間到了！408 Request Timeout！",
        "時間到了！408 Request Timeout！",
        "時間到了！408 Request Timeout！",
        "時間到了！408 Request Timeout！",
      ],
    };
  },
};
</script>