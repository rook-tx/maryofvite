<template>
	<div class="home">
		<main>

			<transition appear
				:name="dir"
				mode="in-out">

				<slide v-if="slides && Array.isArray(slides[$route.name].body)"
					:key="$route.name"
					:idx="slidx"
					:dir="dir"
					:slide="slides[$route.name]"
					:class="{ even: forceEven }"/>

				<slide v-else-if="slides"
					:key="slidx"
					:idx="slidx"
					:dir="dir"
					:slide="slides[$route.name]"
					:class="{ even: slidx % 2 }"/>

			</transition>

			<slide-progress
				:idx="slidx"
				:max="maxIdx"/>

			<div class="linx">
				
				<a href="mailto:maryofone@gmail.com"
					target="_blank" rel="noopener"
					title="Email Mary at maryofone@gmail.com">
					<email/>
				</a>
				
				<a href="https://www.linkedin.com/mwlite/in/mary-wilkinson-28a85156"
					target="_blank" rel="noopener"
					title="Find Mary on LinkedIn">
					<linked-in/>
				</a>

			</div>

			<scroll-swipe
				@up="prev"
				@right="next"
				@down="next"
				@left="prev"/>

			<div class="scroll-guide"
				@click="next"/>

		</main>	
	</div>
</template>

<script>

import slides from '../data/slides.json';
import Slide from './Slide.vue';
import Progress from './Progress.vue';
import ScrollSwipe from './ScrollSwipe.vue';
import Email from './svg/Email.vue';
import Instagram from './svg/Instagram.vue';
import LinkedIn from './svg/LinkedIn.vue';

export default {

	metaInfo() {
		return {
			title: this.pageTitle,
			meta: [
				{ property: 'og:title', content: this.pageTitle },
				{ property: 'twitter:title', content: this.pageTitle }
			]
		};
	},

	props: {
		idx: {
			required: false
		}
	},

	watch: {
		$route: {
			handler(from, to) {
				if (from && from.name !== to.name) {
					this.slidx = 0;
					this.forceEven = !this.forceEven;
				}
			}
		}
	},

	components: {
    Email,
    Instagram,
    Slide,
    SlideProgress: Progress,
    ScrollSwipe,
    LinkedIn
	},

	computed: {
		maxIdx() {
			return Array.isArray(this.slides[this.$route.name].body) ?
				this.slides[this.$route.name].body.length : Number(0);
		},

		pageTitle() {
			return this.$route.name.charAt(0).toUpperCase() + this.$route.name.slice(1);
		}
	},

	methods: {
		next() {
			if (this.slidx >= this.maxIdx) {
				this.dir = 'next';
				this.nextSection();
				return;
			}
			this.dir = 'next';
			this.$nextTick(() => {
				this.slidx++;
				this.$router.push({
					params: {
						idx: String(this.slidx)
					}
				});
			});
		},

		nextSection() {
			if (this.$route.name === 'home') {
				this.$router.push('/agencies/');
			} else if (this.$route.name === 'agencies') {
				this.$router.push('/agents/');
			} else if (this.$route.name === 'agents') {
				this.$router.push('/agencies/');
			}
		},

		prev() {
			if (this.slidx <= 0) {
				this.prevSection();
				return;
			}
			this.dir = 'prev';
			this.$nextTick(() => {
				this.slidx--;
				this.$router.push({
					params: {
						idx: String(this.slidx)
					}
				});
			});
		},

		prevSection() {
			if (this.$route.name === 'home') {
				return;
			} else if (this.$route.name === 'agencies' || this.$route.name === 'agents') {
				this.dir = 'prev';
				this.$router.push('/');
			}
		}
	},

	data() {
		return {
			slides,
			slidx: Number(this.idx) || 0,
			forceEven: false,
			dir: 'next'
		};
	}
};

</script>

<style lang="stylus">

@import "../stylus/_variables"

.home
	height 100%

	main
		height 100%

.linx
	font-size 0
	mix-blend-mode difference
	mgn(0,.5)
	position fixed
	right 0
	top 0
	text-align right

	a
		border none
		display inline-block
		fs(mp(-2))
		line-height $let*1rem
		mgn(.75,.5)

		+above($tablet)
			mgn(1,.5)

	svg
		fill $w
		display block
		height 1em
		margin ($let - 1)*.5rem 0
		overflow visible
		width 1em

.scroll-guide
	animation scroll $let*1s infinite 
	background $w
	bottom $let*1rem
	height 3px
	position fixed
	transform translate3d(0,0rem,0)
	mix-blend-mode difference
	width 3px

	+above($tablet)
		height 4px
		right $gut*1rem
		width 4px

	+below($tablet)
		left $gut*1rem

@keyframes scroll
	0%
		transform translate3d(0,0rem,0)
	50%
		transform translate3d(0,-($gut)*.5rem,0)
	100%
		transform translate3d(0,0rem,0)

</style>
