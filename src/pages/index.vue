<template>
  <q-page class="page">
    <GmapMap
      :center="{
        lat: -15,
        lng: -56
      }"
      :zoom="5"
      map-type-id="terrain"
      style="height:100vh; width:100%;"
    >
      <GmapMarker
        :key="index"
        v-for="(n, index) in news"
        :position="n.region"
        :clickable="true"
        :draggable="false"
        @click="center=n.region"
      />
    </GmapMap>
  </q-page>
</template>

<style>
</style>

<script>
import _ from 'lodash'
import axios from 'axios'

export default {
  name: 'PageIndex',
  data () {
    return {
      news: [],
      page: 1,
      intervalRequest: null
    }
  },
  async mounted () {
    this.intervalRequest = setInterval(this.loadNews, 2000)
  },
  methods: {
    async loadNews () {
      this.page = this.page + 1
      const rawNews = await axios.get(`https://news-by-region.now.sh/news?page=${this.page}`).then(r => r.data)
      if (_.isEmpty(rawNews)) {
        return clearInterval(this.intervalRequest)
      }
      this.news = _.union(this.news, rawNews.map(n => ({
        ...n,
        region: {
          lng: n.region[0],
          lat: n.region[1]
        }
      })))
    }
  }
}
</script>
