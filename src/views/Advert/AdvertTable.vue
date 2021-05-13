<template>
  <div>
    <div class="header-btn">
      <el-button @click="addAdvertConent"
        >{{ treeData.name }}广告内容</el-button
      >
    </div>
    <el-table
      :data="tableData"
      border
      :header-cell-style="{
        background: '#eee',
        fontFamily: 'Helvetica',
        fontSize: '14px',
      }"
    >
      <el-table-column prop="pid" label="PID" width="180"> </el-table-column>
      <el-table-column prop="name" label="名称" width="220"> </el-table-column>
      <el-table-column
        prop="url"
        show-overflow-tooltip
        label="访问地址"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="image" show-overflow-tooltip label="图片地址">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- --------弹框-------------------------- -->
    <el-dialog
      title="广告内容信息添加"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div>位置：{{ treeData.name }}</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="图片名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="广告网址" prop="url">
          <el-input v-model="ruleForm.url"></el-input>
        </el-form-item>
        <el-form-item label="图片网址" prop="image">
          <el-input v-model="ruleForm.image"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAdvert">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [], //广告内容
      ruleForm: {
        name: "", //
        url: "",
        image: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        url: [{ required: true, message: "请输入地址网址", trigger: "blur" }],
        image: [{ required: true, message: "请输入图片网址", trigger: "blur" }],
      },
    };
  },
  props: ["treeData"],
  watch: {
    treeData(val) {
      //监听---点击了tree 获取当前tree对应的广告内容---
      this.$api
        .selectTbContentAllByCategoryId({
          pid: val.pid,
        })
        .then((res) => {
          console.log("------", res);
          if (res.status === 200) {
            this.tableData = res.result;
          } else {
            this.tableData = [];
          }
        });
    },
  },
  methods: {
    addAdvertConent() {
      console.log("新增内容广告");
      this.dialogVisible = true;
    },
    //确定新增广告---
    addAdvert() {
      console.log(this.ruleForm);
      let { image, url, name } = this.ruleForm;
      //pid image url name
      this.$api
        .insertTbContent({
          pid: this.treeData.pid,
          image,
          url,
          name,
        })
        .then((res) => {
          console.log("------", res);
          //隐藏弹框
          this.dialogVisible = false;
          //提示信息
          if (res.status === 200) {
            this.$message({
              message: "成功添加广告",
              type: "success",
            });
            //视图更新
            this.$api
              .selectTbContentAllByCategoryId({
                pid: this.treeData.pid,
              })
              .then((res) => {
                console.log("------", res);
                if (res.status === 200) {
                  this.tableData = res.result;
                } else {
                  this.tableData = [];
                }
              });
          }
        });
    },
  },
};
</script>

<style scoped lang='less'>
.header-btn {
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: center;
}
</style>