<template>
  <div></div>
</template>

<script>
import APlayer from 'aplayer'
import axios from 'axios'
export default {
  name: 'aplayer',
  props: [''],
  data() {
    return {}
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
      const ap = new APlayer({
        container: document.getElementById('aplayer'),
        fixed: true,
        lrcType: 1,
        // mini: false,
        audio: [
          {
            name: '光るなら',
            artist: 'Goose House',
            url: await this.getSongUrl('光るなら'),
            lrc: await this.getSongLyric('光るなら'),
            cover:
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201504%2F25%2F20150425H2120_PtLQe.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612594686&t=daace713fef7674cab1fef143c148642'
          },
          {
            name: ' トリカゴ',
            artist: 'XX:me',
            url: await this.getSongUrl('トリカゴ'),
            lrc: await this.getSongLyric('トリカゴ'),
            cover:
              'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2684230618,3665831027&fm=26&gp=0.jpg'
          },
          {
            name: '夜に駆ける',
            artist: 'YOASOBI',
            url: await this.getSongUrl('夜に駆ける'),
            lrc: await this.getSongLyric('夜に駆ける'),
            cover:
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftx-free-imgs.acfun.cn%2Fo_1eedd5k9l16gi1e501jtss9mbfo0.jpeg%3Fimageslim&refer=http%3A%2F%2Ftx-free-imgs.acfun.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612666822&t=c5ff4ee5ad6d73ac4079d2c49e67a127'
          },
          {
            name: 'オレンジ',
            artist: '7!!',
            url: await this.getSongUrl('オレンジ'),
            lrc: await this.getSongLyric('オレンジ'),
            cover:
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201504%2F25%2F20150425H2120_PtLQe.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612594686&t=daace713fef7674cab1fef143c148642'
          }
        ]
      })
    },
    async getSongUrl(keywords) {
      const resSongId = await axios.get('/music/cloudsearch', {
        params: {
          keywords: keywords
        }
      })
      let songId = resSongId.data.result.songs[0].id
      // const resSongUrl = await axios.get('/music/song/url', {
      //   params: {
      //     id: songId
      //   }
      // })
      // return resSongUrl.data.data[0].url
      const url =
        'https://music.163.com/song/media/outer/url?id=' + songId + '.mp3'
      return url
    },
    async getSongLyric(keywords) {
      const resSongId = await axios.get('/music/cloudsearch', {
        params: {
          keywords: keywords
        }
      })
      let songId = resSongId.data.result.songs[0].id
      const resSongUrl = await axios.get('/music/lyric', {
        params: {
          id: songId
        }
      })
      return resSongUrl.data.lrc.lyric.toString()
    }
  }
}
</script>
<style lang="less" scoped></style>
