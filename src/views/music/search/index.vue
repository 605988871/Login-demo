<template>
  <div class="wrapper">
    <auto-complete
      ref="autoComplete"
      :dataSource="dataSource"
      :activeKey="activeKey"
      @searchSug="searchSug"
      @search="search"
      style="margin:20px 0"
    ></auto-complete>
    <div style="width:60%;margin:0 auto;">
      <a-tabs :active-key="activeKey" @change="handleChange">
        <a-tab-pane key="1" tab="单曲">
          <song-list
            :song-list="songList"
            :song-count="songCount"
            @search="search"
            ref="songList"
          ></song-list>
        </a-tab-pane>
        <a-tab-pane key="100" tab="歌手" force-render>
          Content of Tab Pane 2
        </a-tab-pane>
        <a-tab-pane key="1000" tab="歌单">
          Content of Tab Pane 3
        </a-tab-pane>
        <a-tab-pane key="10" tab="专辑">
          Content of Tab Pane 4
        </a-tab-pane>
        <a-tab-pane key="1004" tab="MV">
          Content of Tab Pane 5
        </a-tab-pane>
        <a-tab-pane key="1009" tab="电台">
          Content of Tab Pane 6
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { banner, search, searchSug } from '@/utils/cloudMusicApi'
import AutoComplete from './components/autoComplete.vue'
import SongList from './components/songList.vue'
export default {
  name: 'CloudMusicSearch',
  props: [''],
  data() {
    return {
      dataSource: {
        order: []
      },
      songList: [],
      artistList: [],
      songCount: 0,
      activeKey: '1',
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
    async handleChange(activeKey) {
      this.activeKey = activeKey
      if (this.$refs.autoComplete.keywords) {
        try {
          this.search()
        } catch (error) {}
      }
    },

    async search(pageChange) {
      if (pageChange != 'pageChange') {
        this.$refs.songList.resetPage()
      }
      let obj = {
        keywords: this.$refs.autoComplete.keywords,
        type: this.activeKey,
        limit: '10',
        offset: this.$refs.songList.page
      }
      try {
        if (this.activeKey == '1') {
          this.$refs.songList.showLoading()
        }
        const res = await search(obj)
        if (this.activeKey == '1') {
          this.formatSongList(res)
          this.$refs.songList.hideLoading()
        } else {
          this.artistList = res.result.artists
        }
      } catch (error) {}
    },

    formatSongList(res) {
      this.songList = []
      this.songCount = res.data.result.songCount
      if (res.data.result.songs) {
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
            time: item.dt,
            id: item.id
          }
          this.songList.push(song)
        })
      }
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
