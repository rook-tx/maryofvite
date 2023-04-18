<template>
  <div
    ref="canary"
    class="snif"
  />
</template>

<script>

import { mapActions } from "pinia";
import { useDeviceStore } from "../../stores/device";

export default {

  data() {
    let device = {
      platform: navigator.platform,
      mobile: null,
      win: {
        x: window.innerWidth,
        y: window.innerHeight
      },
      portrait: window.innerWidth < window.innerHeight,
      keys: null,
      mouse: null,
      touch: null
    };

    switch (navigator.platform) {
    case 'iPhone':
    case 'iPad':
    case 'Linux armv7l':
    case 'Linux armv8l':
      device.touch = true;
      device.mobile = true;
      break;
    default:
      break;
    }

    return {
      device
    };
  },

  watch: {
    device: {
      immediate: true,
      deep: true,
      handler(device) {
        this.updateDevice(device)
      }
    }
  },

  created() {
    window.addEventListener('touchstart', this.touchstart, { passive: true });
    window.addEventListener('mousemove', this.mousestart, { passive: true });
    window.addEventListener('keydown', this.keystart, { passive: true });
    window.addEventListener('resize', this.resize, { passive: true });
  },

  mounted() {
    this.resize();
  },

  beforeDestroy() {
    window.removeEventListener('touchstart', this.touchstart, { passive: true });
    window.removeEventListener('mousemove', this.mousestart, { passive: true });
    window.removeEventListener('keydown', this.keystart, { passive: true });
    window.removeEventListener('resize', this.resize, { passive: true });
  },

  methods: {
    ...mapActions(useDeviceStore, [ 'updateDevice' ]),

    touchstart() {
      this.device.touch = true;
      window.removeEventListener('touchstart', this.touchstart, { passive: true });
    },

    keystart() {
      this.device.keys = true;
      window.removeEventListener('keydown', this.keystart, { passive: true });
    },

    mousestart() {
      this.device.mouse = true;
      window.removeEventListener('mousemove', this.mousestart, { passive: true });
    },

    resize() {
      this.device.win = {
        x: window.innerWidth,
        y: window.innerHeight
      };
      this.device.portrait = window.innerWidth < window.innerHeight;
      this.mobile();
    },

    mobile() {
      let style = window.getComputedStyle(this.$refs.canary);
      this.device.mobile = style.display === 'block';
    }
  }

};

</script>

<style lang="stylus">

@import '../../stylus/_variables'

.snif {
  display none
  pointer-events none
  position absolute

  +below($tablet) {
    display block
  }
}

</style>
