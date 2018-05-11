<template>
    <div class='secDiv'>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path:'/mainCom'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>全部订单</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>    
    </div>
</template>

<script>
/*import {setCookie,getCookie} from '../../../static/js/cookie.js'
import{dateFtt} from '../../../static/js/base.js'*/
export default {
    data() {
        return {
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
            }]
        };
    },
    mounted(){

    },
    methods:{

    }
};
</script>

<style >
  .marginy{
        margin-top: 0px;
    position: absolute;
    top: -1px;
    left: 48px;
  }
  .Success{
  color:#409EFF
  }
  .Blue{
  color:#67C23A
  }
  .Warning{
  color:#FA5555
  }
  .Danger{
  color:#878D99
  }
  .Info{
    color:#EB9E05
  }
  .el-table {
      color: #697380;
  }
  .mar_no{
    margin:0;
  }
  .mart_z1{
        margin-bottom: -10px;
  }
  .mart_z2{
        margin-top: -10px;
  }  
  /**/
  tbody{
     font-size: 14px;
  }
  tbody,.el-table__body-wrapper,.el-table__body, .el-table__header{
      font-size: 14px;
  }
  .el-table th {
    text-align: center;
}
  .el-table td, .el-table th {
      text-align: center;
  }
  .el-table .cell, .el-table th>div {
    padding-left: 2px;
    padding-right: 2px;
}
</style>