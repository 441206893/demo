<template>
  <el-dialog
    title="商品类目选择规格参数"
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="handleClose"
  >
    <!-- tree组件使用------------------- -->
    <ProductTree @getTreedata="getTreedata" />
    <!-- ---------------------------- -->
    <el-dialog
      width="50%"
      :title="title"
      :visible.sync="innerVisible"
      append-to-body
      :before-close="closeDailog"
    >
      <!-- 内表单 ----------------------->
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="140px"
        class="demo-dynamic"
      >
        <div>
          当前的商品为：{{ treeData.name }}
          <br />
          <el-button @click="addDomain">新增参数列表</el-button>
          <hr />
        </div>

        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :label="domain.title + index"
          :key="index"
          :props="domain.value"
        >
          <div class="item">
            <el-input v-model="domain.title"></el-input
            ><el-button @click.prevent="addCurrentDomain(index)"
              >增加子组</el-button
            >
            <el-button @click.prevent="removeDomain(index)">删除组</el-button>
          </div>
          <!-- 二级表单输入框 -->
          <el-form-item
            v-for="(item, idx) in domain.children"
            :label="item.title + idx"
            :key="idx"
            :props="item.value"
          >
            <div class="item">
              <el-input v-model="item.title"></el-input
              ><el-button @click.prevent="removeCurrentDomain(index, idx)"
                >删除</el-button
              >
            </div>
          </el-form-item>
        </el-form-item>

        <el-form-item style="margin-top: 20px; text-align: right">
          <el-button type="primary" @click="submitForm('dynamicValidateForm')"
            >确定</el-button
          >
          <el-button @click="closeDailog">取消</el-button>
        </el-form-item>
      </el-form>
      <!-- ------/内弹框表单--------------- -->
    </el-dialog>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        :disabled="isDisabled"
        @click="innerVisible = true"
        >确定并添加分组</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import ProductTree from "../Product/ProductTree";
export default {
  components: {
    ProductTree,
  },
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      isDisabled: true, //默认不可点击按钮
      treeData: {}, //tree数据
      rowDataId:'',//商品id
      dynamicValidateForm: {
        //表单数据
        domains: [
          //domains=[{value:'',children:[{},{}]},{value:''},...]
          //   {
          //     value: "",
          //     title: "机器规格",
          //     children: [
          //       {
          //         value: "",
          //         title: "产品尺寸（mm）",
          //       },
          //     ],
          //   }
        ],
      },
    };
  },
  props: ["rowData", "title"],
  watch: {
    rowData(val) {
      this.dynamicValidateForm.domains = JSON.parse(val.paramData);
      this.treeData = {
        name: val.specsName,
        cid: val.itemCatId
      };
      this.rowDataId=val.id
      console.log('------------',this.treeData);
    },
  },
  methods: {
    //获取tree点击的数据----
    getTreedata(val) {
      console.log("获取tree点击的数据----", val);
      this.treeData = val;
      //先点击了tree数据 再可以点击内弹框
      this.isDisabled = false;
    },
    //表单事件--------
    submitForm() {
      console.log("点击确定按钮", this.dynamicValidateForm);
      if (this.title == "商品参数添加列表") {
        //存储 数据库---- itemCatId类目cid  content表单信息-字符串 specsName 类目名称
        this.$api
          .insertItemParam({
            itemCatId: this.treeData.cid,
            specsName: this.treeData.name,
            content: JSON.stringify(this.dynamicValidateForm.domains),
          })
          .then((res) => {
            console.log("--------------", res);
            //隐藏弹框--2个---
            this.innerVisible = false;
            this.dialogVisible = false;
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: "添加规格参数-信息成功",
              });
              //更新数据
              this.$emit("updateView");
              //清空数据
              this.resetFormDailog();
            } else {
            }
          });
      } else {
        //修改信息------ 
        console.log(this.treeData,'-----------------');
        this.$api
          .updateCategory({
            id: this.rowDataId,
            cid: this.treeData.cid,
            specsName: this.treeData.name,
            content: JSON.stringify(this.dynamicValidateForm.domains),
          })
          .then((res) => {
            //隐藏弹框--2个---
            this.innerVisible = false;
            this.dialogVisible = false;
            console.log(res);
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: "修改规格参数-信息成功",
              });
              //更新数据
              this.$emit("updateView");
              //清空数据
              this.resetFormDailog();
            } else {
              this.$message({
                message: "修改失败",
              });
            }
          });
      }
    },
    //取消----
    closeDailog() {
      this.innerVisible = false;
      this.resetFormDailog();
    },
    //清空数据
    resetFormDailog() {
      this.dynamicValidateForm.domains = []; //置空
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //删除子组----
    removeCurrentDomain(index, idx) {
      this.dynamicValidateForm.domains[index].children.splice(idx, 1);
    },
    //删除大组----
    removeDomain(index) {
      //   var index = this.dynamicValidateForm.domains.indexOf(item);
      //   if (index !== -1) {
      this.dynamicValidateForm.domains.splice(index, 1);
      //   }
    },
    //添加子组-----
    addCurrentDomain(index) {
      this.dynamicValidateForm.domains[index].children.push({
        value: "",
        title: "",
      });
    },
    //添加商品组-----
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        title: "",
        children: [],
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style lang='less' scoped>
.item {
  display: flex;
  margin-top: 6px;
  button {
    margin-left: 10px;
  }
}
</style>