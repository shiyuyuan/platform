<template>
    <div class='secDiv'>
      <!-- 面包屑开始 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/homepage'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>自助充值</el-breadcrumb-item>
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
              <p>{{tableData.balance}}</p>
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
      <!-- 充值 -->
		<el-form :inline="true" :model="reCharge" :rules="rules" ref="reCharge" class="demo-form-inline demo_form" status-icon>
		  <el-form-item label="账户" prop="user" required >
		    <el-select v-model="reCharge.user" filterable placeholder="请选择(支持搜索)" @change="clickAccount">
		      <el-option v-bind:label="newreArr.account" v-bind:value="newreArr.appkey" v-for="newreArr in newreArr" :key="newreArr.appkey"></el-option>		      
		    </el-select>
		  </el-form-item>
		  <el-form-item label="金额" required prop="money">
		    <el-input v-model="reCharge.money" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="success" @click="chargeSubmit('reCharge')">立刻充值</el-button>
		  </el-form-item>
		</el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: {
                account: '',
                level: '',
                balance: '',
                status: ''
              },
            reCharge: {
              user: '',
              money: ''
            },
            newreArr:[],
            rules: {
               user: [
                { required: true, message: '账号不为空', trigger: 'blur' },
              ],             
              money:[
                { required: true, message: '请输入金额', trigger: 'blur' },
                { pattern:/^[1-9]\d*$/, message: '只能正整数'}
              ]
            }
            };
    },
    methods: {
        getUserList(){

             this.$http.get(this.GLOBAL.https+"/platform/user/api",{
                  params:{
                      methods:"userList",
                      secret:this.userKey,
                      pageNum:1,
                      pageSize:2000000
                  }
                 }).then((response)=>{
         
                  if(response.data.ok == 10000){                                
                    for(var i = 0;i<response.data.data.length;i++){                      
                        if(response.data.data[i].status == 0){                            
                             this.newreArr.push({
                                "account":response.data.data[i].account,
                                "appkey":response.data.data[i].appkey
                             })                            
                        }
                    }
                  }else{

                  }
                 },(response) =>{
                   console.log(response)
                 });
        },
        chargeSubmit(formName){
            if(this.reCharge.user == ''){
                this.$message({
                  message: '请选择账号',
                  type: 'error',
                  duration:'2000'
                });
                return false;
            }
            this.$refs[formName].validate((valid) => {
              if (valid) {
                 this.$http.get(this.GLOBAL.https+"/platform/cash/api",{
                  params:{
                      methods:"recharge",
                      secret:this.userKey,
                      rechargeCode:this.reCharge.user,
                      cash:$.trim(this.reCharge.money),
                      operaType:1
                  }
                 }).then((response)=>{
                  if(response.data.ok == 10000){
                    this.$message({
                      showClose: true,
                      message: '充值成功',
                      type: 'success',
                      duration:'2000'
                    });
                    //this.$refs[formName].resetFields();
                    this.newchangeData(this.reCharge.user)
                  }else{
                    this.$message({
                      showClose: true,
                      message: response.data.data,
                      type: 'error',
                      duration:'2000'
                    });
                  }
                 },(response) =>{
                      this.$message({
                      showClose: true,
                      message: '充值失败',
                      type: 'error',
                      duration:'2000'
                      });
                 });
              } else {
              }
            });
        },
        clickAccount(value){
            this.newchangeData(value);
        },
        newchangeData(value){
            this.$http.get(this.GLOBAL.https+"/platform/user/api",{
                params:{
                    methods:"userInfo",
                    secret:value,
                    queryKey:value
                }
              }).then((response)=>{
                if(response.data.ok == 10000){           
                     var changeUserData =  response.data.data;
                      this.tableData.account = changeUserData.nickname;
                      this.tableData.balance = changeUserData.balance;
                      this.tableData.status = changeUserData.status;
                      if(changeUserData.status == 0){
                          this.tableData.status ='正常';
                        }else if(changeUserData.status == 1){
                          this.tableData.status ='冻结';
                        }
                      if(changeUserData.level == 1){
                          this.tableData.level ='超级管理员';
                        }else if(changeUserData.level == 2){
                          this.tableData.level ='管理员';
                        }else if(changeUserData.level == 4){
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
    mounted() {
/*        this.userKey = getCookie('username'); 
        this.getUserList();*/
    },
    computed: {
           
    },
    created() {
    },
    watch: {
        content(val) {
            if (val) {
            }
        },
    },
};
</script>

<style scoped>
    .grid-content span{
   /*     color:#17536f;*/
        padding-left: 5px
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
  .demo_form{
    text-align: center;
  }   
</style>