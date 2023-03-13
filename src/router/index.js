import { createRouter, createWebHistory } from 'vue-router'
import SeasonView from '../views/SeasonView.vue'
import AnimeInfoView from '../views/AnimeInfoView.vue'
import ConfigView from '../views/ConfigView.vue'
import CalendarView from '../views/CalendarView.vue'
import HomeView from '../views/HomeView.vue'
import MyListView from '../views/MyListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/season',
      name: 'season',
      component: SeasonView
    },
    {
      path: '/mylist',
      name: 'mylist',
      component: MyListView
    },
    {
      path: '/config',
      name: 'config',
      component: ConfigView
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView
    },
    {
      path: '/anime/:id',
      name: 'anime',
      component: AnimeInfoView, 
      props: true
    }
  ]
})

export default router
