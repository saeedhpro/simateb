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
            طرح درمان {{ category.name }}
          </span>
          </div>
          <v-divider inset/>
          <div class="page-actions"
               @click="createModal"
          >
            <img src="/images/pages/plus.svg" alt="organizations">
            <span class="title-main">افزودن طرح</span>
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
                :total="treatments.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in treatments.data" :key="n">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 }}</td>
                    <td class="text-center">{{ i.name ? i.name : '-' }}</td>
                    <td class="text-center flex flex-row justify-space-around align-center">
                      <button @click="editTreatment(i)" class="action-buttons">
                        <v-icon size="16">mdi-pencil-outline</v-icon>
                        <span>ویرایش</span>
                      </button>
                      <button
                        @click="showRemoveItem(i.id)"
                        class="action-buttons">
                        <v-icon size="16">mdi-trash-can-outline</v-icon>
                        <span>حذف</span>
                      </button>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="treatments.meta.total === 0">اطلاعاتی یافت نشد</div>
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
                  @click="createTreatment"
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
      headers: [
        '',
        'عنوان',
        'عملیات',
      ],
      search: {
        q: '',
        page: 1,
      },
      category: {
        id: 0,
        name: "",
      },
      form: {
        id: 0,
        name: "",
      },
      selectedItem: null,
      selectedTreatment: null,
      selectedTreatments: [],
    }
  },
  mounted() {
    this.getCategory()
  },
  methods: {
    doAction() {
      if (!this.action) return
      switch (this.action) {
        case 1:
        case '1':
          this.deleteTreatments(this.selectedTreatments)
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
    editTreatment(treatment) {
      this.create = false
      this.form = {
        id: treatment.id,
        name: treatment.name,
      }
      this.toggleCreateModal()
    },
    paginate(page = 1) {
      this.search.page = page
      this.getTreatmentList()
    },
    getCategory() {
      this.$store.dispatch('treatments/getCategory', this.$route.params.id)
        .then(res => {
          this.category = res.data.data
          this.getTreatmentList()
        })
        .catch(err => {
          this.$router.go(-1)
        })
    },
    getTreatmentList() {
      const data = {
        ...this.search,
        organization_id: this.loginUser.organization_id,
        category_id: this.category.id,
      }
      this.$store.dispatch('treatments/getList', data)
    },
    clearForm() {
      this.form = {
        id: 0,
        name: "",
      }
    },
    createTreatment() {
      const type = this.create ? 'treatments/createTreatment' : 'treatments/updateTreatment'
      const data = {
        ...this.form,
        organization_id: this.loginUser.organization_id,
        category_id: this.category.id,
      }
      this.$store.dispatch(type, data)
        .then(() => {
          setTimeout(() => {
            this.closeForm()
            this.showCreateModal = false
            this.getTreatmentList()
          }, 50)
        })
    },
    deleteTreatments(ids) {
      this.$store.dispatch('treatments/deleteTreatment', {
        ids
      })
        .then(() => {
          setTimeout(() => {
            this.getTreatmentList()
            this.action = null
            this.selectedTreatments = []
          }, 50)
        })
    },
    showRemoveItem(id) {
      this.selectedItem = id
      this.toggleRemoveItemModal()
    },
    showItem(id) {
      this.$router.push(`/treatments/${id}`)
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
      this.$store.dispatch('treatments/removeTreatment', this.selectedItem)
        .finally(() => {
          setTimeout(() => {
            this.toggleRemoveItemModal()
            this.getTreatmentList()
          }, 50)
        })
    },
  },
  computed: {
    treatments() {
      return this.$store.getters['treatments/getList']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    selectedAll: {
      get() {
        return this.selectedTreatments.length > 0 && this.selectedTreatments.length === this.treatments.data.length
      },
      set(bool) {
        if (bool) {
          this.selectedTreatments = []
          this.selectedTreatments = this.treatments.data.map(i => i.id)
        } else {
          this.selectedTreatments = []
        }
      }
    },
  },
}
</script>

<style scoped>

</style>
