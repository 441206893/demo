<template>
  <div class="params">
    <!-- 1.搜索框 -------------->

    <div class="search">
      <el-input
        v-model="input"
        @change="changeInput"
        placeholder="请输入内容"
      ></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="showParamsDialog">添加</el-button>
    </div>

    <!-- 2.表格数据 ------------------>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="规格参数ID" width="120">
      </el-table-column>
      <el-table-column prop="itemCatId" label="类目ID" width="120">
      </el-table-column>
      <el-table-column prop="specsName" label="规格名称" width="180">
      </el-table-column>
      <el-table-column prop="paramData" label="规格参数" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="180">
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

    <!-- 3.分页 ---------------->
    <div style="margin-top: 10px; text-align: center">
      <Pagination
        :pageSize="pageSize"
        :total="total"
        @currentPage="currentPage"
      />
    </div>
    <!-- 4.弹框----- -->
    <ParamsDialog
      ref="paramsDailog"
      :title="title"
      :rowData="rowData"
      @updateView="http(1)"
    />
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
import ParamsDialog from "./ParamsDialog";

export default {
  components: {
    Pagination,
    ParamsDialog,
  },
  data() {
    return {
      input: "", //搜索
      tableData: [], //表格数据
      total: 10,
      pageSize: 1,
      rowData: {}, //当前行的数据
      title: "商品参数列表",
    };
  },
  mounted() {
    this.http(1);
  },
  methods: {
    //搜索内容-----------------
    changeInput() {},
    //添加弹框-----
    showParamsDialog() {
      //显示弹框
      this.$refs.paramsDailog.dialogVisible = true;
      this.title = "商品参数添加列表";
    },
    //获取点击的分页----
    currentPage(val) {
      // console.log("============", val);
      this.http(val);
    },
    //编辑--按钮------  
    handleEdit(index, row) {
      console.log("-------编辑----", row);
      //显示弹框
      this.$refs.paramsDailog.dialogVisible = true;
      setTimeout(() => {
        this.$refs.paramsDailog.innerVisible = true;
      }, 0);
      //数据获取 传递给弹框子组件---
      this.rowData = Object.assign({}, row);
      this.title = "商品参数修改列表";
    },
    handleDelete(index, row) {
      console.log(index, row);
      //删除数据-----------------
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .paramsDelete({
              id: row.id,
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                //更新视图
                this.http(1)
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
    //网络请求------------------- 
    http(page) {
      this.$api.selectItemParamAll({ page }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.tableData = res.data;
          this.total = res.total;
          this.pageSize = 10;
        }
      });
    },
  },
};
</script>
<style scoped lang='less'>
.params {
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