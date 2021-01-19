<template>
  <div>
    <a-auto-complete
      class="certain-category-search"
      dropdown-class-name="certain-category-search-dropdown"
      :dropdown-match-select-width="false"
      :dropdown-style="{ width: '300px' }"
      size="large"
      :defaultActiveFirstOption="false"
      style="width: 100%"
      placeholder="input here"
      option-label-prop="value"
      @search="handleSearch"
      @change="handleChange"
    >
      <template slot="dataSource">
        <a-select-opt-group v-for="group in dataSource.order" :key="group">
          <span slot="label">
            {{ group | capitalize }}
          </span>
          <a-select-option
            v-for="opt in filterSource[group]"
            :key="opt.id"
            :value="opt.name"
          >
            {{ opt.name }}
            <!-- <span class="certain-search-item-count" v-if="opt.artists">
              {{ opt.artists[0].name }}
            </span>
            <span class="certain-search-item-count" v-if="opt.artist">
              {{ opt.artist.name }}
            </span> -->
          </a-select-option>
        </a-select-opt-group>
      </template>
      <a-input v-model="input">
        <a-icon slot="suffix" type="search" class="certain-category-icon" />
      </a-input>
    </a-auto-complete>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['dataSource'],
  data() {
    return {
      input: '',
      filterSource: {}
    }
  },

  components: {},

  computed: {},

  watch: {
    dataSource(val, oldVal) {
      if (val.songs) {
        this.filterSource['songs'] = this.reduceSearchSuggestions(val.songs)
      }
      if (val.artists) {
        this.filterSource['artists'] = this.reduceSearchSuggestions(val.artists)
      }
      if (val.albums) {
        this.filterSource['albums'] = this.reduceSearchSuggestions(val.albums)
      }
      if (val.playlists) {
        this.filterSource['playlists'] = this.reduceSearchSuggestions(
          val.playlists
        )
      }
    }
  },

  beforeMount() {},

  mounted() {},

  filters: {
    capitalize: function(value) {
      if (value == 'songs') {
        return '歌曲'
      } else if (value == 'artists') {
        return '歌手'
      } else {
        return '专辑'
      }
    }
  },
  methods: {
    handleSearch(value) {
      $('body').click()
    },
    reduceSearchSuggestions(suggestions) {
      const set = new Set()
      return suggestions.reduce((cur, next) => {
        set.has(next.name) ? '' : set.add(next.name) && cur.push(next)
        return cur
      }, [])
    },
    handleChange() {
      if (this.input) {
        this.$emit('searchSug')
      } else {
        this.filterSource
      }
    }
  }
}
</script>
<style lang="less" scoped>
.certain-category-search-dropdown .ant-select-dropdown-menu-item-group-title {
  color: #666;
  font-weight: bold;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item-group {
  border-bottom: 1px solid #f6f6f6;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item {
  padding-left: 16px;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item.show-all {
  text-align: center;
  cursor: default;
}

.certain-category-search-dropdown .ant-select-dropdown-menu {
  max-height: 300px;
}
</style>
<style scoped>
.certain-category-search-wrapper
  >>> .certain-category-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input-suffix {
  right: 12px;
}
.certain-category-search-wrapper >>> .certain-search-item-count {
  position: absolute;
  color: #999;
  right: 16px;
}
.certain-category-search-wrapper
  >>> .certain-category-search.ant-select-focused
  .certain-category-icon {
  color: #108ee9;
}
.certain-category-search-wrapper >>> .certain-category-icon {
  color: #6e6e6e;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-size: 16px;
}
</style>
