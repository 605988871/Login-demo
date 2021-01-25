<template>
  <div class="wrapper">
    <auto-complete
      ref="autoComplete"
      :dataSource="dataSource"
      @searchSug="searchSug"
      @search="search"
      style="margin:20px 0"
    ></auto-complete>
    <div style="width:60%;margin:0 auto;">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="单曲">
          Content of Tab Pane 1
        </a-tab-pane>
        <a-tab-pane key="2" tab="歌手" force-render>
          Content of Tab Pane 2
        </a-tab-pane>
        <a-tab-pane key="3" tab="歌单">
          Content of Tab Pane 3
        </a-tab-pane>
        <a-tab-pane key="4" tab="专辑">
          Content of Tab Pane 4
        </a-tab-pane>
        <a-tab-pane key="5" tab="MV">
          Content of Tab Pane 5
        </a-tab-pane>
        <a-tab-pane key="6" tab="电台">
          Content of Tab Pane 6
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { banner, search, searchSug } from '../../utils/cloudMusicApi'
import AutoComplete from '../../components/autoComplete.vue'
export default {
  name: '',
  props: [''],
  data() {
    return {
      dataSource: {
        order: []
      },
      activeName: 'first'
    }
  },

  components: {
    AutoComplete
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    handleClick() {},

    async search(obj) {
      const res = await search(obj)
      console.log(res)
    },
    async searchSug(keywords) {
      let obj = {
        keywords: keywords
      }
      try {
        let dataSource = await searchSug(obj)
        this.dataSource = dataSource.data.result
      } catch (error) {}
    }
  }
}
</script>
<style lang="less"></style>
