<template>
    <div class='secDiv'>
      <!-- 面包屑开始 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/homepage'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人充值</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 面包屑结束 -->     
      <!-- 充值 -->
		<el-form :inline="true" :model="reCharge" :rules="rules" ref="reCharge" class="demo-form-inline usercharge" status-icon>
      <div>你的账户 :管理员</div>
      <div>账户余额 :200</div>
      <div>支付方式 :支付宝</div>      
		  <el-form-item label="充值金额" required prop="money">
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
  .usercharge div{
    margin-bottom: 15px;
    font-size: 14px;
  }  
  .demo_form{
    text-align: center;
  }  
</style>