<template>
  <div>
    <Topbar></Topbar>
    <Bottombar></Bottombar>
    <IRC></IRC>
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
