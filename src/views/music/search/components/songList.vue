<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="data"
      :loading="loading"
      :pagination="false"
    >
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
      <div slot="hot" slot-scope="text, record">
        <a-progress
          :percent="text"
          :show-info="false"
          status="active"
          strokeColor="red"
        />
      </div>
      <div slot="time" slot-scope="text, record">
        {{ formatDuring(text) }}
      </div>
    </a-table>
    <a-pagination
      style="margin-top:20px"
      :current="page"
      :total="200"
      @change="changePage"
      v-if="songCount > 10"
    />
  </div>
</template>

<script>
export default {
  name: '',
  props: ['songList', 'songCount'],
  data() {
    return {
      loading: false,
      page: 1,
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
          key: 'name'
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
          scopedSlots: { customRender: 'hot' },
          width: 100,
          ellipsis: true
        },
        {
          title: '时长',
          dataIndex: 'time',
          key: 'time',
          scopedSlots: { customRender: 'time' },
          width: 120,
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

  methods: {
    formatDuring(mss) {
      var days = parseInt(mss / (1000 * 60 * 60 * 24))
      var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
      var seconds = this.fix(parseInt((mss % (1000 * 60)) / 1000), 2)
      if (hours != 0) {
        return hours + ' : ' + minutes + ' : ' + seconds
      } else {
        return minutes + ' : ' + seconds
      }
    },
    fix(num, length) {
      return ('' + num).length < length
        ? (new Array(length + 1).join('0') + num).slice(-length)
        : '' + num
    },
    showLoading() {
      this.loading = true
    },
    hideLoading() {
      this.loading = false
    },
    changePage(page, pageSize) {
      this.page = page
      this.$emit('search', 'pageChange')
    },
    resetPage() {
      this.page = 1
    }
  }
}
</script>
<style lang="less" scoped></style>
