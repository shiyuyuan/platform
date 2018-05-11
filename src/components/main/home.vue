<template>
  <div id="mainApp">
<!--     <cnode-head></cnode-head> -->
    <img src="../../assets/img/banner.jpg" style="width: 100%;margin-top:60px">
    <div style="overflow: hidden;">
      <div class="chanmome">
        <el-row :gutter="20">
          <el-col :span="6" v-for="bussTables in bussTable">
            <div class="grid-content bg-purple">
              <router-link :to = "bussTables.linkhref">
              <div class="caidan" data-name="微博工具" :id="bussTables.id">
                <div class="caidanimg">
                  <img :src="bussTables.img"/>
                </div>
                <div class="caidantext">{{bussTables.name}}</div>
              </div>
              </router-link>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="home_notice">
         <h6>平台公告</h6>
         <p>虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的缩写) 这个变量名表示 Vue 实例。</p>
         <p>这篇教程主要描述的就是如何使用这些选项来创建你想要的行为</p>
         <p>一个 Vue 应用由一个通过 new Vue 创建的根 Vue 实例，以及可选的嵌套的、可复用的组件树组成。</p>
      </div>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
import cnodeHead from '../cnodeHead';
export default {
  data() {
    return {
      name: '',
      bussTable:[
          {
            id:1,
            linkhref:"weibojf",
            name:"肖申克的救赎",
            img:require('../../assets/img/weibo.png')
          },
          {
            id:1,
            name:"天才少女",
            linkhref:"weibodz",
            img:require('../../assets/img/douyin.png')
          },
          {
            id:1,
            name:"消失的爱人",
            linkhref:"menuAllOrder",
            img:require('../../assets/img/kshou.png')
          },
          {
            id:1,
            name:"猴神大叔",
            linkhref:"menuAllOrder",
            img:require('../../assets/img/wechat.png')
          },
      ]
    };
  },
  components: {
    "cnode-head": cnodeHead,
  },
  mounted() {

  },
  watch: {

  },
};

</script>
<style>
    body {
      margin: 0;
    }

    .chanmome {
      margin-top: 38px;
    }

    .chanmome img {}

    .caidantext {
      margin-top: 12px;
      color: #333;
      font-size: 15px;
    }
    .home_notice {
      margin-top: 30px;
      font-size: 14px;
      padding-left: 30px;
       text-align: left;
    }
    .home_notice h6{
      font-weight: normal;
      font-size: 16px;
      margin:5px 0; 
    }
    .home_notice p{
      
    }
</style>
