<template>
    <div class='secDiv'>
      <!-- 面包屑开始 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/homepage'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>公告管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 面包屑结束 -->
     <el-form  class="demo-form-inline">   
        <el-form-item>
          <el-button type="success"  @click="addNotice"> <i class="fa fa-plus"></i>  增加公告</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="序号"
            width="180" type="index">
          </el-table-column>
          <el-table-column
            prop="name"
            label="创建人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="通告内容"
            width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="创建时间">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
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
          <el-form-item label="内容" required prop="content">
            <el-input type="textarea" v-model="creatform.content"></el-input>
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
            content:"",
          },
          dialogFormVisible:false,
            tableData: [{
              name: 'XXX',
              address: '[重要提醒]部分频繁订单系统自动退单，为保证服务器正常运行，请勿频繁下单！',
              date: '2016-05-02',
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
      addNotice(){
        this.dialogFormVisible = true;
      }
    }
};
</script>

<style scoped>
.demo-form-inline{
  text-align: left;
}
</style>