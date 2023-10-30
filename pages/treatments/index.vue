<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col align-self="center">
        <div class="page-header-box">
          <div class="page-header">
            <img src="/images/pages/users.svg" alt="organizations">
            <span class="title">
            طرح درمان
          </span>
          </div>
          <v-divider inset/>
          <div class="page-actions"
               @click="createModal"
          >
            <img src="/images/pages/plus.svg" alt="organizations">
            <span class="title-main">افزودن طرح درمان</span>
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
                      <span class="file-id" v-for="(i,n) in getActions(i)" :key="n">
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
              <v-icon>mdi-close</v-icon>
            </button>
            <span>فرم ایجاد طرح درمان</span>
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
                cols="12"
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
                cols="12"
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
                cols="12"
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
              <v-icon>mdi-close</v-icon>
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
                <div class="create-update-model-input-description">آیا از حذف کردن این طرح درمان اطمینان دارید؟
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
      v-model="showTreatmentModal"
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
              @click="closeTreatmentModal"
              class="create-update-modal-close"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <span>افزودن زیرمجموعه:
              {{ item ? item.name : '' }}
            </span>
          </div>
          <v-spacer/>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div class="inline-input-btn align-center">
              <div class="create-update-model-input-box d-inline-flex" :class="{'has-error': errors.treatment_name}">
                <label>عنوان</label>
                <input type="text" v-model="treatment.name">
                <span class="create-update-modal-input-error" v-if="errors.treatment_name">{{ errors.treatment_name }}</span>
              </div>
              <div class="page-actions second-button inline-btn mt-2"
                   style="height: 44px"
                   @click="addTreatment"
              >
                <img src="/images/pages/plus-out.svg" alt="organizations">
                <span class="title">{{ treatCreate ? 'افزودن' : 'ویرایش' }}</span>
              </div>
            </div>
            <v-divider class="mt-4"/>
            <div class="case-type-list">
              <div class="case-type-item" v-for="(t, i) in treatments" :key="i">
                <div class="case-item-name">
                  {{ t.name }}
                </div>
                <div class="case-actions text-center flex flex-row justify-space-around align-center">
                  <button @click="editTreatment(t, i)" class="action-buttons">
                    <v-icon size="16">mdi-pencil-outline</v-icon>
                    <span>ویرایش</span>
                  </button>
                  <button
                    @click="removeTreatment(i)"
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
                cols="12"
                sm="3"
                md="3"
              >
                <button
                  class="second-button full-width"
                  @click="closeTreatmentModal"
                >
                  بستن
                </button>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <button
                  class="main-button"
                  @click="saveTreatments"
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
      },
      treatment: {
        id: 0,
        name: "",
      },
      errors: {
        treatment_name: '',
      },
      selectedItem: null,
      selectedCategory: null,
      selectedCategories: [],
      treatments: [],
      showTreatmentModal: false,
      item: null,
    }
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    closeTreatmentModal() {
      this.treatments = []
      this.showTreatmentModal = false
      this.item = null
      this.treatment = {
        id: 0,
        name: "",
      }
    },
    addTreatment() {
      this.errors.treatment_name = ''
      if (!this.treatment.name) {
        this.errors.treatment_name = 'فیلد عنوان زیرمجموعه خالی است'
        return
      }
      if (this.treatCreate) {
        this.treatments.push(this.treatment)
      } else {
        this.treatments[this.selectedIndex].name = this.treatment.name
        this.selectedIndex = -1
      }
      this.treatment = {
        id: 0,
        name: "",
      }
      this.treatCreate = true
    },
    editTreatment(treatment, index) {
      let t = this.treatments[index]
      this.treatment = {
        id: t.id,
        name: t.name,
      }
      this.treatCreate = false
      this.selectedIndex = index
    },
    removeTreatment(index) {
      this.treatments.splice(index, 1)
    },
    saveTreatments() {
      this.$store.dispatch('treatments/createTreatmentList', {
        category_id: this.item.id,
        organization_id: this.item.organization_id,
        list: this.treatments,
      })
        .finally(() => {
          this.closeTreatmentModal()
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
      this.$store.dispatch('treatments/getCategoryList', data)
    },
    clearForm() {
      this.form = {
        id: 0,
        name: "",
      }
    },
    createCategory() {
      const type = this.create ? 'treatments/createTreatmentCategory' : 'treatments/updateTreatmentCategory'
      const data = {
        ...this.form,
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
      this.$store.dispatch('treatments/deleteTreatmentCategory', {
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
      for (let i = 0; i < item.actions.length; i++) {
        this.treatments.push({
          ...item.actions[i],
        })
      }
      this.item = item
      this.showTreatmentModal = true
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
      this.$store.dispatch('treatments/removeTreatmentCategory', this.selectedItem)
        .finally(() => {
          setTimeout(() => {
            this.toggleRemoveItemModal()
            this.getCategoryList()
          }, 50)
        })
    },
    getActions(item) {
      return item.actions ? item.actions.map(i=>i.name) : []
    }
  },
  computed: {
    categories() {
      return this.$store.getters['treatments/getCategoryList']
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
