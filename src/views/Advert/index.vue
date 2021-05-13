<template>
  <div class="ad">
    <div class="ad-left">
      <AdvertTree @getTreeData="getTreeData" />
    </div>

    <div class="ad-content">
      <AdvertTable :treeData='treeData' />
    </div>
  </div>
</template>

<script>
import AdvertTable from "./AdvertTable";
import AdvertTree from "./AdvertTree";
export default {
  components: {
    AdvertTree,
    AdvertTable,
  },
  data() {
    return {
      treeData: {}, //tree数据
    };
  },
  methods: {
    getTreeData(val) {
      console.log("tree数据", val);
      this.treeData = val;//{name:'',pid:'',id:''}
    },
  },
};
</script>

<style lang='less' scoped>
.ad {
  display: flex;
  // overflow: hidden;
  .ad-left {
    padding-right: 20px;
  }
  // .ad-content {
  //   flex: 1;
  //   padding-right: 20px;
  // }
}
</style>