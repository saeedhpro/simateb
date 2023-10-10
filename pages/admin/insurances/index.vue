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
            بیمه
          </span>
          </div>
          <v-divider inset/>
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
                  <span>فرم ایجاد بیمه</span>
                </div>
                <v-spacer/>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                    >
                      <div class="create-update-model-input-box">
                        <label>عنوان</label>
                        <input type="text" v-model="form.name">
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
                        @click="createInsurance"
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
                      <div class="create-update-model-input-description">آیا از حذف کردن این بیمه اطمینان دارید؟
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
          <div class="page-actions"
               @click="createModal"
          >
            <img src="/images/pages/new-user.svg" alt="organizations">
            <span class="title-main">بیمه جدید</span>
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
                :total="insurances.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in insurances.data" :key="n">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 }}</td>
                    <td class="text-center">{{ i.name ? i.name : '-' }}</td>
                    <td class="text-center flex flex-row justify-space-around align-center">
                      <button @click="editInsurance(i)" class="action-buttons">
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
                  <div v-if="insurances.meta.total === 0">اطلاعاتی یافت نشد</div>
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
import moment from "jalali-moment"

export default {
  name: "index.vue",
  components: {DataTableComponent},
  layout: 'admin',
  middleware: 'admin',
  data() {
    return {
      showFilterModal: false,
      showCreateModal: false,
      showRemoveItemModal: false,
      create: false,
      headers: [
        '',
        'نام',
        'عملیات',
      ],
      search: {
        q: '',
        page: 1,
      },
      form: {
        name: "",
        logo: "",
      },
      selectedItem: null,
      selectedInsurances: [],
    }
  },
  mounted() {
    this.getInsuranceList()
  },
  methods: {
    doAction() {
      if (!this.action) return
      switch (this.action) {
        case 1:
        case '1':
          this.deleteInsurances(this.selectedInsurances)
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
    editInsurance(insurance) {
      this.create = false
      this.form = {
        id: insurance.id,
        name: insurance.name,
        logo: insurance.logo,
      }
      this.toggleCreateModal()
    },
    paginate(page = 1) {
      this.search.page = page
      this.getInsuranceList()
    },
    getInsuranceList() {
      this.$store.dispatch('admin/insurances/getList', this.search)
    },
    getStatus(sent) {
      return sent ? 'ارسال شده' : 'ارسال نشد'
    },
    clearForm() {
      this.form = {
        name: '',
        logo: '',
      }
    },
    createInsurance() {
      const type = this.create ? 'admin/insurances/createInsurance' : 'admin/insurances/updateInsurance'
      this.$store.dispatch(type, this.form)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
          setTimeout(() => {
            this.closeForm()
            this.showCreateModal = false
            this.getInsuranceList()
          }, 100)
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
    },
    deleteInsurances(ids) {
      this.$store.dispatch('admin/insurances/deleteInsurance', {
        ids
      })
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
          setTimeout(() => {
            this.getInsuranceList()
            this.action = null
            this.selectedInsurances = []
          }, 50)
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
    },
    showRemoveItem(id) {
      this.selectedItem = id
      this.toggleRemoveItemModal()
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
      this.$store.dispatch('admin/insurances/removeInsurance', this.selectedItem)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
        .finally(() => {
          setTimeout(() => {
            this.toggleRemoveItemModal()
            this.getInsuranceList()
          }, 50)
        })
    }
  },
  computed: {
    insurances() {
      return this.$store.getters['admin/insurances/getList']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    selectedAll: {
      get() {
        return this.selectedInsurances.length > 0 && this.selectedInsurances.length === this.insurances.data.length
      },
      set(bool) {
        if (bool) {
          this.selectedInsurances = []
          this.selectedInsurances = this.holidays.data.map(i => i.id)
        } else {
          this.selectedInsurances = []
        }
      }
    },
  },
}
</script>

<style scoped>

</style>
