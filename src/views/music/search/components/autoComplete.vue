<template>
  <div style="width:100%;text-align: center;">
    <div class="autoComplete">
      <a-auto-complete
        class="certain-category-search"
        dropdown-class-name="certain-category-search-dropdown"
        :dropdown-match-select-width="false"
        :dropdown-style="{ width: '300px' }"
        size="large"
        :open="open"
        :defaultActiveFirstOption="false"
        style="width: 100%"
        placeholder="请输入关键词"
        option-label-prop="value"
        @blur="open = false"
        @focus="focus"
        @select="select"
        @search="handleSearch"
        @change="handleChange"
        v-model="keywords"
        ref="input"
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
        <a-input>
          <a-icon
            slot="suffix"
            @click="clickSearch"
            type="search"
            class="certain-category-icon"
          />
        </a-input>
      </a-auto-complete>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    dataSource: {
      type: Object,
      default() {
        return {
          order: []
        }
      }
    },
    activeKey: {
      type: String
    }
  },
  //props: ['dataSource', 'activeKey'],
  data() {
    return {
      keywords: '',
      filterSource: {},
      open: false
    }
  },

  components: {},

  computed: {},

  watch: {
    dataSource(val, oldVal) {
      if (val.order) {
        for (var i = 0; i < val.order.length; i++) {
          this.filterSource[val.order[i]] = this.reduceSearchSuggestions(
            val[val.order[i]]
          )
        }
      }
    }
  },

  beforeMount() {},

  mounted() {
    console.log('key', this.activeKey)
  },

  filters: {
    capitalize: function(value) {
      if (value == 'songs') {
        return '歌曲'
      } else if (value == 'artists') {
        return '歌手'
      } else if (value == 'albums') {
        return '专辑'
      } else {
        return '歌单'
      }
    }
  },
  methods: {
    handleSearch(value) {
      //this.$emit('searchSug', this.keywords)
    },
    focus() {
      if (this.keywords) {
        this.open = true
      }
    },
    select() {
      let obj = {
        keywords: this.keywords,
        type: this.activeKey,
        limit: '10'
      }
      this.open = false
      this.$emit('search')
    },
    reduceSearchSuggestions(suggestions) {
      const set = new Set()
      if (suggestions) {
      }
      return suggestions.reduce((cur, next) => {
        set.has(next.name) ? '' : set.add(next.name) && cur.push(next)
        return cur
      }, [])
    },
    handleChange(value) {
      this.$emit('searchSug', this.keywords)
      if (this.keywords) {
        this.open = true
      } else {
        this.open = false
      }
    },
    clickSearch() {
      let obj = {
        keywords: this.keywords,
        type: this.activeKey,
        limit: '10'
      }
      this.$emit('search')
      setTimeout(() => {
        this.open = false
      }, 100)
    }
  }
}
</script>
<style lang="less" scoped>
.autoComplete {
  width: 30%;
  margin: 0 auto;
}

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
