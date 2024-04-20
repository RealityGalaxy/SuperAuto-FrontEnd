import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'
import ProfilePage from '../main/ProfilePage'
import BalancePage from '../main/BalancePage'
import NewCarPage from '../main/NewCarPage'
import CarPage from '../main/CarPage'
import ForumPage from '../main/ForumPage'
import NewPostPage from '../main/NewPostPage'
import PostPage from '../main/PostPage'
import NewEntryPage from '../main/NewEntryPage'
import EntryPage from '../main/EntryPage'
import NewRequestPage from '../main/NewRequestPage'
import RequestPage from '../main/RequestPage'
import NewTicketPage from '../main/NewTicketPage'
import TicketPage from '../main/TicketPage'
import StatsPage from '../main/StatsPage'
import SearchPage from '../main/SearchPage'
import RegisterPage from '../register/RegisterPage'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/profile', component: ProfilePage },
    { path: '/profile/balance', component: BalancePage },
    { path: '/profile/stats', component: StatsPage },
    { path: '/search', component: SearchPage },
    { path: '/profile/newcar', component: NewCarPage },
    {
      path: '/car/:id',
      name: 'Car',
      component: CarPage
    },
    {
      path: '/car/edit/:id',
      name: 'Edit Car',
      component: NewCarPage
    },
    { path: '/newentry', component: NewEntryPage },
    {
      path: '/entry/:type/:id',
      name: 'Ad Entry',
      component: EntryPage
    },
    {
      path: '/entry/:type/edit/:id',
      name: 'Ad Entry Edit',
      component: NewEntryPage
    },
    { path: '/forum', component: ForumPage },
    { path: '/forum/newpost', component: NewPostPage },
    {
      path: '/forum/post/:id',
      name: 'Post',
      component: PostPage
    },
    {
      path: '/forum/post/edit/:id',
      name: 'Edit Post',
      component: NewPostPage
    },
    {
      path: '/request/:mode/:id',
      name: 'New Request',
      component: NewRequestPage
    },
    {
      path: '/profile/request/:id',
      name: 'Request',
      component: RequestPage
    },
    { path: '/help/new', component: NewTicketPage },
    {
      path: '/help/ticket/:id',
      name: 'Help Ticket',
      component: TicketPage
    },
    { path: '/register', component: RegisterPage },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})