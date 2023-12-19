<template>
  <v-container
    fluid
  >
    <app-header-component :type="getType" />
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          class="page-main-box mt-2"
        >
          <v-row>
            <v-col>
              <div class="dashboard-header">
                <span>آخرین محتوای ثابت</span>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <data-table-component
                :headers="pageHeaders"
                :page="1"
                :total="pageArticles.length"
                @paginate="() => {}"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in pageArticles" :key="n">
                    <td class="text-center">{{ n + 1 }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <span><nuxt-link :to="`/admin/app/blog/${i.id}`">{{ i.title | toPersianNumber }}</nuxt-link></span>
                      </div>
                    </td>
                    <td class="text-center">{{ getCategories(i.categories) }}</td>
                    <td class="text-center">
                      <span><nuxt-link :to="`/admin/profile/${i.id}`">{{
                          i.author ? `${i.author.full_name}` : '-' | toPerisanNumber
                        }}</nuxt-link></span>
                    </td>
                    <td class="text-center">
                      {{ i.created_at_ago }}
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="pageArticles.length === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          class="page-main-box mt-2"
        >
          <v-row>
            <v-col>
              <div class="dashboard-header">
                <span>آخرین مقالات وبلاگ</span>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <data-table-component
                :headers="blogHeaders"
                :page="1"
                :total="blogArticles.length"
                @paginate="() => {}"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in blogArticles" :key="n">
                    <td class="text-center">{{ n + 1 }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <span><nuxt-link :to="`/admin/app/blog/${i.id}`">{{ i.title | toPersianNumber }}</nuxt-link></span>
                      </div>
                    </td>
                    <td class="text-center">{{ getCategories(i.categories) }}</td>
                    <td class="text-center">
                      <span><nuxt-link :to="`/admin/profile/${i.id}`">{{
                          i.author ? `${i.author.full_name}` : '-' | toPerisanNumber
                        }}</nuxt-link></span>
                    </td>
                    <td class="text-center">
                      {{ i.created_at_ago }}
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="blogArticles.length === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import AppHeaderComponent from "~/components/admin/app/AppHeaderComponent.vue";

export default {
  name: "index.vue",
  components: {AppHeaderComponent, DataTableComponent},
  layout: 'admin',
  middleware: 'admin',
  data() {
    return {
      pageHeaders: [
        '',
        'عنوان',
        'دسته بندی ها',
        'نویسنده',
        'نوشته شده در',
      ],
      blogHeaders: [
        '',
        'عنوان',
        'دسته بندی ها',
        'نویسنده',
        'نوشته شده در',
      ],
      pageArticles: [],
      blogArticles: [],
    }
  },
  mounted() {
    this.getPageArticleList()
    this.getBlogArticleList()
  },
  methods: {
    getPageArticleList() {
      this.$store.dispatch('admin/app/getArticleList', {
        page: 1,
        limit: 10,
        type: 'page',
        q: '',
      })
        .then(res => {
          this.pageArticles = res.data.data
        })
    },
    getBlogArticleList() {
      this.$store.dispatch('admin/app/getArticleList', {
        page: 1,
        limit: 10,
        type: 'blog',
        q: '',
      })
        .then(res => {
          this.blogArticles = res.data.data
        })
    },
    getCategories(categories) {
      return categories.length > 0 ? categories.map(i=>i.name).join(' , ') : '-'
    }
  },
  computed: {
    getType() {
      switch (this.$route.path) {
        case '/admin/app/page':
          return 'page'
        case '/admin/app/blog':
          return 'blog'
        default:
          return ''
      }
    },
  }
}
</script>

<style scoped>

</style>
