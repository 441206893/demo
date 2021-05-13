<template>
  <el-tree :props="props" :load="loadNode" lazy @node-click="nodeClick">
  </el-tree>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
    };
  },
  methods: {
    //点击节点树--获取点击的元素----
    nodeClick(data, node) {
    //   console.log("点击----", data);
      this.$emit('getTreedata',data)
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api.selectItemCategory().then((res) => {
          return resolve(res.result);
        });
      }
      if (node.level >= 1) {
        this.$api
          .selectItemCategory({
            id: node.data.cid,
          })
          .then((res) => {
            if (res.status === 200) {
              return resolve(res.result);
            } else {
              return resolve([]);
            }
          });
      }
    },
  },
};
</script>

<style>
</style>