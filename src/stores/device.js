import { defineStore } from "pinia"

export const useDeviceStore = defineStore('device', {

  state: () => ({
    device: {
      platform: 'MacIntel',
      mobile: null,
      win: {
        x: window.innerWidth,
        y: window.innerHeight
      },
      portrait: window.innerWidth < window.innerHeight,
      keys: null,
      mouse: null,
      touch: null
    }
  }),

  getters: {
    win: (state) => state.device.win,
    winWidth: (state) => state.device.win.x,
    winHeight: (state) => state.device.win.y,

    canTouch: (state) => state.device.touch,
    canMouse: (state) => state.device.mouse,

    mobile() { return this.winWidth < 768 },
    nano() { return this.winWidth < 450 }
  },

  actions: {
    updateDevice(device) {
      this.device = device;
    }
  }

})
