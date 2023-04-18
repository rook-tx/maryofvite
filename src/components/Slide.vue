<template>
	<div class="section">

		<div v-if="slide.heading"
			class="header">
			<h1 v-if="$route.name === 'home'"
				v-html="slide.heading"/>

			<router-link v-if="$route.name !== 'home'"
				to="/"
				v-html="'Mary Wilkinson'"
				class="home-link"/>
				
			<h2 v-if="$route.name !== 'home'"
				v-html="slide.heading"/>
		</div>

		<transition appear
			:name="dir"
			mode="in-out"
			duration="800">
			<div v-if="slide.body && Array.isArray(slide.body)"
				:key="idx"
				class="body">
				<div v-if="idx < slide.body.length" v-html="slide.body[idx]" :key="idx"/>
				<div v-else v-html="slide.footer" :key="idx"/>
			</div>

			<div v-else-if="slide.body"
				:key="idx"
				class="body">
				<div v-html="slide.body"/>
				<p><router-link to="/agencies/">What I do</router-link> •
					<router-link to="/agents/">What I think</router-link></p>
			</div>
		</transition>

	</div>
</template>

<script>

export default {
	props: {
		slide: {
			type: Object,
			required: true,
			default: () => {}
		},
		dir: {
			type: String,
			required: true
		},
		idx: {
			type: Number,
			required: true,
			default: 0
		}
	}
};
</script>

<style lang="stylus">

@import "../stylus/_variables"

.section
	abs()
	position fixed
	overflow hidden

	section
		height 100%

.home-link
	border 0
	fs(mp(-5))
	font-family $value-serif
	left $gut*1rem
	letter-spacing .1em
	position absolute
	top $let*.125rem
	text-transform uppercase

	+above($tablet)
		left $gut*2rem

</style>
