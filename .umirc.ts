import { defineConfig } from "umi";



export default defineConfig({
  routes: [
    { path: '/', component: '@/pages/recommend/Recommend' },
    { path: '/recommend', component: '@/pages/recommend/Recommend' },
    { path: '/singer', component: '@/pages/singer/Singer' },
    { path: '/top-list', component: '@/pages/top-list/Toplist' },
    { path: '/search', component: '@/pages/search/Search' },
  ],
  sassLoader:{
    additionalData: `@import "~@/assets/styles/variable.scss";`
  },
  define: { // 重点就是这个属性了，设置全局变量
 	 // 在项目中，可以通过process.env.NODE_ENV 或者
 	 // process.env.UMI_ENV 或者process.env.date得到对应环境的值
    'process.env': {
      NODE_ENV: 'dev',
      UMI_ENV: 'dev',
      date: '2022-08-01',
    },
  },
  npmClient: 'pnpm',
  proxy: {
    '/api': {
      'target': 'http://localhost:3000',
    },
  },
});
