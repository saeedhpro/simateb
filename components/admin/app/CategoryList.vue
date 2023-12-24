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
          <div class="selected-count" v-if="selectedCategories.length > 0">
            {{ selectedCategories.length }}
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
            <span>{{ categories.meta.total  }}</span>
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
            <div @click="getCategoryList" class="search-button">
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
          :total="categories.meta.total"
          @paginate="paginate"
        >
          <template v-slot:body>
            <tr v-for="(i, n) in categories.data" :key="n">
              <td class="text-center">{{ (search.page - 1) * 10 + n + 1 }}</td>
              <td class="text-center">
                <div class="table-row flex flex-row align-center justify-start">
                  <input type="checkbox"
                         class="table-selectable-checkbox"
                         v-model="selectedCategories"
                         :value="i"
                  />
                  <img :src="getLogo(i)">
                  <span>{{ i.name }}</span>
                </div>
              </td>
              <td class="text-center">{{ i.parent ? i.parent.name : '-' }}</td>
              <td class="text-center">
                <button @click="editCategory(i)" class="action-buttons">
                  <v-icon size="16">mdi-pencil-outline</v-icon>
                  <span>ویرایش</span>
                </button>
              </td>
            </tr>
          </template>
          <template v-slot:notfound>
            <div v-if="categories.meta.total === 0">اطلاعاتی یافت نشد</div>
          </template>
        </data-table-component>
      </v-col>
    </v-row>
    <update-app-category
      :category="category"
      :open="showEditCategory"
      :title="getTitle"
      @close="closeEditCategory"
      @done="doneCreateModal"
      v-if="category" />
  </v-card>
</template>

<script>

import DataTableComponent from "~/components/panel/global/DataTableComponent.vue";
import UpdateAppCategory from "~/components/admin/app/UpdateAppCategory.vue";
import CreateAppCategory from "~/components/admin/app/CreateAppCategory.vue";

export default {
  components: {CreateAppCategory, UpdateAppCategory, DataTableComponent},
  props: {
    type: {
      type: String,
      default: "page"
    }
  },
  data() {
    return {
      category: null,
      showEditCategory: false,
      categories: {
        data: [],
        meta: {
          total: 0,
        }
      },
      headers: [
        '',
        'عنوان',
        'والد',
        'اقدامات',
      ],
      selectedCategories: [],
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
          this.deleteCategories(this.selectedCategories)
      }
    },
    deleteCategories(ids) {
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
      this.getCategoryList()
    },
    paginate(page = 1) {
      this.search.page = page
      this.getCategoryList()
    },
    getCategoryList() {
      this.$store.dispatch('admin/app/getCategoryList', this.search)
        .then(res => {
          this.categories = res.data
        })
    },
    getLogo(i) {
      return i.icon ?? i.logo
    },
    editCategory(c) {
      this.category = c
      this.openEditCategory()
    },
    openEditCategory() {
      this.showEditCategory = true
    },
    closeEditCategory() {
      this.category = null
      this.showEditCategory = false
    },
    doneCreateModal() {
      this.getCategoryList()
    }
  },
  computed: {
    selectedAll: {
      get() {
        return this.selectedCategories.length > 0 && this.selectedCategories.length === this.categories.data.length
      },
      set(bool) {
        if (bool) {
          this.selectedCategories = []
          this.selectedCategories = this.categories.data
        } else {
          this.selectedCategories = []
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
