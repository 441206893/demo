<template>
  <div ref="wangEditor"></div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      editor: "", //初始化实例
    };
  },
  props:['desc'],
  //监听数据
  watch:{
    desc(val){
        this.editor.txt.html(val);
    }
  },
  mounted() {
    //创建实例
    this.editor = new E(this.$refs.wangEditor);
    // 配置 onchange 回调函数 用户操作（鼠标点击、键盘打字等）导致的内容变化之后，会自动触发 onchange 函数执行
    this.editor.config.onchange = val=> {
    //   console.log("change 之后最新的 html", val);
      this.$emit('getWangeditor',val)
    };
    // 默认情况下，显示所有菜单   
    this.editor.config.menus = [
      "head", //标题
      "bold", //加粗
      "fontSize", //字体大小
      "fontName", //字体种类
      //   "italic",
      //   "underline",
      //   "strikeThrough",
      //   "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "link",
      "list",
      "todo",
      "justify",
      "quote",
      "emoticon",
      "image",
      "video",
      "table",
      "code",
      "splitLine",
      "undo",
      "redo",
    ];
    //创建编译器
    this.editor.create();
    //获取数据
    //  this.editor.txt.html(this.desc);
  },
};
</script>

<style>
</style>