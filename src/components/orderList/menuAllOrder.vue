<template>
  <div>
    <div class="yw_menu">
      <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <div v-for="menuDatas in menuData">
          <el-submenu :index="menuDatas.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{menuDatas.name}}</span>
            </template>
            <div v-for="menuChild in menuDatas.children">
              <router-link :to="menuChild.linkhref">
                <el-menu-item :index="menuChild.id">
                  <span slot="title">{{menuChild.name}}</span>
                </el-menu-item>
              </router-link>
            </div>
          </el-submenu>
        </div>
      </el-menu>
    </div>
    <div class='secDiv yw_cont'>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
/*import {setCookie,getCookie} from '../../../static/js/cookie.js'
import{dateFtt} from '../../../static/js/base.js'*/
export default {
  data() {
    return {
      menuData: [
      {
          id: 1,
          linkhref: "weibojf",
          name: "WB业务",
          img: require('../../assets/img/weibo.png'),
          children: [{
              id: 2,
              linkhref: "weibojf",
              name: "JF业务",
              img: require('../../assets/img/weibo.png'),
            },
            {
              id: 3,
              linkhref: "weibodz",
              name: "DZ业务",
              img: require('../../assets/img/weibo.png'),
            }
          ]
        },
       {
          id: 4,
          linkhref: "weibojf",
          name: "WX业务",
          img: require('../../assets/img/weibo.png'),
          children: [{
              id: 5,
              linkhref: "weibojf",
              name: "WX阅读",
              img: require('../../assets/img/weibo.png'),
            },
            {
              id: 6,
              linkhref: "weibodz",
              name: "WX业务",
              img: require('../../assets/img/weibo.png'),
            }
          ]
        },
        {
          id: 4-1,
          linkhref: "weibojf",
          name: "DY业务",
          img: require('../../assets/img/weibo.png'),
          children: [{
              id: 5,
              linkhref: "weibojf",
              name: "WX阅读",
              img: require('../../assets/img/weibo.png'),
            },
            {
              id: 6,
              linkhref: "weibodz",
              name: "WX业务",
              img: require('../../assets/img/weibo.png'),
            }
          ]
        },
        {
          id: 4-2,
          linkhref: "weibojf",
          name: "KS业务",
          img: require('../../assets/img/weibo.png'),
          children: [{
              id: 5,
              linkhref: "weibojf",
              name: "WX阅读",
              img: require('../../assets/img/weibo.png'),
            },
            {
              id: 6,
              linkhref: "weibodz",
              name: "WX阅读",
              img: require('../../assets/img/weibo.png'),
            }
          ]
        },        
      ]
    };
  },
  mounted() {
    let h = $(window).height();
    $(".el-menu").height(h - 86)
  },
  methods: {

  }
};

</script>
<style lang="scss" scoped="" type="text/css">
.yw_menu {
  width: 240px;
  float: left;
}

.el-menu {
  height: calc(100% - 50px);
}

.yw_cont {
  margin-left: 270px;
}

.el-form-item__content {
  text-align: left
}

.el-submenu .el-menu-item {
  padding: 0 49px 0 9px;
}

.el-submenu__title {
  padding: 0 83px;
}

</style>
