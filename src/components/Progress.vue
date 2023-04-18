<template>
	<div class="progress"
		:style="xform"/>
</template>

<script>

export default {

	props: {
		idx: {
			type: Number,
			default: 0
		},
		
		max: {
			type: Number,
			default: 2
		}
	},

	computed: {
		progress() {
			return this.idx / this.max;
		},

		xform() {
			return `transform:scaleX(${this.progress})`;
		}
	}

};

</script>

<style lang="stylus">

@import "../stylus/_variables"

.progress
	background $w
	height 2px
	bottom 0
	left 0
	mix-blend-mode difference
	transform scaleX(0)
	transform-origin left
	transition transform 500ms $easeInOutCubic
	position fixed
	width 100%

	+above($tablet)
		height 3px

</style>
