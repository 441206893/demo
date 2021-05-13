<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="70%"
    :before-close="closeForm"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="类目选择" prop="category">
        <el-button type="primary" @click="innerVisible = true"
          >选择类目</el-button
        >
        {{ ruleForm.category }}
      </el-form-item>
      <el-form-item label="商品名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="num">
        <el-input v-model="ruleForm.num"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点" prop="sellPoint">
        <el-input v-model="ruleForm.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="image">
        <el-button type="primary" @click="imgInnerVisible = true"
          >上传图片</el-button
        >
        <img :src="ruleForm.image" style="width: 300px" alt="" />
      </el-form-item>
      <el-form-item label="商品描述" prop="desc">
        <ProductWangEditor
          :desc="ruleForm.desc"
          ref="wangEditor"
          @getWangeditor="getWangeditor"
        />
      </el-form-item>
      <!-- 类目规格参数列表--------- -->
      <template v-if="productCategory.length > 0">
        <el-form-item label="规格参数类目">
          <el-form-item
            v-for="(domain, index) in productCategory"
            :label="domain.title + index"
            :key="index"
            :props="domain.value"
          >
            <div class="item">
              <el-input v-model="domain.value"></el-input
              >
            </div>
            <!-- 二级表单输入框 -->
            <el-form-item
              v-for="(item, idx) in domain.children"
              :label="item.title + idx"
              :key="idx"
              :props="item.value"
            >
              <div class="item">
                <el-input v-model="item.value"></el-input
                >
              </div>
            </el-form-item>
          </el-form-item>
        </el-form-item>
      </template>
    </el-form>

    <!-- 类目选择--内弹框--- ---------------->
    <el-dialog
      width="50%"
      title="选择类目"
      :visible.sync="innerVisible"
      append-to-body
    >
      <!-- tree树形结构 -->
      <ProductTree @getTreedata="getTreedata" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="showTreeData">确 定</el-button>
      </span>
    </el-dialog>
    <!-- ----------------- -->

    <!-- 上传图片 内弹框-------------------->
    <el-dialog
      width="40%"
      title="上传图片"
      :visible.sync="imgInnerVisible"
      append-to-body
    >
      <ProductUpload ref="imgUpload" @uploadImg="uploadImg" />

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="imgInnerVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- /上传图片 =------------------------>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeForm">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import ProductTree from "./ProductTree";
import ProductUpload from "./ProductUpload";
import ProductWangEditor from "./ProductWangEditor";
export default {
  components: {
    ProductTree,
    ProductUpload,
    ProductWangEditor,
  },
  data() {
    return {
      dialogVisible: false, //外弹框
      innerVisible: false, //类目-内弹框--
      imgInnerVisible: false, //上传图片图片弹框
      productCategory: [], //类目的规格参数列表数组
      treeData1: {}, //tree数据
      // treeData: {}, //tree数据
      // image: "", //图片路径
      ruleForm: {
        title: "",
        num: "",
        price: "",
        sellPoint: "",
        image: "", //图片
        // treeData: {}, //tree数据
        cid: "", //类目cid
        category: "", //类目名称
        desc: "", //商品描述
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "输入价格", trigger: "blur" }],
        num: [{ required: true, message: "输入商品数量", trigger: "blur" }],
      },
    };
  },
  props: ["title", "rowData"],
  //监听这个变量是否有变化---
  watch: {
    rowData(val) {
      console.log("修改了-----", val);
      //延迟执行 this.$nextTick()
      this.$nextTick(() => {
        this.ruleForm = val;
        //获取编辑数据---
        this.ruleForm.desc = val.descs;
        
      });
      if(val.paramsInfo){
        //获取类目规格参数
        this.productCategory=JSON.parse(val.paramsInfo)
      }
      //操作编译器--- 获取不到editor实例 执行顺序问题
      // this.$refs.wangEditor.editor.txt.html(val.descs);
      //把获取的富文本的数据--传递给子组件 wangeditor让他自己修改
    },
  },

  methods: {
    handleClose() {},
    /**
     * 点击tree获取数据----
     */
    getTreedata(val) {
      console.log(val);
      this.treeData1 = val;
    },
    /**
     * 点击弹框确定获取tree数据
     */
    showTreeData() {
      this.innerVisible = false;
      // this.ruleForm.treeData = this.treeData1;
      this.ruleForm.cid = this.treeData1.cid;
      this.ruleForm.category = this.treeData1.name;
      //请求规格参数--- ---
      this.$api
        .getCategoryParams({
          cid: this.treeData1.cid,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log(res.result[0].paramData);
            this.productCategory = JSON.parse(res.result[0].paramData);
          }
        });
    },
    /**
     * 图片回显
     */
    uploadImg(imgUrl) {
      // console.log("-------", imgUrl);
      let url = "http://localhost:3000/" + imgUrl.slice(7);
      // console.log(url);
      this.ruleForm.image = url;
    },
    /**
     * wang编译器数据
     */
    getWangeditor(val) {
      // console.log("wang编译器数据", val);
      this.ruleForm.desc = val;
    },
    /**
     * 取消
     */
    closeForm() {
      this.dialogVisible = false;
      this.resetForm();
    },
    /**
     * 确定提交表单数据---
     */
    submitForm(formName) {
      //修改功能
      if (this.title == "编辑商品") {
        console.log("=======================");
        //添加功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //title cid  category sellPoint price num desc paramsInfo image
            let {
              title,
              price,
              num,
              desc,
              sellPoint,
              image,
              cid,
              category,
              id,
            } = this.ruleForm;
            this.$api
              .updateTbItem({
                title,
                price,
                num,
                desc,
                sellPoint,
                image,
                cid,
                category,
                id,
                 paramsInfo:JSON.stringify(this.productCategory)
              })
              .then((res) => {
                console.log(res);
                //弹框隐藏-----
                this.dialogVisible = false; //隐藏
                if (res.status === 200) {
                  this.$message({
                    message: "恭喜你，修改商品成功",
                    type: "success",
                  });
                  //更新视图------
                  this.$emit("updateProduct");
                  //清空表单
                  this.resetForm();
                } else {
                  this.$message.error("错了哦，修改商品失败");
                }
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        //添加功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("获取数据:", this.ruleForm,this.productCategory);
            //title cid  category sellPoint price num desc paramsInfo image
            let {
              title,
              price,
              num,
              desc,
              sellPoint,
              image,
              cid,
              category,
            } = this.ruleForm;
            this.$api
              .insertProduct({
                title,
                price,
                num,
                desc,
                sellPoint,
                image,
                cid,
                category,
                paramsInfo:JSON.stringify(this.productCategory)
              })
              .then((res) => {
                console.log(res);
                //弹框隐藏-----
                this.dialogVisible = false; //隐藏
                if (res.status === 200) {
                  this.$message({
                    message: "恭喜你，新增数据商品成功",
                    type: "success",
                  });
                  //更新视图------
                  this.$emit("updateProduct");
                  //清空表单
                  this.resetForm();
                } else {
                  this.$message.error("错了哦，添加商品失败");
                }
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    /**
     * 清空表单数据
     */
    resetForm() {
      console.log("---------清空操作------ ");
      //注意点：1.清空数据 prop 2.数据再挂载之前必须修改 mounted
      this.$refs.ruleForm.resetFields();

      //wangeditor数据
      this.$refs.wangEditor.editor.txt.clear();
      //清空类目--- 
      this.productCategory=[];//清空
      //图片清空
      if (this.$refs.imgUpload) {
        this.$refs.imgUpload.fileList = [];
      }
      //清空数据---初始化
      // this.ruleForm={
      //   title: "",
      //   num: "",
      //   price: "",
      //   sellPoint: "",
      //   image: "", //图片
      //   treeData: "", //tree数据
      //   desc: "", //商品描述
      // }
    },
  },
};
</script>

<style>
</style>