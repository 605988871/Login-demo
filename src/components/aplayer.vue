<template>
  <div><div id="aplayer"></div></div>
</template>

<script>
import APlayer from 'aplayer'
import axios from 'axios'
import 'aplayer/dist/APlayer.min.css'
export default {
  name: 'aplayer',
  props: [''],
  data() {
    return {
      audio: []
    }
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  async mounted() {
    await this.createAplayer()
  },

  methods: {
    async createAplayer() {
      let songList = [
        '届かない恋',
        'オレンジ',
        '夜に駆ける',
        '群青',
        'トリカゴ',
        '光るなら',
        'たぶん'
      ]
      for (var i = 0; i < songList.length; i++) {
        this.audio.push(await this.getSongSearch(songList[i]))
      }
      const ap = new APlayer({
        container: document.getElementById('aplayer'),
        fixed: true,
        lrcType: 1,
        // mini: false,
        audio: this.audio
      })
    },
    async getSongSearch(keywords) {
      let songIdList = await this.searchSong(keywords)
      let songId = songIdList.data.result.songs[0].id
      let songUrl = await this.getSongUrl(songId)
      let lyric = await this.getSongLyric(songId)
      return {
        name: songIdList.data.result.songs[0].name,
        artist: songIdList.data.result.songs[0].ar[0].name,
        url: songUrl.data.data[0].url,
        lrc: lyric,
        cover: songIdList.data.result.songs[0].al.picUrl
      }
      // const url =
      //   'https://music.163.com/song/media/outer/url?id=' + songId + '.mp3'
      // return url
    },
    async searchSong(keywords) {
      try {
        const resSongIdList = await axios.get('/music/cloudsearch', {
          params: {
            keywords: keywords
          }
        })
        return resSongIdList
      } catch (err) {
        this.$message.error('请检查网络')
      }
    },
    async getSongUrl(songId) {
      try {
        const resSongUrl = await axios.get('/music/song/url', {
          params: {
            id: songId
          }
        })
        return resSongUrl
      } catch (err) {
        this.$message.error('请检查网络')
      }
    },
    async getSongLyric(songId) {
      try {
        const resSongLyric = await axios.get('/music/lyric', {
          params: {
            id: songId
          }
        })
        return resSongLyric.data.lrc.lyric.toString()
      } catch (err) {
        this.$message.error('请检查网络')
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
