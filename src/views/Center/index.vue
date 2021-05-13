<template>
  <div>
    <h2>个人中心</h2>
    <hr />
    <el-button @click='showPdf'>查看合同</el-button>

    <CenterPdf ref="mypdf" />

  </div>
</template>

<script>
import CenterPdf from "./CenterPdf";
export default {
  components: {
    CenterPdf,
  },
  methods:{
    showPdf(){
      this.$refs.mypdf.dialogVisible=true;
    }
  },
  mounted() {
    // this.$api.tokenList().then(res=>{
    //   console.log(res);
    // })
  },
};
</script>

<style>
</style>