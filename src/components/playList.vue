<template>
  <div>
    <a-drawer
      title="播放列表"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <a-list item-layout="horizontal" :data-source="playList">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          >
            <a slot="name" href="https://www.antdv.com/">{{ item.name }}</a>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-list-item-meta>
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
      playList: [
        {
          picUrl: 'picUrl',
          name: 'xxx',
          artist: 'ljj'
        }
      ]
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
    },
    onClose() {
      this.visible = false
    }
  }
}
</script>
<style lang="less" scoped></style>
