<template>
    <div class='secDiv'>
      <!-- 面包屑开始 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>公告管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 面包屑结束 -->
      <el-form  class="demo-form-inline">   
        <el-form-item>
          <el-button type="primary"  @click="addNotice"> <i class="fa fa-plus"></i>  增加</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" stripe style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" :height="table_height" id="openAccount_table" v-loading="loading">
          <el-table-column type="index" :index="indexMethod" width="90" label="序号"></el-table-column>
          <el-table-column label="创建人" :formatter="createRole"></el-table-column>          
          <el-table-column prop="content" label="通告内容"></el-table-column>
          <el-table-column prop="create_time" label="创建时间"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="danger" @click="handleDelete(scope.row)"  size="small">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <!--分页begin-->
      <!--分页end-->
      <!-- 弹出页begin -->
      <el-dialog  width="500px" center :visible.sync="dialogFormVisible" :show-close="false" >
        <el-form :model="creatform" label-width="80px" ref="creatform" :rules="rules">
          <el-form-item label="内容" required prop="content">
            <el-input type="textarea" v-model="creatform.content"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 弹出页end -->
    </div>
</template>

<script>
import {setCookie,getCookie} from '../../../static/js/cookie.js'
import {dateFtt} from '../../../static/js/base.js'
export default {
    data() {
        return {
          table_height:'',
          secretkey:'',
          creatform:{
            content:""
          },
          loading:true,
          tableData: [],
          dialogFormVisible: false,
          rules: {
            content: [
              { required: true, message:'请输入公告内容', trigger: 'blur' }
            ]
          }          
        };
    },
    methods: {
        // 增加
        addNotice() {   
            this.dialogFormVisible = true;          
        },
        addSubmit(){
                 this.$http.get(this.GLOBAL.https+"/platform/common/api",{
                  params:{
                      methods:"addNotice",
                      secret:this.secretkey,
                      content:$.trim(this.creatform.content),
                  }
                 }).then((response)=>{
                  if(response.data.ok == 10000){
                    this.dialogFormVisible=false;
                    this.$message({
                      showClose: true,
                      message: '增加成功',
                      type: 'success',
                      duration:'3000'
                    });
                    this.creatform.content =' ';
                    this.getPriceTable()
                  }else{
                    this.$message({
                      showClose: true,
                      message: response.data.msg,
                      type: 'error',
                      duration:'3000'
                    });
                    return false;
                  }
                 },(response) =>{
                      this.$message({
                      showClose: true,
                      message: '修改失败',
                      type: 'error',
                      duration:'3000'
                      });
                      return false;
                 });          
        },
        // 渲染表格
        getPriceTable(){
              this.$http.get(this.GLOBAL.https+"/platform/common/api",{
                  params:{
                      methods:"noticeInfo",
                      secret:this.secretkey
                  }
                 }).then((response)=>{
                  if(response.data.ok == 10000){
                    this.loading = false;
                    this.tableData =response.data.data;
                  }
                 },(response) =>{
                 });            
        },
        // 删除
        handleDelete(row) {
            this.$http.get(this.GLOBAL.https+"/platform/common/api",{
                  params:{
                      methods:"delNotice",
                      secret:this.secretkey,
                      id:row.id
                  }
                 }).then((response)=>{
                  if(response.data.ok == 10000){
                    this.getPriceTable()
                    this.$message({
                      showClose: true,
                      message: '删除成功',
                      type: 'success',
                      duration:'3000'
                    });
                  }else{
                   this.$message({
                      showClose: true,
                      message: response.data.msg,
                      type: 'error',
                      duration:'3000'
                    });
                  }
                 },(response) =>{
                 }); 
        },
        indexMethod(index){
           return 1+index;
        },
        createRole(){
          return "管理员"
        }
    },
    mounted() {
          this.secretkey = getCookie('username')
          this.getPriceTable();
          var h = $(window).height();
          this.table_height = h-200;     
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
