<template>
  <div class="product">
    <!-- 1.搜索框 -------------------->
    <div class="search">
      <el-input
        v-model="input"
        @change="changeInput"
        placeholder="请输入内容"
      ></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="showProductDialog">添加</el-button>
    </div>

    <!-- 2.表格数据 ------------------->
    <el-table :data="tableData" ref="multipleTable" @select="selectionChange">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="商品ID" width="100"> </el-table-column>
      <el-table-column
        prop="title"
        show-overflow-tooltip
        label="商品名称"
        width="120"
      >
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="100">
      </el-table-column>
      <el-table-column prop="num" label="商品数量" width="100">
      </el-table-column>
      <el-table-column prop="category" label="规格类目" width="100">
      </el-table-column>
      <el-table-column
        prop="image"
        show-overflow-tooltip
        label="商品图片"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="sellPoint"
        show-overflow-tooltip
        label="商品卖点"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="descs" show-overflow-tooltip label="商品描述">
      </el-table-column>
      <el-table-column label="商品操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- ------------取消选择 -------------->
    <div style="margin-top: 20px">
      <el-button @click="deleteSelection()">批量删除</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>

    <!-- 3.分页 ----------------------->
    <div class="pagination">
      <Pagination
        :total="total"
        :pageSize="pageSize"
        @currentPage="currentPage"
      />
    </div>
    <!-- 4.弹框-------- -->
    <ProductDialog
      :title="title"
      :rowData="rowData"
      ref="dialog"
      @updateProduct="productList(1)"
    />
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
import ProductDialog from "./ProductDialog";
export default {
  components: {
    Pagination,
    ProductDialog,
  },
  data() {
    return {
      tableData: [], //商品容器列表
      total: 10, //总个数
      pageSize: 1, //每页显示的个数
      input: "", //搜索内容
      title: "添加商品", //弹框标题
      rowData: {}, //行的数据对象
      selection: [],
    };
  },
  mounted() {
    this.productList(1);
  },
  methods: {
    //选择切换----
    selectionChange(selection, row) {
      // console.log('==========',selection);
      this.selection = selection;
    },
    //取消选择
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    //批量删除-----
    deleteSelection() {
      let selection = this.selection;
      let arr = [];
      for (let i = 0; i < selection.length; i++) {
        arr.push(selection[i].id);
      }
      console.log("批量删除", arr);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //删除操作-----
          this.$api
            .batchDelete({
              idArr: arr,
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                //更新视图
                this.productList(1);
              }else{
                 this.$message({
                  message: "删除失败!",
                });
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
    /**
     * 编辑商品信息
     */
    handleEdit(index, row) {
      console.log("---编辑------", index, row);
      //显示弹框
      this.$refs.dialog.dialogVisible = true;
      this.title = "编辑商品";
      //传递当前行的数据 row对象
      // this.rowData = row;
      //问题：多次点击 同一个编辑按钮---数据监听不执行 数据没有修改---
      this.rowData = Object.assign({}, row);
    },
    /**
     * 删除当前行数据
     */
    handleDelete(index, row) {
      console.log("------------", index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.deleteItemById({ id: row.id }).then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              //更新视图
              this.productList(1);
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
    /**
     * 点击分页--- 获取页码---
     */
    currentPage(num) {
      this.productList(num);
    },
    /**
     * 搜索查询商品信息
     */
    changeInput(search) {
      console.log("搜索信息", search);
      if (search) {
        this.$api
          .searchUrl({
            search,
          })
          .then((res) => {
            console.log("搜索数据----", res);
            if (res.status === 200) {
              this.tableData = res.result;
              this.total = res.result.length;
              this.pageSize = 8;
            } else {
              // console.log("查无数据");
              this.tableData = [];
              this.total = 1;
              this.pageSize = 8;
            }
          });
      } else {
        this.productList(1);
      }
    },
    /**
     * 点击添加--显示弹框
     */
    showProductDialog() {
      this.$refs.dialog.dialogVisible = true;
      this.title = "添加商品";
    },
    /**
     * 请求数据更新
     */
    productList(page) {
      this.$api
        .productList({
          page,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.tableData = res.data; //列表数据
            this.total = res.total;
            this.pageSize = res.pageSize;
          }
        });
    },
  },
};
</script>

<style scoped lang='less'>
.product {
  padding: 10px;
  .search {
    display: flex;
    button {
      margin-left: 10px;
    }
  }
  .pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>