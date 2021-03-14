<template>
  <main class="main">
    <h2 class="title">{{ this.item.title }}</h2>
    <p class="publishedAt">投稿日：{{ new Date(this.item.updatedAt).toLocaleDateString('ja-JP', {timeZone: 'Asia/Tokyo'}) }}&nbsp;{{ new Date(this.item.updatedAt).toLocaleTimeString('ja-JP', {timeZone: 'Asia/Tokyo'}) }}</p>
    <p class="category">カテゴリー：{{ this.item.category && this.item.category.name }}</p>
    <div class="article-image col-md-8 offset-md-2">
      <img :src="`${this.item.ogpImage.url}`" class="card-img-top img-fluid">
    </div>
    <div class="post mt-3" v-html="this.item.body"></div>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  head() {
    return {
      title: this.item.title ,
      meta: [
        { hid: 'description', name: 'description', content: this.item.description },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: this.item.title },
        { hid: 'og:description', property: 'og:description', content: this.item.description },
        { hid: 'og:image', property: 'og:image', content: this.item.ogpImage.url},
        { hid: 'og:url', property: 'og:url', content: 'https://playlog-for-pjsekai.pgkuroneru.blog/'+ this.item.id + '/'},
      ],
    }
  },

  async asyncData({ params, $config }) {
    const { data } = await axios.get(
      `https://playlog-for-pjsekai.microcms.io/api/v1/blog/${params.slug}`,
      {
        headers: { 'X-API-KEY': $config.apiKey },
      },

    )
    return {
      item: data
    };
  }
}
</script>

<style>
</style>
