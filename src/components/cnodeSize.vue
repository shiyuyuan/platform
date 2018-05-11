<template>
  <div id="side">
    <aside class="main-sidebar">
      <!-- {{msg}} -->
      <el-aside style="background-color: rgb(238, 241, 246);float: left;width:200px;padding: 20px 0;">
        <div class="nav-item" :class='{active: index == nowIndex}' v-for='(tabItem,index) in menuList' @click='tabToggle(index)'>
          <span :class='{dropdownBtn: true}' @click='dropdown(index)'><i class="el-icon-menu"></i><span>{{tabItem.name}}</span>
             <i :class='{"el-icon-arrow-down":tabItem.activedrop,"el-icon-arrow-up":!tabItem.activedrop}'></i>
          </span>
          <ul  class="dropdownWrapper" v-show='tabItem.activedrop'>
            <li v-for='(item, index) in tabItem.children'  @click='tabLiToggle($event,index)'>
                  <router-link :to="item.path">{{item.name}}
                  </router-link>
            </li>
          </ul>
        </div>
      </el-aside>
    </aside>
  </div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex'
import {mapMutations} from 'vuex'
export default ({
  data() {
    return {
      menuList: [{
          name: "订单管理",
          activedrop:true,
          children: [{
              name: "第一个订单",
              path: "/allOrder"
            },
            {
              name: "第二个订单",
              path: "/menuCofig"
            },
            {
              name: "第san个订单",
              path: "/menuCofig"
            }
          ]
        },
        {
          name: "用户管理",
          activedrop:false,
          children: [{
              name: "第一个用户",
              path: "/allOrder"
            },
            {
              name: "第二个用户",
              path: "/menuCofig"
            }
          ]
        }
      ],
      nowIndex: 0,
      dropdownActive: false,
      tabParams: ['政治', '娱乐', '体育', '搞笑'],
      dropParams: ['亚洲', '北美洲', '欧洲', '非洲']
    };
  },
  computed: {
    ...mapState({
      testMsg: state => state.testMsg,
    }),
    msg(){
        return this.$store.state.testMsg;
     }
  },
  mounted(){
    console.log(this.$store.state)
    console.log(this.testMsg)
/*    this.$router.options.routes[0].children.push({
        name:"weibo",
        path:"/weibo"
      })*/
    console.log(this.$router.options.routes);
  },
  methods: {
    dropdown: function(index) {
      console.log(event.target.getAttribute('class'));
      console.log(this.menuList[index].activedrop)
      this.menuList[index].activedrop =! this.menuList[index].activedrop;
/*      if (event.target.getAttribute('class') === 'dropdownBtn') {
         this.dropdownActive = !this.dropdownActive;
      }*/
    },
    tabToggle: function(index) {
      this.$store.commit('changeTestMsg','222')
      // this.nowIndex = index;
    },
    tabLiToggle:function(event,index){
      $(".dropdownWrapper li").removeClass('active')
      $(event.currentTarget).addClass('active');

    }
/*    ...mapMutations([
     'changeTestMsg'
    ])*/
  },
})

</script>
<style scoped>
.dropdownWrapper.active{
      background: #098e69;
}
.el-menu-item-group__title {
  padding: 0;
}
ul {
    list-style: none;
    margin: 0;

    padding: 0
}
.el-aside {
    width: 200px;
    background-color: rgb(238, 241, 246);
    float: left;
    padding: 20px 0;
    font-size: 14px;
}
.nav-item{
    background-color: rgb(238, 241, 246);
    padding: 13px;
    cursor: pointer;
}
.nav-item a{
    color: #2c3e50;
}
.dropdownWrapper{
    margin-top: 7px;
}
.dropdownWrapper li{
  padding: 5px 0;
}
.dropdownWrapper li:hover{
    background: #0db587;
}
.dropdownWrapper li:hover a{
    color: #fff;
}
.dropdownBtn span{
  padding: 0 65px 0 4px;
}
.dropdownWrapper li.active{
  background: #0db587;
  color: #fff;
}
.dropdownWrapper li.active a{
  color: #fff;
}
</style>
