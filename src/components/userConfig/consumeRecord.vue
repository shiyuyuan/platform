<template>
    <div class='secDiv'>
      <!-- 面包屑开始 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>消费记录</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 面包屑结束 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.user" placeholder="请输入账号(支持模糊查询)" style='width:300px'></el-input>
        </el-form-item>
        <el-form-item label="消费类型">
          <el-select v-model="formInline.type" placeholder="全部" @change="getConrecordTable">
            <el-option label="全部" :value="5"></el-option>
            <el-option label="下单扣费" :value="3"></el-option>
            <el-option label="取消退款" :value="4"></el-option>
          </el-select>
        </el-form-item>               
        <el-form-item>
          <el-button type="success"  @click="query"><i class="fa fa-search"></i>  查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" stripe style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" id="openAccount_table" v-loading="loading">
          <el-table-column type="index" :index="indexMethod" width="50" label="序号"></el-table-column>
          <el-table-column prop="account" label="账号"></el-table-column>                  
          <el-table-column prop="nickname" label="昵称"></el-table-column>
          <el-table-column prop="keyStr" label="微博ID" min-width="80"></el-table-column>
          <el-table-column prop="url" label="微博链接" min-width="50">
            <template slot-scope="scope">
              <a v-bind:href='scope.row.url' target="_black">查看链接</a>
            </template>            
          </el-table-column>         
          <el-table-column prop="type" label="消费类型" min-width="100">
              <template slot-scope="scope">
                  <el-button  type ="success"size="small" v-if='scope.row.type == 3'>初级粉下单</el-button>
                  <el-button  type ="success" size="small" v-if='scope.row.type == 4'>高级粉下单</el-button>
                  <el-button  type ="warning" size="small" v-if='scope.row.type == 300'>初级粉退款</el-button>
                  <el-button  type ="warning" size="small" v-if='scope.row.type == 400'>高级粉退款</el-button>
                  <el-button  type ="primary"size="small" v-if='scope.row.type == 5'>普通评论赞下单</el-button>
                  <el-button  type ="primary" plain size="small" v-if='scope.row.type == 6'>高级评论赞下单</el-button>
                  <el-button  type ="primary" size="small" v-if='scope.row.type == 7'>顶级评论赞下单</el-button>
                  <el-button  type ="danger" size="small" v-if='scope.row.type == 500'>普通评论赞退款</el-button>
                  <el-button  type ="danger" plain size="small" v-if='scope.row.type == 600'>高级评论赞退款</el-button>
                  <el-button  type ="danger" size="small" v-if='scope.row.type == 700'>顶级评论赞退款</el-button>                  
              </template>
          </el-table-column>
          <el-table-column prop="old_balance" label="原余额" min-width="50"></el-table-column>
          <el-table-column prop="cash" label="消费金额" sortable min-width="80">
              <template slot-scope="scope">
                  <span  style="color:#FA5555">{{scope.row.cash}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="new_balance" label="现余额" min-width="50"></el-table-column>
          <el-table-column prop="opera_time" label="消费时间" min-width="120"></el-table-column>
          <!-- <el-table-column prop="prod_name" label="备注"></el-table-column> -->
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
export default {
    data() {
        return {
          total_rows: 0,
          table_height:'',
          secretkey:'',
          formInline: {
              user: '',
              type:5
            },
          filter: {
              per_page: 15, // 页大小
              page: 1, // 当前页
          },            
          tableData: [],
          loading:false
        };
    },
    methods: {
        //查询
        query() {       
            this.getConrecordTable();
        },
        // 渲染表格
        getConrecordTable(){
              this.$http.get(this.GLOBAL.https+"/platform/user/api",{
                  params:{
                      methods:"record",
                      secret:this.secretkey,
                      account:this.formInline.user,
                      type:this.formInline.type,
                      pageNum:this.filter.page,
                      pageSize:this.filter.per_page
                  }
                 }).then((response)=>{
                  if(response.data.ok == 10000){
                    this.loading=false;
                    this.tableData =response.data.data;
                    this.total_rows = response.data.count;
                  }else{

                  }
                 },(response) =>{
                 }); 
        },
        pageSizeChange(val) {
            this.filter.per_page = val;
            this.getConrecordTable();
        },
        pageCurrentChange(val) {
            this.filter.page = val;
            this.getConrecordTable();
        },        
        indexMethod(index){
            return (this.filter.page-1)*this.filter.per_page+index+1;
        },
        consumeType(row){
          if(row.type == 3){
            return "初级粉下单"
          }else if(row.type==4){
            return "高级粉下单"
          }else if(row.type==300){
            return "高级粉退款"
          }else if(row.type==400){
            return "高级粉退款"
          }else if(row.type==5){
            return "普通评论赞"
          }else if(row.type==6){
            return "顶级评论赞"
          }else if(row.type==500){
            return "普通评论赞退款"
          }else if(row.type==600){
            return "顶级评论赞退款"
          }
        }
    },
    mounted() {
          this.secretkey = getCookie('username')
          this.getConrecordTable();
              var h = $(window).height();
              this.table_height = h-250;            
          $(window).resize(function(event) {
              var h = $(window).height();
              this.table_height = h-250;  
          });   
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
</style>
<!-- <script type="text/javascript" src="../../static/js/md5.js'"></script> -->
