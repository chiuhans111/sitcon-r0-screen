<template>
  <div class="session">
    <div class="session-top">
      <Topbar></Topbar>
    </div>
    <div class="session-middle">
      <div class="session-left"></div>
      <div class="session-right">
        <div class="session-right_top"></div>
        <div class="session-right_bottom">
          <IRC></IRC>
        </div>
      </div>
    </div>
    <div class="session-bottom">
      <Bottombar></Bottombar>
    </div>
  </div>
</template>

<script>
import Bottombar from "../sources/Bottombar";
import Topbar from "../sources/Topbar";
import IRC from "../sources/IRC";

export default {
  props: {},
  components: {
    Bottombar,
    Topbar,
    IRC,
  },
  data() {
    return {};
  },
};
</script>