<template>
  <div class="bg">
<!--     <div class="login">
      <div class="loginContent">
        <el-form ref="loginform" :model="loginform" :rules="rules">
          <el-form-item label="" required prop="username">
            <el-input v-model="loginform.username" placeholder="请输入账号" ></el-input>
          </el-form-item>
          <el-form-item label="" required prop="password">
            <el-input v-model="loginform.password" type="password" placeholder="请输入密码" @keyup.enter.native= "loginSubmit('loginform')"></el-input>
          </el-form-item>
           <el-form-item>
              <el-checkbox v-model="remePw" label="记住密码"></el-checkbox>
           </el-form-item>
          <el-form-item>
            <el-button type="success" @click="loginSubmit('loginform')">立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>
     </div> -->
      <div class="login_content overflowh">
        <div class="summary">
         <div class="login">
          <form  class="login_form">
             <h1>登录页面
              <p></p>
             </h1>
             <i class="icon_login_useename2"></i>
             <input type="email" class="login_email" placeholder="请输入用户名" /> <br />
             <i class="icon_login_password2"></i>
             <input type="password" name="password" id="password" class="login_password" placeholder="请输入密码"/><br /> 
             <h2>
              <input type="checkbox"  checked="checked"/>
              <span>下次自动登录</span>
              <a href="#">忘记密
              码？</a>
             </h2> 
             <button @click="loginSubmit('loginform')">立 即 登 录</button>
             <h2>
              没有账号？
              <a href="#">立即注册</a>
             </h2> 
          </form>
         </div>
        </div>
       </div>
  </div>
</template>
<script>
/*import mui from '../../static/js/md5.js';
import {setCookie,getCookie,delCookie} from '../../static/js/cookie.js'*/
export default {
  data() {
    return {
      loginform: {
        username: '',
        password: ''
      },
      remePw:true,
      rules: {
           username: [
              { required: true, message: '请输入账号', trigger: 'blur' },
            ],
            password:[
             { required: true, message: '请填写密码', trigger: 'blur' },
            ]
          }
    }
  },
  methods: {
    loginkeySubmit(formName){
    },
    loginSubmit(formName) {
          this.$router.push('/homepage')
          this.$refs[formName].validate((valid) => {
              if (valid) {
                let passwd = $.md5(this.loginform.password);
                // axios.get(this.GLOBAL.https+"/platform/user/api", {
                //     params: {
                //         methods:"login",
                //         account:this.loginform.username,
                //         password:passwd
                //     }
                //   })
                //   .then(function (response) {
                //     console.log(response);
                //   })
                //   .catch(function (response) {
                //     console.log(response);
                //   });  
                // this.$http({
                //     url:this.GLOBAL.https+ `/platform/user/api`,
                //     method: 'get',
                //     params:{
                //         methods:"login",
                //         account:this.loginform.username,
                //         password:passwd
                //     }
                // }).then((res) => {
                //     alert(res)
                // }).catch((res) => {
                //     console.log('SideSec.vue :', res);
                // });      

                this.$http.get(this.GLOBAL.https+"/platform/user/api",{
                    params:{
                        methods:"login",
                        account:this.loginform.username,
                        password:passwd
                    }
                  }).then((response)=>{
                    if(response.data.ok == 10000){
                      if(this.remePw == true){
                          setCookie('useraccount',this.loginform.username,1000*240);
                          setCookie('userpassword',passwd,1000*240);
                          setCookie('system',this.loginform.password,1000*240);
                      }else{
                          setCookie('useraccount',this.loginform.username,1000*240);
                          delCookie('userpassword') 
                          delCookie('system')                  
                      }
                      setCookie('username',response.data.data.appkey);                      
                      setCookie('userlevel',response.data.data.level,1000*240);
                        setTimeout(function(){
                           this.$router.push('/home')
                        }.bind(this),1000)
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
                          message:'登录失败',
                          type: 'error'
                        });
                   });
              }

        });
    }
  },
  mounted(){
/*      this.loginform.username = getCookie('useraccount');
      this.loginform.password = getCookie('system')*/
      // if(getCookie('username')){
      //   this.$router.push('/home')
      // }
      $(".bg").height($(window).height()-16);
      $(window).resize(function(){
         $(".bg").height($(window).height()-16);
      })
  }
}
</script>
<style>
  @import url("../../assets/css/nainuo.css");
  .bg{
    background: url("../../assets/img/1.jpg");
    background-size: cover;
    overflow: hidden;
  }
</style>
