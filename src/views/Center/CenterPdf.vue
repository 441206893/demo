<template>
  <el-dialog title="查看pdf内容" :visible.sync="dialogVisible" width="70%">
      <el-button type='primary' @click='printPdf'>打印合同</el-button>
    <!-- 1.默认显示pdf  第一页 -->
    <!-- <pdf src='./sxt.pdf'></pdf> -->
    <!-- 2.显示所有的页码 -->
    <!-- <pdf
			v-for="i in numPages"
			:key="i"
			:src="src"
			:page="i"
			style="display: inline-block; width: 25%"
		></pdf> -->
    <!-- 3.显示pdf内容--加分页 -->
    <pdf :src='src' :page='indexPage' ref='pdf'></pdf>

    <!-- 分页 -->
    <Pagination :total='numPages' :pageSize='1' @currentPage='currentPage'/>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import pdf from "vue-pdf";
import Pagination from '../../components/Pagination';
var loadingTask=pdf.createLoadingTask('./sxt.pdf')
export default {
  components: {
    pdf,
    Pagination
  },
  data() {
    return {
      dialogVisible: false,
      src:loadingTask,//pdf的地址路径
      numPages:undefined,//总页码
      indexPage:1,//显示第几页
    };
  },
  methods:{
      //点击分页--获取页码---切换pdf
      currentPage(val){
          //点击的页码---显示对应的pdf的页码
        this.indexPage=val;
      },
      //点击打印pdf
      printPdf(){
          this.$refs.pdf.print();
      }
  },
  mounted() {
      //获取pdf的总页码----  
		this.src.promise.then(pdf => {
			this.numPages = pdf.numPages;
		});
	}
};
</script>

<style>
</style>