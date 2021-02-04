<template>
  <div>
    <a-drawer
      title="播放列表"
      placement="right"
      width="30%"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <a-icon
        type="delete"
        style="float: right;font-Size:30px"
        @click="clearPlayList"
      />
      <a-list
        item-layout="horizontal"
        :data-source="playList"
        style="margin-top:30px"
      >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta :description="item.artist">
            <a slot="title" href="https://www.antdv.com/">{{ item.name }}</a>
            <a-avatar slot="avatar" :src="item.picUrl" :size="56" />
          </a-list-item-meta>
          <div style="color:#409EFF;font-Size:16px">
            <a-icon type="caret-right" />
            <a-divider type="vertical" />
            <a-icon type="delete" />
          </div>
        </a-list-item>
      </a-list>
    </a-drawer>
  </div>
</template>

<script>
import Bus from '@/utils/eventBus'
export default {
  name: 'playList',
  props: [''],
  data() {
    return {
      visible: false,
      playList: []
    }
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    Bus.$on('show', () => {
      this.showDrawer()
    })
  },

  methods: {
    afterVisibleChange(val) {
      console.log('visible', val)
    },
    showDrawer() {
      this.visible = true
      this.playList = this.$store.state.playList
      console.log(this.playList)
    },
    onClose() {
      this.visible = false
    },
    clearPlayList() {
      this.$store.commit('clearPlayList')
      this.playList = this.$store.state.playList
      this.$message.success('清空列表成功', 1)
    }
  }
}
</script>
<style lang="less" scoped></style>
