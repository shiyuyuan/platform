<template>
    <div class='secDiv'>
      <!-- 面包屑开始 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户开户</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 面包屑结束 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.user" placeholder="请输入账号(支持模糊查询)" style='width:300px'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="query"><i class="fa fa-search"></i>  查询</el-button>
           <el-button type="primary" @click="dialogFormVisible = true">添加新用户</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" stripe style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" :height="table_height" id="openAccount_table" v-loading="loading">
          <el-table-column type="index" :index="indexMethod" width="90" label="序号"></el-table-column>
          <el-table-column prop="account" label="账号"></el-table-column>          
          <el-table-column prop="nickname" label="昵称"></el-table-column>
          <el-table-column prop="level"  label="等级" width="180" :formatter="levelFormatter"></el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="180" sortable></el-table-column>
          <el-table-column prop="id" v-if='isHidden'></el-table-column>
          <el-table-column prop="status" label="状态" :formatter="statusFormatter"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="success" @click="handleFreeze(scope.row)"  size="small" v-if="scope.row.status ==0 ">冻结</el-button>
              <el-button  type="danger" @click="handleDelete(scope.row)"  size="small" v-if="scope.row.status ==1 ">删除</el-button>
            </template>
          </el-table-column>
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
      <!-- 弹出页begin -->
      <el-dialog  width="500px" :visible.sync="dialogFormVisible" :show-close="false" >
        <el-form :model="creatform" label-width="80px" :rules="rules" ref="creatform" status-icon>
          <el-form-item label="账号" required prop="account">
            <el-input v-model="creatform.account" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="昵称" required prop="name">
            <el-input v-model="creatform.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" required prop="passWord">
            <el-input v-model="creatform.passWord"></el-input>
          </el-form-item>
          <el-form-item label="等级" required prop="authority">
            <el-select v-model="creatform.authority" placeholder="">
              <el-option label="高级代理" value="3"></el-option>
              <el-option label="VIP代理" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="createUsers('creatform')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 弹出页end -->
    </div>
</template>

<script>
import mui from '../../../static/js/md5.js' 
import {setCookie,getCookie} from '../../../static/js/cookie.js'
export default {
    data() {
        return {
          isHidden:false,
          total_rows: 0,
          hasFreeze:'',
          hasDelete:'',
          table_height:'',
          loading:true,
          filter: {
              per_page: 15, // 页大小
              page: 1, // 当前页
          },
          creatform:{
            account:"",
            name:"",
            passWord:"",
            authority:"4",
          },
          formInline: {
              user: ''
            },
          tableData: [],
          dialogFormVisible: false,
          rules: {
            name: [
              { required: true, message: '请输入昵称', trigger: 'blur' },
              { min: 3, max: 20, message: '长度在 3 到 20个字符', trigger: 'blur' }
            ],
            account: [
              { required: true, message: '请输入账号', trigger: 'blur' },
              { min: 3, max: 20, message: '长度在 3 到 20个字符', trigger: 'blur' }
            ],
            passWord:[
             { required: true, message: '请填写密码', trigger: 'blur' },
             { min: 6, max: 15, message: '长度在 6 到 15个字符', trigger: 'blur' }
            ]
          }
        };
    },
    methods: {

        // 新增用户
        createUsers(formName){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                let passwd = $.md5(this.creatform.passWord);
                 this.$http.get(this.GLOBAL.https+"/platform/user/api",{
                  params:{
                      methods:"createUser",
                      secret:this.userKey,
                      account:$.trim(this.creatform.account),
                      nickname:$.trim(this.creatform.name),
                      level:this.creatform.authority,
                      password:passwd,
                  }
                 }).then((response)=>{
                  if(response.data.ok == 10000){
                    this.dialogFormVisible=false;
                    this.$message({
                      showClose: true,
                      message: '新增成功',
                      type: 'success',
                      duration:'2000'
                    });
                    this.creatform.account = " ";
                    this.creatform.name = " ";
                    this.creatform.level = "3";
                    this.creatform.passWord = " ";
                    this.getUsers()
                  }else{
                    this.$message({
                      showClose: true,
                      message: response.data.msg,
                      type: 'error',
                      duration:'2000'
                    });
                    return false;
                  }
                 },(response) =>{
                      this.$message({
                      showClose: true,
                      message: '新增失败',
                      type: 'error',
                      duration:'2000'
                      });
                      return false;
                 });
              } else {
                return false;
              }
            });
        },
        //查询
        query() {       
            this.getUsers();
        },
        // 渲染表格
        getUsers(){
              this.$http.get(this.GLOBAL.https+"/platform/user/api",{
                  params:{
                      methods:"userList",
                      secret:this.userKey,
                      account:this.formInline.user,
                      pageNum:this.filter.page,
                      pageSize:this.filter.per_page
                  }
                 }).then((response)=>{
                  if(response.data.ok == 10000){
                    this.loading = false;
                    this.tableData =response.data.data;
                    this.total_rows = response.data.count;
                  }else{

                  }
                 },(response) =>{

                 }); 
        },
        // 冻结
        handleFreeze(row) {
          // console.log(event.currentTarget)
           this.$http.get(this.GLOBAL.https+"/platform/user/api",{
                  params:{
                      methods:"operaUser",
                      secret:this.userKey,
                      operaType:1,
                      id:row.id
                  }
                 }).then((response)=>{
                  if(response.data.ok == 10000){
                      this.$message({
                      showClose: true,
                      message: '冻结成功',
                      type: 'success',
                      duration:'2000'
                    });
                      this.getUsers();
                  }else{
                    this.$message({
                      showClose: true,
                      message: response.data.msg,
                      type: 'error',
                      duration:'2000'
                    });
                  }
                 },(response) =>{
   
                 });
        },
        // 删除
        handleDelete(row){
           this.$http.get(this.GLOBAL.https+"/platform/user/api",{
                  params:{
                      methods:"operaUser",
                      secret:this.userKey,
                      operaType:2,
                      id:row.id
                  }
                 }).then((response)=>{

                  if(response.data.ok == 10000){
                      this.$message({
                      showClose: true,
                      message: '删除成功',
                      type: 'success',
                      duration:'2000'
                    });
                      this.getUsers();
                  }else{
                    this.$message({
                      showClose: true,
                      message: response.data.msg,
                      type: 'error',
                      duration:'2000'
                    });
                  }
                 },(response) =>{
                   console.log(response)
                 });
        },
        indexMethod(index){
            return (this.filter.page-1)*this.filter.per_page+index+1;
        },
        levelFormatter(row, column) {
          if(row.level == '3'){
            return "高级代理";
          }else if(row.level == '2'){
            return "管理员";
          }else if(row.level == '4'){
            return "VIP代理";
          }else{
            return "超级管理员";
          }
        },
        statusFormatter(row,column){
          if(row.status == '0'){
              return "正常";
            }else if(row.status == '1'){
              return "冻结";
            }
        },
        pageSizeChange(val) {
            this.filter.per_page = val;
            this.getUsers();
        },
        pageCurrentChange(val) {
            this.filter.page = val;
            this.getUsers();
        }
    },
    mounted() {
        this.userKey= getCookie('username'); 
        this.getUsers();
        var h = $(window).height();
        this.table_height = h-250;       
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

</style>
<!-- <script type="text/javascript" src="../../static/js/md5.js'"></script> -->
