<template>
    <div class='secDiv'>
      <!-- 面包屑开始 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/homepage'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>菜单配置</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 面包屑结束 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.user" placeholder="请输入账号(支持模糊查询)" style='width:300px'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success"  @click="queryMenu"><i class="fa fa-search"></i>  查询</el-button>
           <el-button type="success" @click="dialogFormVisible = true">添加新菜单</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
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
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="edithandleClick(scope.row)" type="text" size="small">修改</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>  
      <!--分页begin-->
      <div class="block mar_t3">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>  
      <!-- 弹出页begin -->
      <el-dialog  width="500px" :visible.sync="dialogFormVisible" :show-close="false" >
        <el-form :model="creatform" label-width="80px"  ref="creatform" status-icon>
          <el-form-item label="菜单" required prop="account">
            <el-input v-model="creatform.account" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="路径" required prop="path">
            <el-input v-model="creatform.path"></el-input>
          </el-form-item>
          <el-form-item label="所属" required prop="path">
            <el-input v-model="creatform.path"></el-input>
          </el-form-item>          
          <el-form-item label="等级" required prop="authority">
            <el-select v-model="creatform.authority" placeholder="" style="float: left">
              <el-option label="高级代理" value="3"></el-option>
              <el-option label="VIP代理" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="success" @click="createMenus('creatform')">确 定</el-button>
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
              user: ''
            },
          creatform:{
            account:"",
            path:"",
            authority:"4",
          },
          dialogFormVisible:false,
            tableData: [{
              date: '2016-05-02',
              name: '王小虎',
              address: '234 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: 'ert 1517 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '55 1519 弄'
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
      edithandleClick(row) {
        console.log(row);
      },
      queryMenu(){

      },
        // 新增菜单
      createMenus(formName){
        
      },
    }
};
</script>

<style >
.demo-form-inline {
    text-align: left;
}
/**/
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