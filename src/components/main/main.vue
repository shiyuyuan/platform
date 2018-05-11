<template>
    <div id="mainApp">
        <cnode-head></cnode-head>
        <!-- <cnode-size></cnode-size> -->
        <router-view></router-view>
    </div>
</template>
<script>
import cnodeHead from '../cnodeHead';
import cnodeSize from '../cnodeSize';
export default {
    data() {
        return {
          name: ''
        };
    },
    components: {
    "cnode-head":cnodeHead,
    "cnode-size":cnodeSize
    },
    mounted(){

    },
    watch: {

    },
};
</script>

<style>
  .el-table th>.cell {
    font-weight: 500;
    
}
.secDiv{
    margin-top: 85px;
    margin-left: 40px;
}
/*.el-table {
    color: #697380;
}
.demo-form-inline{
  margin-top: 20px;
}
.mar_t3{
  margin-top: 30px;
}
.com_qq{
  position: absolute;
  left: 250px;
  top:22px;
  z-index: 9;
  display: inline;
  width: 94px;
    overflow: hidden;
}
.com_qq1{
  left: 350px;
}
.com_qq img{
   display: inline;
}
.el-breadcrumb__inner, .el-breadcrumb__inner a {
    font-weight: 500;
    color: #078a66
}
.el-message__closeBtn {
    top: 18px;
    right: 12px;
    font-size: 12px;
}
.el-button--success {
    background-color: #0db587;
    border-color: #0db587;
}
.el-button--success:hover, .el-button--success:focus {
    background: #23cc9d;
    border-color: #39caa2;
}*/
</style>
