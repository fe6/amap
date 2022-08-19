/** @format */

import DefaultTheme from 'vitepress/theme';
import './custom.css';

export default {
  ...DefaultTheme,
  // this is a Vue 3 functional component
  NotFound: () => 'custom 404',

  // enhanceApp() {
  //   // https://vitepress.vuejs.org/config/app-configs#appearance
  //   localStorage['vitepress-theme-appearance'] = 'dark';
  // },
};
