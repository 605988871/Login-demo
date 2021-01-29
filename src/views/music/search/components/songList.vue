<template>
  <div>
    <a-table :columns="columns" :data-source="data">
      <div slot="operation">
        <a-icon
          type="play-circle"
          style="fontSize:20px;margin:0 10px;color:rgb(215, 0, 15);cursor: pointer;
"
        />
        <a-icon
          type="plus-circle"
          style="fontSize:20px;color:rgb(215, 0, 15);cursor: pointer;
"
        />
      </div>

      <a slot="name" slot-scope="text">{{ text }}</a>
    </a-table>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['songList'],
  data() {
    return {
      columns: [
        {
          title: '',
          dataIndex: 'operation',
          key: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 100
        },
        {
          title: '歌曲标题',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '歌手',
          dataIndex: 'artist',
          key: 'artist'
        },
        {
          title: '专辑',
          dataIndex: 'album',
          key: 'album',
          ellipsis: true
        },
        {
          title: '热度',
          dataIndex: 'hot',
          key: 'hot',
          ellipsis: true
        },
        {
          title: '时长',
          dataIndex: 'time',
          key: 'time',
          ellipsis: true
        }
      ],
      data: []
    }
  },

  components: {},

  computed: {},

  watch: {
    songList(val, oldVal) {
      this.data = val
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {}
}
</script>
<style lang="less" scoped></style>
