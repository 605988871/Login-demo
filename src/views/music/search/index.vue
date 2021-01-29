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
          <song-list :song-list="songList"></song-list>
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
import { banner, search, searchSug } from '@/utils/cloudMusicApi'
import AutoComplete from '@/components/autoComplete.vue'
import SongList from './components/songList.vue'
export default {
  name: '',
  props: [''],
  data() {
    return {
      dataSource: {
        order: []
      },
      songList: [],
      activeName: 'first'
    }
  },

  components: {
    AutoComplete,
    SongList
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    handleClick() {},

    async search(keywords) {
      let obj = {
        keywords: keywords
      }
      const res = await search(obj)
      this.songList = []
      let songListBefore = res.data.result.songs
      songListBefore.forEach((item, index) => {
        let artistList = item.ar
        let artists = ''
        for (var i = 0; i < artistList.length; i++) {
          artists =
            i == artistList.length - 1
              ? artists + artistList[i].name
              : artists + artistList[i].name + '/'
        }
        let song = {
          key: index,
          name: item.name,
          artist: artists,
          album: item.al.name,
          hot: item.pop,
          time: item.dt
        }
        this.songList.push(song)
      })
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
