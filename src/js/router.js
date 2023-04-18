import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  
  history: createWebHistory(),
  
  routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../components/Home.vue')
		},
		{
			path: '/agencies/:idx?',
			name: 'agencies',
			props: true,
			component: () => import('../components/Home.vue')
		},
		{
			path: '/agents/:idx?',
			name: 'agents',
			props: true,
			component: () => import('../components/Home.vue')
		}
  ]

})
