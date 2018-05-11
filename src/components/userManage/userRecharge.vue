<template>
    <div class='secDiv'>
      <!-- 面包屑开始 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>个人充值</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 面包屑结束 -->
      <!-- top开始 -->
      <el-row :gutter="10" style="margin-top:20px" class="ob-landing">
        <el-col :xs="6" :sm="12" :md="6" :lg="6" :xl="11" class="ob-col">
          <div class="grid-content about-speed2">
            <div class="about-box"><i class="fa fa-user"></i> 
              <div class="text">
                <h4>当前用户</h4>
                <p>{{tableData.account}}</p>
              </div>
            </div>
          </div>
        </el-col>      
        <el-col :xs="6" :sm="12" :md="6" :lg="6" :xl="1" class="ob-col">
          <div class="grid-content about-speed">
             <div class="about-box"><i class="fa fa-rmb (alias)"></i>          
              <div class="text">
              <h4>账户余额</h4>
              <p>{{tableData.card}}</p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="6" :sm="12" :md="6" :lg="6" :xl="11" class="ob-col">
          <div class="grid-content about-speed3">
            <div class="about-box"><i class="fa fa-hand-o-right"></i> 
              <div class="text">
                <h4>状态</h4>
                <p>{{tableData.status}}</p>
              </div>  
            </div>
          </div>
        </el-col>
        <el-col :xs="6" :sm="12" :md="6" :lg="6" :xl="1" class="ob-col">
          <div class="grid-content about-speed4">
            <div class="about-box">
               <i class="fa fa-sitemap"></i> 
               <div class="text">
                <h4>等级</h4>
                <p>{{tableData.level}}</p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>      
      <!-- top结束 -->
      <!-- 订单开始 -->
<!--       <el-form  :model="orderform" label-width="80px" class="mar_t3" :rules="rules" ref="orderform">
        <el-form-item label="充值金额" required prop='num'>
          <el-input v-model="orderform.num" placeholder="" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createOrder('orderform')" >立即充值</el-button>
        </el-form-item>
      </el-form> -->
      <p style="font-size:18px;color: red;">充值请联系QQ客服1334270421</p>
      <!-- <img src="/static/img/zfb.jpg" style="width: 423px;margin-top:5px" /> -->
<!--       <img src="/static/img/wc.jpg" style=" margin-left:10px;width: 271px;margin-top:5px" /> -->
    </div>
</template>

<script>
import {setCookie,getCookie} from '../../../static/js/cookie.js'
export default {
    data() {       
        return {
            tableData: {
                level: '',
                name: '',
                card: '',
                status: ''
              },
            userKey:'',
            showPerInfo:'',
            orderform: {
              num:''
            },
            rules: {            
              num:[
                {required: true, message: '充值金额不为空', trigger: 'blur' },
                { pattern:/^[1-9]\d*$/, message: '只能输入正整数'}
              ]
            }
          }
        },
        methods:{
          //下单
          createOrder(formName){
             this.$refs[formName].validate((valid) => {
                if (valid) {
                  this.$http.get(this.GLOBAL.https+"/platform/order/api",{
                    params:{
                        methods:"increaseOrder",
                        secret:this.userKey,
                        task:this.orderform.num
                    }
                  }).then((response)=>{
                    if(response.data.ok == 10000){
                        this.searchPerInfo()
                        this.$message({
                          showClose: true,
                          message: '充值成功',
                          type: 'success'
                        });
                        this.$refs[formName].resetFields();
                    }else{
                        this.$message({
                          showClose: true,
                          message: response.data.msg,
                          type: 'error'
                        });
                    }
                   },(response) =>{
                        this.$message({
                          showClose: true,
                          message:'操作失败',
                          type: 'error'
                        });
                   });
                }
              });
          },
          //查询信息
          searchPerInfo(){
              this.$http.get(this.GLOBAL.https+"/platform/user/api",{
                params:{
                    methods:"userInfo",
                    secret:this.userKey,
                    queryKey:this.userKey
                }
              }).then((response)=>{
                if(response.data.ok == 10000){           
                      var res_data =  response.data.data;
                      this.tableData.name =res_data.nickname;                     
                      this.tableData.card =res_data.balance;
                      this.tableData.account =res_data.nickname;
                      
                      if(res_data.status == 0){
                        this.tableData.status ='正常';
                      }else if(res_data.status == 1){
                        this.tableData.status ='冻结';
                      }
                      if(res_data.level == 1){
                        this.tableData.level ='超级管理员';
                      }else if(res_data.level == 2){
                        this.tableData.level ='管理员';
                      }else if(res_data.level == 4){
                        this.tableData.level ='VIP代理';                        
                      }else{
                        this.tableData.level ='高级代理';
                      }
           
                }
               },(response) =>{
                    this.$message({
                      showClose: true,
                      message:'操作失败',
                      type: 'error'
                    });
               });

                }
        },
        mounted(){
          this.userKey= getCookie('username'); 
          this.searchPerInfo();
        }
    }
</script>

<style scoped>
  .el-table {
      color: #697380;
  }
  .ob-landing .grid-content {
    height: 106px;
    height: 80px;   
  }
  .ob-landing  .about-box{
    height: 80px;
  }
  .ob-landing .about-box i{
    font-size: 24px;
  }  
    .ob-landing .text {
    margin-top: -40px;
  }  
</style>