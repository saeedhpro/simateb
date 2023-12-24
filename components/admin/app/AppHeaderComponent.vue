<template>
  <v-row>
    <v-col align-self="center">
      <div class="page-header-box admin">
        <nuxt-link to="/admin/app" class="page-header">
          <img src="/images/pages/app.svg" alt="users">
          <span class="title">
              اپ
            </span>
        </nuxt-link>
        <nuxt-link to="/admin/app/page" :class="{'selected': type == 'page'}" class="page-header">
          <img src="/images/pages/page.svg" alt="users">
          <span class="title">
              محتوای ثابت
            </span>
        </nuxt-link>
        <nuxt-link to="/admin/app/blog" :class="{'selected': type == 'blog'}" class="page-header">
          <img src="/images/pages/blog.svg" alt="users">
          <span class="title">
              وبلاگ
            </span>
        </nuxt-link>
        <v-divider class="d-none d-lg-flex" inset/>
        <v-spacer class="d-none d-sm-flex d-lg-none"/>
        <div class="page-actions"
             @click="openCreateModal"
             v-if="!isIndex && !isArticlePage"
        >
          <img src="/images/pages/new-user.svg" alt="users">
          <span class="title-main">دسته بندی جدید</span>
        </div>
        <nuxt-link
          v-if="!isIndex && !isArticlePage"
          to="/admin/app/article/page/create" class="page-actions">
          <img src="/images/pages/new-user.svg" alt="users">
          <span class="title-main">مقاله جدید</span>
        </nuxt-link>
        <button
          v-if="!isIndex && isArticlePage"
          class="page-actions"
          @click="createArticle"
        >
          <img src="/images/pages/new-user.svg" alt="users">
          <span class="title-main">ثبت</span>
        </button>
      </div>
    </v-col>
    <create-app-category
      :open="showCreateModal"
      :title="getTitle"
      :type="type"
      @close="closeCreateModal"
    />
  </v-row>
</template>

<script>
import CreateAppCategory from "~/components/admin/app/CreateAppCategory.vue";

export default {
  name: "AppHeaderComponent",
  components: {CreateAppCategory},
  props: {
    type: {
      type: String,
      required: true,
      default: 'page'
    },
    isArticlePage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showCreateModal: false
    }
  },
  methods: {
    openCreateModal() {
      this.showCreateModal = true
    },
    closeCreateModal() {
      this.showCreateModal = false
    },
    createArticle() {
      this.$emit('saveArticle')
    }
  },
  computed: {
    isIndex() {
      return this.$route.path === '/admin/app'
    },
    getTitle() {
      switch (this.$route.params.type) {
        case 'page':
          return 'محتوا ثابت'
        case 'blog':
          return 'وبلاگ'
        default:
          return ''
      }
    },
  }
}
</script>

<style scoped>

</style>
