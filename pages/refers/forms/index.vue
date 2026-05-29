<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col align-self="center">
        <div class="page-header-box organization">
          <nuxt-link to="/refers" class="page-header">
            <img src="/images/pages/users.svg" alt="users">
            <span class="title">ارجاعیات</span>
          </nuxt-link>
          <nuxt-link to="/refers/forms" class="page-header">
            <img src="/images/pages/users.svg" alt="users">
            <span class="title">فرم ارجاعیات</span>
          </nuxt-link>
          <v-divider inset/>
          <div class="page-actions"
               @click="createModal"
          >
            <img src="/images/pages/plus.svg" alt="organizations">
            <span class="title-main">افزودن دسته بندی</span>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <v-card
          class="page-main-box"
        >
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
                    <td class="text-center">{{ i.name ? i.name : '-' }}</td>
                    <td class="text-center">
                      <span class="file-id ml-2" v-for="(i,n) in getForms(i)" :key="n">
                        {{ i }}
                      </span>
                    </td>
                    <td class="text-center flex flex-row justify-space-around align-center">
                      <button @click="editCategory(i)" class="action-buttons">
                        <v-icon size="16">mdi-pencil-outline</v-icon>
                        <span>ویرایش</span>
                      </button>
                      <button
                        @click="showRemoveItem(i.id)"
                        class="action-buttons">
                        <v-icon size="16">mdi-trash-can-outline</v-icon>
                        <span>حذف</span>
                      </button>
                      <button
                        @click="showItem(i)"
                        class="action-buttons">
                        <v-icon size="16">mdi-plus</v-icon>
                        <span>افزودن زیرمجموعه</span>
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
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="showCreateModal"
      max-width="1056px"
      persistent
    >
      <v-card
        class="create-update-modal"
      >
        <v-card-title
          class="create-update-modal-title-box"
        >
          <div class="create-update-modal-title">
            <button
              @click="closeForm"
              class="create-update-modal-close"
            >
              <img src="/images/login/close.svg">
            </button>
            <span>فرم ایجاد دسته بندی</span>
          </div>
          <v-spacer/>
          <div class="create-update-modal-regbox">
          </div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <custom-text-input
                  v-model="form.name"
                  label="عنوان"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col
                cols="4"
                sm="3"
                md="3"
              >
                <button
                  class="second-button full-width"
                  @click="clearForm"
                >
                  پاک کردن فرم
                </button>
              </v-col>
              <v-spacer/>
              <v-col
                cols="4"
                sm="3"
                md="3"
              >
                <button
                  class="second-button full-width"
                  @click="closeForm"
                >
                  بستن
                </button>
              </v-col>
              <v-col
                cols="4"
                sm="4"
                md="4"
              >
                <button
                  class="main-button"
                  @click="createCategory"
                >
                  ذخیره
                </button>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showRemoveItemModal"
      max-width="648px"
      persistent
    >
      <v-card
        class="create-update-modal"
      >
        <v-card-title
          class="create-update-modal-title-box"
        >
          <div class="create-update-modal-title">
            <button
              @click="cancelRemoveItem"
              class="create-update-modal-close"
            >
              <img src="/images/login/close.svg">
            </button>
          </div>
          <v-spacer/>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <div class="create-update-model-input-title">عنوان</div>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <div class="create-update-model-input-description">آیا از حذف کردن این دسته بندی اطمینان دارید؟
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <button
                  class="second-false-button"
                  @click="cancelRemoveItem"
                >
                  خیر
                </button>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <button
                  class="main-false-button"
                  @click="removeItem"
                >
                  بله، حذف کن
                </button>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showFormModal"
      max-width="1056px"
      persistent
    >
      <v-card
        class="create-update-modal"
      >
        <v-card-title
          class="create-update-modal-title-box"
        >
          <div class="create-update-modal-title">
            <button
              @click="closeFormModal"
              class="create-update-modal-close"
            >
              <img src="/images/login/close.svg">
            </button>
            <span>افزودن زیرمجموعه:
              {{ item ? item.name : '' }}
            </span>
          </div>
          <v-spacer/>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div class="inline-input-btn add-sub-box">
              <div class="create-update-model-input-box d-inline-flex" :class="{'has-error': errors.form_name}">
                <label>عنوان</label>
                <input type="text" v-model="form.name">
                <span class="create-update-modal-input-error" v-if="errors.form_name">{{ errors.form_name }}</span>
              </div>
              <div class="page-actions second-button inline-btn add-sub"
                   style="height: 44px"
                   @click="addForm"
              >
                <img src="/images/pages/plus-out.svg" alt="organizations">
                <span class="title">{{ treatCreate ? 'افزودن' : 'ویرایش' }}</span>
              </div>
            </div>
            <v-divider class="mt-4"/>
            <div class="case-type-list">
              <div class="case-type-item" v-for="(t, i) in forms" :key="i">
                <div class="case-item-name">
                  {{ t.name }}
                </div>
                <div class="case-actions text-center flex flex-row justify-space-around align-center">
                  <button @click="editForm(t, i)" class="action-buttons">
                    <v-icon size="16">mdi-pencil-outline</v-icon>
                    <span>ویرایش</span>
                  </button>
                  <button
                    @click="removeForm(i)"
                    class="action-buttons">
                    <v-icon size="16">mdi-trash-can-outline</v-icon>
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-spacer/>
              <v-col
                cols="6"
                sm="3"
                md="3"
              >
                <button
                  class="second-button full-width"
                  @click="closeFormModal"
                >
                  بستن
                </button>
              </v-col>
              <v-col
                cols="6"
                sm="4"
                md="4"
              >
                <button
                  class="main-button"
                  @click="saveForms"
                >
                  ذخیره
                </button>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import moment from "jalali-moment"

export default {
  name: "index.vue",
  components: {DataTableComponent},
  layout: 'panel',
  middleware: 'auth',
  data() {
    return {
      showFilterModal: false,
      showCreateModal: false,
      showRemoveItemModal: false,
      create: false,
      treatCreate: true,
      selectedIndex: -1,
      headers: [
        '',
        'عنوان',
        'زیرمجموعه ها',
        'عملیات',
      ],
      search: {
        q: '',
        page: 1,
      },
      form: {
        id: 0,
        name: "",
        type: "form",
      },
      errors: {
        form_name: '',
      },
      selectedItem: null,
      selectedCategory: null,
      selectedCategories: [],
      forms: [],
      showFormModal: false,
      item: null,
    }
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    closeFormModal() {
      this.forms = []
      this.showFormModal = false
      this.item = null
      this.form = {
        id: 0,
        name: "",
        type: "form",
      }
    },
    addForm() {
      this.errors.form_name = ''
      if (!this.form.name) {
        this.errors.form_name = 'فیلد عنوان زیرمجموعه خالی است'
        return
      }
      if (this.treatCreate) {
        this.forms.push(this.form)
      } else {
        this.forms[this.selectedIndex].name = this.form.name
        this.selectedIndex = -1
      }
      this.form = {
        id: 0,
        name: "",
        type: "form",
      }
      this.treatCreate = true
    },
    editForm(form, index) {
      let t = this.forms[index]
      this.form = {
        id: t.id,
        name: t.name,
        type: t.type,
      }
      this.treatCreate = false
      this.selectedIndex = index
    },
    removeForm(index) {
      this.forms.splice(index, 1)
    },
    saveForms() {
      this.$store.dispatch('forms/createFormList', {
        category_id: this.item.id,
        organization_id: this.item.organization_id,
        list: this.forms,
      })
        .finally(() => {
          this.closeFormModal()
          this.getCategoryList()
        })
    },
    doAction() {
      if (!this.action) return
      switch (this.action) {
        case 1:
        case '1':
          this.deleteCategories(this.selectedCategories)
      }
    },
    closeForm() {
      this.clearForm()
      this.toggleCreateModal()
    },
    clearFilterForm() {
      this.search = {
        page: this.search.page,
        q: '',
      }
    },
    closeFilterModal() {
      this.clearFilterForm()
      this.toggleFilterModal()
    },
    toggleFilterModal() {
      this.showFilterModal = !this.showFilterModal
    },
    toggleCreateModal() {
      this.showCreateModal = !this.showCreateModal
    },
    createModal() {
      this.create = true
      this.toggleCreateModal()
    },
    editCategory(category) {
      this.create = false
      this.form = {
        id: category.id,
        name: category.name,
      }
      this.toggleCreateModal()
    },
    paginate(page = 1) {
      this.search.page = page
      this.getCategoryList()
    },
    getCategoryList() {
      const data = {
        ...this.search,
        organization_id: this.loginUser.organization_id,
      }
      this.$store.dispatch('forms/getCategoryList', data)
    },
    clearForm() {
      this.form = {
        id: 0,
        name: "",
        type: "form"
      }
    },
    createCategory() {
      const type = this.create ? 'forms/createFormCategory' : 'forms/updateFormCategory'
      const data = {
        ...this.form,
        type: "form",
        organization_id: this.loginUser.organization_id,
      }
      this.$store.dispatch(type, data)
        .then(() => {
          setTimeout(() => {
            this.closeForm()
            this.showCreateModal = false
            this.getCategoryList()
          }, 50)
        })
    },
    deleteCategories(ids) {
      this.$store.dispatch('forms/deleteFormCategory', {
        ids
      })
        .then(() => {
          setTimeout(() => {
            this.getCategoryList()
            this.action = null
            this.selectedCategories = []
          }, 50)
        })
    },
    showRemoveItem(id) {
      this.selectedItem = id
      this.toggleRemoveItemModal()
    },
    showItem(item) {
      for (let i = 0; i < item.forms.length; i++) {
        this.forms.push({
          ...item.forms[i],
        })
      }
      this.item = item
      this.showFormModal = true
    },
    cancelRemoveItem() {
      this.selectedItem = null
      this.toggleRemoveItemModal()
    },
    toggleRemoveItemModal() {
      this.showRemoveItemModal = !this.showRemoveItemModal
    },
    removeItem() {
      if (!this.selectedItem) return
      this.$store.dispatch('forms/removeFormCategory', this.selectedItem)
        .finally(() => {
          setTimeout(() => {
            this.toggleRemoveItemModal()
            this.getCategoryList()
          }, 50)
        })
    },
    getForms(item) {
      return item.forms ? item.forms.map(i=>i.name) : []
    }
  },
  computed: {
    categories() {
      return this.$store.getters['forms/getCategoryList']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    selectedAll: {
      get() {
        return this.selectedCategories.length > 0 && this.selectedCategories.length === this.categories.data.length
      },
      set(bool) {
        if (bool) {
          this.selectedCategories = []
          this.selectedCategories = this.categories.data.map(i => i.id)
        } else {
          this.selectedCategories = []
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">

.case-type-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  .case-type-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    .case-item-name {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      margin: 5px;
      padding: 5px;
      width: 100%;
    }

    .case-actions {
      width: 230px;
    }
  }
}

.inline-input-btn {
  display: flex;
  align-items: flex-end;
  flex-direction: row;
}

.inline-btn {
  max-width: 200px;
  min-width: 100px;
  margin-right: 10px;
}

.case-item-name {
  background: #E6E6E6 0 0 no-repeat padding-box;
  border-radius: 8px;
  height: 40px;
  display: flex;
  align-items: center;
}

</style>
