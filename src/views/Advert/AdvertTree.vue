<template>
  <div>
    <el-tree
      :data="data"
      :props="props"
      lazy
      :load="loadNode"
      :expand-on-click-node="false"
      :render-content="renderContent"
      :indent="indent"
      @node-click="handleNodeClick"
    >
    </el-tree>
    <!-- 弹框 ------>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <div>当前的广告属于：{{ adInfo.adInfoName }}</div>
      <el-input v-model="inpValue"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="addAdvert">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [], //空数据
      dialogVisible: false, //弹框
      title: "", //弹框名称
      adInfo: {}, //广告信息
      inpValue: "", //广告子名称
      indent: 30, //间距
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
    };
  },

  methods: {
    handleNodeClick(data) {
        this.$emit('getTreeData',data)
    },
    //lazy加载动态tree-------------
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api.getAdvertList().then((res) => {
          console.log(res);
          if (res.status === 200) {
            return resolve(res.result);
          }
        });
      }
      if (node.level >= 1) {
        console.log(node);
        this.$api.getAdvertList({ id: node.data.pid }).then((res) => {
          console.log(res);
          if (res.status === 200) {
            return resolve(res.result);
          } else {
            return resolve([]);
          }
        });
      }
    },
    //追加-------------------------------
    append(data, type) {
      console.log("增加-------", data);
      if (type === "add") {
        this.title = "添加广告";
      } else {
        this.title = "修改广告";
        this.inpValue = data.name;
      }
      //显示弹框
      this.dialogVisible = true;
      //广告的名称
      this.adInfo.adInfoName = data.name;
      this.adInfo.pid = data.pid;
    },
    //取消--关闭弹框--
    closeDialog() {
      //关闭弹框-------
      this.dialogVisible = false;
      //清空输入框------
      this.inpValue = "";
    },
    //添加广告信息--------------------------
    addAdvert() {
      console.log(this.inpValue);
      //弹框隐藏
      this.dialogVisible = false;
      //添加后台---
      if (this.title === "添加广告") {
        this.$api
          .insertContentCategory({
            pid: this.adInfo.pid,
            name: this.inpValue,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              const h = this.$createElement;
              this.$notify({
                title: "添加广告成功",
                message: h(
                  "i",
                  { style: "color: teal" },
                  "这是示文案这是提示文案这是文案"
                ),
              });
              //更新数据---
              this.updateAdvert();
            }
          });
      } else {
        this.$api
          .updateContentCategory({
            pid: this.adInfo.pid,
            name: this.inpValue,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              const h = this.$createElement;
              this.$notify({
                title: "修改广告成功",
                message: h(
                  "i",
                  { style: "color: teal" },
                  "这是示文案这是提示文案这是文案"
                ),
              });
              //更新数据---
              this.updateAdvert();
            }
          });
      }
    },
    //更细数据=-----------------------------
    updateAdvert() {
      this.$api.getAdvertList().then((res) => {
        console.log(res);
        if (res.status === 200) {
          //   this.props = res.result;
          this.data = res.result;
        }
      });
    },
    //删除---- -----------------------------
    remove(node, data) {
      console.log("删除--------", node, data);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .deleteContentCategoryById({
              pid: data.pid,
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功",
                });
                this.updateAdvert();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //绘制动态的tree结构--------------------
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data, "add")}
            >
              增加
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data, "update")}
            >
              修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },
  },
};
</script>

<style scoped lang='less'>
/deep/.el-tree-node:focus > .el-tree-node__content {
  background-color: #eee;
}
/deep/.el-tree-node__content {
  height: 40px;
  overflow-y: auto;
  /deep/.custom-tree-node {
    width: 100%;
    .custom-tree-icon {
      float: right;
      margin-left: 10px;
      .addIcon {
        font-size: 20px;
        margin-right: 10px;
      }
      .icon-add {
        color: #409eff;
      }
      .icon-xiugai {
        color: #939da7;
      }
      .icon-shanchu {
        color: #ed5656;
      }
    }
  }
}
</style>