<template>
  <div class='secDiv'>
    <!-- 面包屑开始 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path:'/homepage'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑结束 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="请输入账号(支持模糊查询)" style='width:300px'></el-input>
      </el-form-item>
      <el-select v-model="formInline.ftype" placeholder="请选择" @change="getPriceTable">
        <el-option label="急速普通" :value="3"></el-option>
        <el-option label="急速顶级" :value="4"></el-option>
        <el-option label="急速普通" :value="5"></el-option>
        <el-option label="急速高级" :value="6"></el-option>
        <el-option label="急速顶级" :value="7"></el-option>
      </el-select>
      <el-form-item>
        <el-button type="success" @click="query"><i class="fa fa-search"></i> 查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="序号" width="180" type="index">
      </el-table-column>
      <el-table-column prop="name" label="账号" width="180">
      </el-table-column>
      <el-table-column prop="address" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="date" label="当前价格(每千)">
      </el-table-column>
      <el-table-column prop="date" label="类型">
      </el-table-column>
      <el-table-column prop="date" label="更新时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
              <el-button type="success" @click="handleEdit(scope.row)"  size="small">冻结</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页begin-->
    <div class="block mar_t3">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
    <!-- 弹出页begin -->
    <el-dialog width="500px" center :visible.sync="dialogFormVisible" :show-close="false">
      <el-form :model="creatform" label-width="80px"  ref="creatform">
        <el-form-item label="账号" required>
          <el-input v-model="creatform.account" auto-complete="off" disabled class='priceinput'></el-input>
        </el-form-item>
        <el-form-item label="价格/千" required prop="price">
          <el-input v-model="creatform.price" class='priceinput'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="success" @click="editSubmit('creatform')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹出页end -->
  </div>
</template>
<script>
/*import {setCookie,getCookie} from '../../../static/js/cookie.js'
import{dateFtt} from '../../../static/js/base.js'*/
export default {
  data() {
    return {
      formInline: {
        user: '',
        ftype: 3
      },
      creatform: {
        account: "",
        price: "",
        startTime: "",
        endTime: ""
      },
      dialogFormVisible: false,
      tableData: [{
        name: 'XXX',
        address: '1816609163523',
        date: '2016-05-02',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: 'ert 1517 弄'
      }, {
        date: '2016-05-01',
        name: '1816609163523',
        address: '55 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    };
  },
  mounted() {

  },
  methods: {
      edithandleClick(row) {
        console.log(row);
      },
      query() {

      },
      getPriceTable() {

      },
      editSubmit() {

      },
      // 修改
      handleEdit(row) {
         this.dialogFormVisible = true;
         this.creatform.account =row.account;
         this.thisappkey = row.appkey;
         this.thisType = row.prod_id;
         this.creatform.price = row.price;
      },
  }

};

</script>
<style scoped>
.demo-form-inline {
  text-align: left;
}
</style>
