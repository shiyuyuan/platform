<template>
  <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/homepage'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>DZ业务</el-breadcrumb-item>
      </el-breadcrumb>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="DZ下单" name="first">
          <!-- 订单开始 -->
          <el-form :model="orderform" label-width="80px" class="mar_t3" :rules="rules" ref="orderform">
            <el-form-item label="订单类型" required prop='region'>
              <el-select v-model="orderform.region" placeholder="" @change="searchPrice">
                <el-option label="急速普通粉" :value="3"></el-option>
                <el-option label="急速顶级粉" :value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="链接" required prop='links'>
              <el-input v-model="orderform.links" placeholder="输入微博主页地址，格式：https://weibo.com/u/34********" style="width:400px"></el-input>
            </el-form-item>
            <el-form-item label="并发度" required>
              <el-radio-group v-model="orderform.speed" prop='speed'>
                <el-radio :label="1">慢速</el-radio>
                <el-radio :label="2">中速</el-radio>
                <el-radio :label="3">快速</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="单价/千" required>
              <el-input v-model="orderform.myPrice" disabled placeholder="" style="width:400px"></el-input>
            </el-form-item>
            <el-form-item label="数量" required prop='num'>
              <el-input v-model="orderform.num" placeholder="" style="width:400px" @focus="focusNum" @blur="focusNum" @change="focusNum"></el-input>
            </el-form-item>
            <el-form-item label="总计" required prop='totalPrice'>
              <el-input v-model="orderform.totalPrice" disabled placeholder="" style="width:400px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="createOrder('orderform')">立即下单</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="DZ订单" name="second">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
/*import {setCookie,getCookie} from '../../../static/js/cookie.js'
import{dateFtt} from '../../../static/js/base.js'*/
export default {
  data() {
    //限制下单数量
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('下单数量不能为空'));
      }
      setTimeout(() => {
        if (!(/^[1-9]\d*$/).test(value)) {
          callback(new Error('请输入有效数字'));
        } else {
          if (value < 1000) {
            callback(new Error('下单数量不可低于1000'));
          } else if (value % 100 != 0) {
            callback(new Error('下单数量必须是100的倍数哦'));
          } else {
            callback();
          }
        }
      }, 100);
    };
    return {
      orderform: {
        links: '',
        region: 3,
        speed: 3,
        num: '',
        totalPrice: '',
        myPrice: ''
      },
      rules: {
        links: [
          // { validator:checkLinks, trigger: 'blur' },
          { required: true, message: '微博链接不为空', trigger: 'blur' }
        ],
        num: [
          { validator: checkNum, trigger: 'blur' },
          // { required: true, message: '请输入数量', trigger: 'blur' },
          // { pattern:/^[1-9]\d*$/, message: '只能正整数'}
        ]
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      activeName: 'first'
    };
  },
  mounted() {

  },
  methods: {
    //查价格
    searchPrice(value) {
      this.$http.get(this.GLOBAL.https + "/platform/price/api", {
        params: {
          methods: "myPrice",
          secret: this.userKey,
          type: this.orderform.region
        }
      }).then((response) => {
        if (response.data.ok == 10000) {
          this.orderform.myPrice = response.data.data.price;
          this.focusNum()
        }
      }, (response) => {
        this.$message({
          showClose: true,
          message: '操作失败',
          type: 'error'
        });
      });
    },
    focusNum(value) {
      this.orderform.totalPrice = this.orderform.myPrice * this.orderform.num / 1000;
    },
    //下单
    createOrder(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.get(this.GLOBAL.https + "/platform/order/api", {
            params: {
              methods: "increaseOrder",
              secret: this.userKey,
              url: $.trim(this.orderform.links),
              task: this.orderform.num,
              speed: this.orderform.speed,
              type: this.orderform.region
            }
          }).then((response) => {
            if (response.data.ok == 10000) {
              this.captureDate()
              this.$message({
                showClose: true,
                message: '下单成功',
                type: 'success'
              });
              this.$refs[formName].resetFields();
            } else {
              this.$message({
                showClose: true,
                message: response.data.msg,
                type: 'error'
              });
            }
          }, (response) => {
            this.$message({
              showClose: true,
              message: '操作失败',
              type: 'error'
            });
          });
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};

</script>
<style>
.yw_menu {
  width: 240px;
  float: left;
}

.yw_cont {
  margin-left: 270px;
}
.el-form-item__content{
  text-align: left
}
</style>
