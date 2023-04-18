<template>
	<div/>
</template>

<script>

import WheelSwipe from 'wheel-swipe';

import { mapState } from 'pinia';
import { useDeviceStore } from '../stores/device';

export default {

	props: [ 'current', 'max' ],

	watch: {
		device: {
			handler(device) {
				this.deviceUpdate(device);
			},
			immediate: true,
			deep: true
		}
	},

	computed: {
		...mapState(useDeviceStore, [
			'device',
		])
	},

	methods: {
		deviceUpdate(device) {
			switch (device.touch) {
				case true:
					this.addTouch();
					break;
				default:
					this.removeTouch();
					break;
			}
			switch (device.mouse) {
				case true:
					this.addMouse();
					break;
				default:
					this.removeMouse();
					break;
			}
		},

		debounce() {
			var now = performance.now();
			let elapsed = now - this.lastMouseEvent;

			if (elapsed > 400) {
				this.lastMouseEvent = now;
				return false;
			}
			return true;
		},

		wheelup() {
			if (this.debounce()) { return; }
			this.$emit('up');
		},

		wheeldown() {
			if (this.debounce()) { return; }
			this.$emit('down');
		},

		wheelleft() {
			if (this.debounce()) { return; }
			this.$emit('left');
		},

		wheelright() {
			if (this.debounce()) { return; }
			this.$emit('right');
		},

		addTouch() {
			this.removeMouse();

			document.getElementById('app').addEventListener('touchstart', this.touchstart, { passive: true });
			document.getElementById('app').addEventListener('touchmove', this.touchmove);
			document.getElementById('app').addEventListener('touchend', this.touchend, { passive: true });
		},

		touchstart(event) {

			if (this.isDrag) {
				event.preventDefault();
				this.isDrag = false;
			}

			this.startX = event.changedTouches[0].pageX;
			this.startY = event.changedTouches[0].pageY;

		},

		touchmove() {

			// let nextY = event.changedTouches[0].pageY;

			// if (Math.abs(nextY - this.startY) > 0) {
			// 	event.preventDefault();
			// }

			this.isDrag = true;

		},

		touchend(event) {

			this.isDrag = false;

			let endX = event.changedTouches[0].pageX,
				isXSwiped = Math.abs(endX - this.startX) > this.distanceThreshold,
				endY = event.changedTouches[0].pageY,
				isYSwiped = Math.abs(endY - this.startY) > this.distanceThreshold;

			if (isYSwiped) {
				if (this.startY > endY) {
					this.wheeldown();
				}
				if (endY > this.startY) {
					this.wheelup();
				}
			}

			if (isXSwiped) {
				if (this.startX > endX) {
					this.wheelright();
				}
				if (endX > this.startX) {
					this.wheelleft();
				}
			}
		},

		removeTouch() {
			document.getElementById('app')
				.removeEventListener('touchstart', this.touchstart, { passive: true });
			document.getElementById('app')
				.removeEventListener('touchmove', this.touchmove);
			document.getElementById('app')
				.removeEventListener('touchend', this.touchend, { passive: true });
		},

		addMouse() {
			// this.removeTouch();

			if (!this.swipe) {
				this.swipe = new WheelSwipe({ cancelScroll: false });
			}

			window.addEventListener('wheelup', this.wheeldown, { passive: true });
			window.addEventListener('wheeldown', this.wheelup, { passive: true });
		},

		removeMouse() {
			if (this.swipe) {
				window.removeEventListener('wheelup', this.wheeldown, { passive: true });
				window.removeEventListener('wheeldown', this.wheelup, { passive: true });
			}
		},

		keyup(e) {
			switch (e.which) {
				case 37:
					this.wheelleft();
					break;
				case 38:
					this.wheelup();
					break;
				case 39:
					this.wheelright();
					break;
				case 40:
					this.wheeldown();
					break;

				default:
					break;
			}
		}
	},

	data() {
		return {
			lastMouseEvent: 0,
			isDrag: false,
			distanceThreshold: 20
		};
	},

	created() {
		window.addEventListener('keyup', this.keyup, { passive: true });
	},

	beforeDestroy() {
		window.removeEventListener('keyup', this.keyup, { passive: true });
		this.removeTouch();
		this.removeMouse();
	}

};

</script>