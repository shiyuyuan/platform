<template>
    <div class='secDiv'>
      <!-- 面包屑开始 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>缓存监控</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 面包屑结束 -->
      <!-- 表格 -->
      <ul class="currentul">
        <li><span>IP：</span><el-button type="primary" plain>{{tableData.ip}}</el-button></li>
        <li><span>端口：</span><el-button type="primary" plain>{{tableData.port}}</el-button></li>
        <li><span>当前连接数：</span><el-button type="primary" plain>{{tableData.usedConnection}}</el-button></li>
         <li><span>已使用内存数：</span><el-button type="primary" plain>{{tableData.usedMemory}}</el-button></li>
        <li><span>总内存：</span><el-button type="primary" plain>{{tableData.maxMemory}}</el-button></li>
        <li><span>普通：</span><el-button type="primary" plain>{{tableData.normal}}</el-button></li>
        <li><span>顶级：</span><el-button type="primary" plain>{{tableData.high}}</el-button></li>
      </ul>
    </div>
</template>

<script>
import {setCookie,getCookie} from '../../../static/js/cookie.js'
export default {
    data() {
        return {
          secretkey:'',           
          tableData:{}
        };
    },
    methods: {
        // 渲染表格
        getConrecordTable(){
              this.$http.get(this.GLOBAL.https+"/platform/user/api",{
                  params:{
                      methods:"redisInfo",
                      secret:this.secretkey
                  }
                 }).then((response)=>{
                  if(response.data.ok == 10000){
                    this.tableData =response.data.data;
                  }
                 },(response) =>{
                 }); 
        }
    },
    mounted() {
          this.secretkey = getCookie('username')
          this.getConrecordTable();
    }
};
</script>

<style scoped>
   .priceinput{
    width: 300px;
   }
   .currentul{
    list-style: none;
    margin-left: -40px;
    margin-top: 20px
   }
   .currentul li{
    margin-bottom: 11px;
    color: #999;
    font-weight: 500;
    font-size: 14px;
   }
    .currentul span{
      width: 100px;
      text-align: right;
      display: inline-block;
    }
</style>
<!-- <script type="text/javascript" src="../../static/js/md5.js'"></script> -->
