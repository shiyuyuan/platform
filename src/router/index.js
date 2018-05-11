import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import homepage from '@/components/main/home'
import mainCom from '@/components/main/main'
import menuCofig from '@/components/userConfig/menuConfig';
import usermanage from '@/components/userConfig/userManage';
import noticeMn from '@/components/userConfig/noticeMn';
import editPrice from '@/components/userConfig/editPrice';
import reCharge from '@/components/userConfig/autoreCharge';
import userCharge from '@/components/userConfig/userCharge';
import rechargeRecord from '@/components/userConfig/rechargeRecord'
import consumeRecord from '@/components/userConfig/consumeRecord'
import menuConfig from '@/components/userConfig/menuConfig'

import menuAllOrder from '@/components/orderList/menuAllOrder';
import weibojf from '@/components/orderList/weibojf';
import weibodz from '@/components/orderList/weibodz';
Vue.use(Router)
for (var i = 0; i < 1; i++) {

}
export default new Router({
  linkActiveClass: 'active',
  canReuse: false,
  mode:'history',
  routes: [
     {
      path: '/',
      name: 'login',
      component: login
     },
     {
      path: '/mainCom',
      name: 'mainCom',
      component: mainCom,
      children: [{
          path: '/homepage',
          name: 'homepage',
          component: homepage,
        },
        {
          path: '/menuAllOrder',
          name: 'menuAllOrder',
          component: menuAllOrder,
           children:[
              {
                path: '/weibojf',
                name: 'weibojf',
                component: weibojf
              },
                     {
                path: '/weibodz',
                name: 'weibodz',
                component: weibodz
              },
          ]
        },
        {
          path: '/noticeMn',
          name: 'noticeMn',
          component: noticeMn
        },
        {
          path: '/menuConfig',
          name: 'menuConfig',
          component: menuConfig
        },  
        {
          path: '/editPrice',
          name: 'editPrice',
          component: editPrice
        },
        {
          path: '/reCharge',
          name: 'reCharge',
          component: reCharge
        },  
        {
          path: '/userCharge',
          name: 'userCharge',
          component: userCharge
        },                 
        {
          path: '/menuCofig',
          name: 'menuCofig',
          component: menuCofig
        },
        {
          path: '/usermanage',
          name: 'usermanage',
          component: usermanage
        },
        {
                path:'/rechargeRecord',
                name:'rechargeRecord',
                component:rechargeRecord
            },{
                path:'/consumeRecord',
                name:'consumeRecord',
                component:consumeRecord
            },
      ]
    },

  ]
})
