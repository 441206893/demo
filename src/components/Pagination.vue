<template>
  <el-pagination
    background
    layout="total,prev, pager, next,jumper"
    @current-change="handleCurrentChange"
    :page-size="pageSize"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 10,
    },
  },
  methods:{
      handleCurrentChange(val){
          console.log(val);
          this.$emit('currentPage',val)
      }
  }
};
</script>

<style>
</style>