<template>
   <div class='secDiv'>
      <!-- 面包屑开始 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>充值记录</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 面包屑结束 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline" v-if="mangeLogin">
        <el-form-item>
          <el-input v-model="formInline.user" placeholder="请输入账号(支持模糊查询)" style='width:300px'></el-input>
        </el-form-item>
        <el-date-picker  v-model="formInline.startTime"  type="date" placeholder="选择查询时间">
        </el-date-picker>
        <el-form-item>
          <el-button type="success"  @click="query"><i class="fa fa-search"></i> 查询</el-button>
         <el-button type="success">{{total_money}}</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" stripe :default-sort = "{prop: 'date', order: 'descending'}"  id="openAccount_table" v-loading="loading">
          <el-table-column type="index" :index="indexMethod" width="90" label="序号"></el-table-column>
          <el-table-column prop="account" label="账号"></el-table-column>          
          <el-table-column prop="nickname" label="昵称"></el-table-column>
          <el-table-column prop="old_balance" label="原余额" sortable></el-table-column>
          <el-table-column prop="cash" label="充值余额" sortable>
              <template slot-scope="scope">
                  <span  style="color:#FA5555">{{scope.row.cash}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="new_balance" label="现余额" sortable></el-table-column>
          <el-table-column prop="type" label="充值类型" :formatter="reChangetype"></el-table-column>          
          <el-table-column prop="opera_time" label="充值时间"></el-table-column>
      </el-table>
      <!--分页begin-->
      <div class="block mar_t3">
        <el-pagination
             :current-page="filter.page"
             :page-sizes="[15, 20, 50, 100]"
             :page-size="filter.per_page"
             layout="total, sizes, prev, pager, next, jumper"
             :total="total_rows"
             @size-change="pageSizeChange"
             @current-change="pageCurrentChange">
        </el-pagination>
      </div>
      <!--分页end-->
    </div>
</template>

<script>
/*import {setCookie,getCookie} from '../../../static/js/cookie.js';
import{dateFtt} from '../../../static/js/base.js'*/
export default {
    data() {
        return {
          mangeLogin:true,
          total_rows: 0,
          table_height:'',
          secretkey:'',
          formInline: {
              user: '',
              startTime: '',
            },
          total_money:'',
          newStartTime:'',
          filter: {
              per_page: 15, // 页大小
              page: 1, // 当前页
          }, 
          loading:false,           
          tableData: []
        };
    },
    methods: {
        //查询
        query() {     
          // this.newStartTime = dateFtt("yyyy-MM-dd",new Date(this.formInline.startTime))
          if(this.newStartTime == 'NaN-aN-aN'){
            this.newStartTime = ''
          }  
            this.getRerecordTable();
        },
        // 渲染表格
        getRerecordTable(){
              if(this.newStartTime == ''){
                // this.newStartTime = dateFtt("yyyy-MM-dd",new Date())
              }
              this.$http.get(this.GLOBAL.https+"/platform/user/api",{
                  params:{
                      methods:"record",
                      secret:this.secretkey,
                      account:this.formInline.user,
                      type:1,
                      pageNum:this.filter.page,
                      pageSize:this.filter.per_page,
                      date:this.newStartTime
                  }
                 }).then((response)=>{
                  if(response.data.ok == 10000){
                    this.loading=false;
                    this.tableData =response.data.data;
                    this.total_rows = response.data.count;
                    this.total_money =this.newStartTime +" 充值：" +response.data.sum;
                  }else{

                  }
                 },(response) =>{
                 }); 
        },
        pageSizeChange(val) {
            this.filter.per_page = val;
            this.getRerecordTable();
        },
        pageCurrentChange(val) {
            this.filter.page = val;
            this.getRerecordTable();
        },        
        indexMethod(index){
            return (this.filter.page-1)*this.filter.per_page+index+1;
        },
        reChangetype(row){
          if(row.type == 300){
            return "初级粉退款"
          }else if(row.type==400){
            return "高级粉退款"
          }else if(row.type==1){
            return "充值"
          }
        }
    },
    mounted() {
          // this.secretkey = getCookie('username')
/*          this.getRerecordTable();
              var h = $(window).height();
              this.table_height = h-250;            
          $(window).resize(function(event) {
              var h = $(window).height();
              this.table_height = h-250;  
          });  */
    },
    computed: {
        dealTime() {
            return String(this.item.create_at).match(/.{10}/)[0];
        },
    },
    created() {

    },
    watch:{
        content(val) {
            if (val) {
              alert(2)
            }
        },
    },
};
</script>

<style scoped>
   .priceinput{
    width: 300px;
   }
   .el-input--prefix .el-input__inner {
    padding-left: 16px;
  }
/*  .demo-form-inline {
    text-align: left;
  }*/
</style>
<!-- <script type="text/javascript" src="../../static/js/md5.js'"></script> -->
