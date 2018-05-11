<template>
  <div class="head">
    <h4>小演习系统管理计划</h4>
    <ul class="head_ul">
      <div id="main-navbar-collapse" class="collapse">
        <span class="ymoney">余额：23232</span>
        <el-dropdown @command="handleCommand" style="margin-top: -5px;">
          <el-button>
            <i class="fa fa-user"> </i>
            <span>{{user_name}}</span>
            <!-- <span class="label label-primary">VIP代理</span> -->
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/rechargeRecord">
              <el-dropdown-item><i class="el-icon-document"></i>&nbsp; 充值记录</el-dropdown-item>
            </router-link>
            <router-link to="/consumeRecord">
              <el-dropdown-item><i class="el-icon-tickets"></i>&nbsp; 消费记录</el-dropdown-item>
            </router-link>
            <el-dropdown-item @click="dialogVisible()" command="a"><i class="el-icon-edit"></i>&nbsp; 更改密码</el-dropdown-item>
            <el-dropdown-item command="b"><i class="el-icon-back"></i>&nbsp; 退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </ul>
    <ul class="head_ul">
      <li>
        <router-link to="/homepage">首页</router-link>
      </li>
      <li>
        <router-link to="/usermanage">用户管理</router-link>
      </li>
      <li>
        <router-link to="/menuConfig">菜单管理</router-link>
      </li>
      <li>
        <router-link to="/editPrice">价格管理</router-link>
      </li>
      <li>
        <router-link to="/noticeMn">公告管理</router-link>
      </li>
      <li>
        <router-link to="/reCharge">用户充值</router-link>
      </li>
      <li>
        <router-link to="/userCharge">在线充值</router-link>
      </li>
    </ul>
    <!-- 账号管理 -->
    <el-dialog :visible.sync="dialogMaVisible" :show-close="true" id="changeUser" width='500px' title="此功能正在完善中">
      <el-form :model="changePwform" class="demo-ruleForm" status-icon label-width="80px" ref="changePwform">
        <el-form-item label="昵称">
          <el-input v-model="changePwform.name"></el-input>
        </el-form-item>
        <el-form-item label="旧密码">
          <el-input type="password" v-model="changePwform.oldpass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpass">
          <el-input type="password" v-model="changePwform.newpass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="changePwform.checkPass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMaVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default ({
  data() {
    return {
      user_name: '超级管理员',
      cookieName: [],
      changePwform: {
        name: '',
        oldpass: '',
        newpass: '',
        checkPass: '',
      },
      /*      rules: {
              name: [
                { required: true, message: '请输入昵称', trigger: 'blur' },
              ],
              newpass: [
                { validator: validatePass, trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15个字符', trigger: 'blur' }
              ],
              checkPass: [
                { validator: validatePass2, trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15个字符', trigger: 'blur' }
              ]
            },*/
      dialogMaVisible: false
    }

  },
  watch: {
    //监听路由变化
    $route(to, from) {
      if (to.path == "/homepage") {
        $(".head").addClass('headhome')
      } else {
        $(".head").removeClass('headhome')
      }
    }
  },
  mounted() {},
  methods: {
    handleCommand(command) {
      if (command == 'a') {
        this.dialogMaVisible = true;
      } else {
        /*        delCookie('username')
                this.$router.push('/')*/
      }
    },
  }
})

</script>
<style lang="scss" type="text/css">
.pull-right {
  float: right;
}

.head {
  background: #525252;
  height: 62px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .el-dropdown {
    color: #fff;
    cursor: pointer;
  }
  h4 {
  color: #03b8cc;
  font-weight: 14px;
  float: left;
  display: inline-block;
  margin-left: 70px;
  font-weight: normal;
}
}

.headhome {
  background: #fff;
  .el-dropdown {
    color: #666;
    cursor: pointer;
  }
}

.headhome ul.head_ul li a {
  color: #666;
}


.el-header {
  color: #fff;
  margin-top: 20px;
  font-size: 16px;
  margin-right: 20px;
  text-align: right;
  font-size: 14px
}

.el-dropdown {
  color: #fff;
  font-size: 14px;
}

.el-submenu__title i {
  color: #0db587;
}

ul.head_ul {
  list-style: none;
  float: right;
  margin-right: 20px;
  li {
    float: left;
    font-size: 14px;
    margin: 6px 0px;
    a {
      color: #fff;
      padding: 8px 16px;
      border-radius: 7px;
    }
  }
}

ul.head_ul li a.active {
  background: #11c6da;
  color: #fff;
}

a:hover {
  color: #03b8cc;
}

.ymoney {
  font-size: 15px;
  color: #ed7206;
  margin: 7px 10px 0 0;
  display: inline-block;
}

</style>
