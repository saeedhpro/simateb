<template>
  <v-card
    class="page-main-box"
  >
    <v-row class="search-box">
      <v-col
        cols="12"
        sm="12"
        md="5"
        lg="4"
      >
        <div class="right-box">
          <v-checkbox
            v-model="selectedAll"
          ></v-checkbox>
          <div class="selected-count" v-if="selectedArticles.length > 0">
            {{ selectedArticles.length }}
          </div>
          <v-select
            outlined
            :items="actions"
            label="اقدام جمعی"
            item-value="id"
            item-text="label"
            v-model="action"
          ></v-select>
          <button
            class="do-action-btn"
            @click="doAction"
            :disabled="!action"
          >انجام بده
          </button>
        </div>
      </v-col>
      <v-spacer/>
      <v-col
        cols="12"
        sm="12"
        md="5"
        lg="5"
      >
        <div class="page-main-actions-left">
          <div class="result-count">
            <span>{{ articles.meta.total  }}</span>
            نتیجه
          </div>
          <div class="page-search-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="17.995" height="18" viewBox="0 0 17.995 18">
              <defs>
                <style>.a {
                  fill: #757575;
                }</style>
              </defs>
              <path class="a"
                    d="M17.722,16.559l-4.711-4.711a7.094,7.094,0,0,0,1.582-4.535,7.327,7.327,0,1,0-2.777,5.729l4.711,4.711a.972.972,0,0,0,.629.247.844.844,0,0,0,.6-.247A.822.822,0,0,0,17.722,16.559ZM1.687,7.313a5.625,5.625,0,1,1,5.625,5.625A5.632,5.632,0,0,1,1.687,7.313Z"
                    transform="translate(0)"/>
            </svg>
            <input class="search-input" v-model="search.q" type="text" ref="search-input" placeholder="جستجو"
                   @input="changeSearch">
            <div @click="getArticleList" class="search-button">
              <img src="/images/pages/search-button.svg">
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <data-table-component
          :headers="headers"
          :page="search.page"
          :total="articles.meta.total"
          @paginate="paginate"
        >
          <template v-slot:body>
            <tr v-for="(i, n) in articles.data" :key="n">
              <td class="text-center">{{ (search.page - 1) * 10 + n + 1 }}</td>
              <td class="text-center">
                <div class="table-row flex flex-row align-center justify-start">
                  <input type="checkbox"
                         class="table-selectable-checkbox"
                         v-model="selectedArticles"
                         :value="i"
                  />
                  <img :src="getLogo(i)">
                  <span>{{ i.title }}</span>
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
              <td class="text-center">
                <button @click="getToEditRoute(i.id)" class="action-buttons">
                  <v-icon size="16">mdi-pencil-outline</v-icon>
                  <span>ویرایش</span>
                </button>
              </td>
            </tr>
          </template>
          <template v-slot:notfound>
            <div v-if="articles.meta.total === 0">اطلاعاتی یافت نشد</div>
          </template>
        </data-table-component>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

import DataTableComponent from "~/components/panel/global/DataTableComponent.vue";
export default {
  components: {DataTableComponent},
  props: {
    type: {
      type: String,
      default: "page"
    }
  },
  data() {
    return {
      article: null,
      articles: {
        data: [],
        meta: {
          total: 0,
        }
      },
      headers: [
        '',
        'عنوان',
        'دسته بندی ها',
        'نویسنده',
        'نوشته شده در',
        'عملیات',
      ],
      selectedArticles: [],
      actions: [
        {
          id: 0,
          label: 'اقدام جمعی'
        },
        {
          id: 1,
          label: 'حذف کن'
        },
      ],
      action: null,
      search: {
        q: '',
        type: this.type,
        page: 1,
      }
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    doAction() {
      if (!this.action) return
      switch (this.action) {
        case 1:
        case '1':
          this.deleteArticles(this.selectedArticles)
      }
    },
    deleteArticles(ids) {
      // this.$store.dispatch('admin/organizations/deleteOrganizations', {
      //   ids
      // })
      //   .then(() => {
      //     setTimeout(() => {
      //       this.getOrganizationsList()
      //       this.action = null
      //       this.selectedOrganizations = []
      //     }, 50)
      //   })
    },
    changeSearch() {
      this.getArticleList()
    },
    paginate(page = 1) {
      this.search.page = page
      this.getArticleList()
    },
    getArticleList() {
      this.$store.dispatch('admin/app/getArticleList', this.search)
        .then(res => {
          this.articles = res.data
        })
    },
    getLogo(i) {
      return i.thumbnail
    },
    getToEditRoute(id) {
      switch (this.$route.path) {
        case '/admin/app/page':
          this.$router.push(`/admin/app/article/page/${id}`)
          return
        case '/admin/app/blog':
          this.$router.push(`/admin/app/article/blog/${id}`)
          return
        default:
          return ''
      }
    },
    getCategories(categories) {
      return categories.length > 0 ? categories.map(i=>i.name).join(' , ') : '-'
    }
  },
  computed: {
    selectedAll: {
      get() {
        return this.selectedArticles.length > 0 && this.selectedArticles.length === this.articles.data.length
      },
      set(bool) {
        if (bool) {
          this.selectedArticles = []
          this.selectedArticles = this.articles.data
        } else {
          this.selectedArticles = []
        }
      }
    },
    getTitle() {
      switch (this.$route.path) {
        case '/admin/app/page':
          return 'محتوا ثابت'
        case '/admin/app/blog':
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
