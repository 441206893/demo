<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    action="http://localhost:3000/api/upload"
    :file-list="fileList"
     :auto-upload="false"
     :on-success='uploadSuccess'
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
      //上传图片
    submitUpload() {
      this.$refs.upload.submit();
    },
    //上传图片后成功回调函数
    uploadSuccess(response){
      console.log(response);
      this.$emit('uploadImg',response.url)
    }

  },
};
</script>

<style>
</style>