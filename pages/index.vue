<template>
  <main class="main">
    <h2 class="title">記事一覧</h2>
    <div class="articles row mt-3">
      <div class="card mr-2" style="width: 30%;" v-for="content in contents" :key="content.id">
        <nuxt-link :to="`/${content.id}`" class="card-link">
          <img :src="`${content.ogpImage.url}`" class="card-img-top img-fluid" alt="...">
          <div class="card-body">
            <h3 class="card-title" style="font-size: 1.25em;">{{ content.title }}</h3>
            <p class="card-subtitle mb-2 text-muted">
              カテゴリ－：{{ content.category.name }}
            </p>
            <p class="card-subtitle mb-2 text-muted">投稿日：{{ new Date(content.publishedAt).toLocaleDateString('ja-JP', {timeZone: 'Asia/Tokyo'}) }}</p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  head() {
    return {
      title: '',
      titleTemplate: 'pgkuroneru blog'
    }
  },

  async asyncData({ $config }) {
    const { data } = await axios.get(
      `https://playlog-for-pjsekai.microcms.io/api/v1/blog`,
      {
        headers: { 'X-API-KEY': $config.apiKey }
      }
    )
    return data
  }
}
</script>

<style>
</style>
