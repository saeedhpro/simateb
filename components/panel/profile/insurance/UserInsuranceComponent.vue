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
          <v-spacer />
          <div class="page-actions"
               @click="createModal"
          >
            <img src="/images/pages/plus.svg" alt="organizations">
            <span class="title-main">افزودن</span>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
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
                    <td class="text-center">{{ `${i.percentage} %` }}</td>
                    <td class="text-center">{{ i.start_date_fa }}</td>
                    <td class="text-center">{{ i.end_date_fa }}</td>
                    <td class="text-center">{{ `${i.total} تومان` }}</td>
                    <td class="text-center">{{ i.is_active ? 'فعال' : 'غیرفعال' }}</td>
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
            <span>فرم ایجاد بیمه</span>
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
                sm="3"
              >
                <custom-multi-select
                  v-model="selectedInsurance"
                  :items="allInsurances"
                  label="بیمه"
                  @change="onInsuranceChanged"
                />
              </v-col>
              <v-col
                cols="12"
                sm="3"
              >
                <custom-text-input
                  v-model="form.name"
                  label="نام بیمه"
                />
              </v-col>
              <v-col
                cols="12"
                sm="3"
              >
                <custom-number-input
                  v-model="form.percentage"
                  :max="100"
                  :min="0"
                  label="سهم بیمه"
                  @input="onPercentageChange"
                />
              </v-col>
              <v-col
                cols="12"
                sm="3"
              >
                <div class="create-update-model-input-box">
                  <label >وضعیت</label>
                  <v-switch
                    v-model="form.is_active"
                    :label="form.is_active ? 'فعال' : 'غیرفعال'"
                    color="#5063FF"
                    inset
                  />
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="3"
              >
                <custom-price-input
                  v-model="form.total"
                  :min="0"
                  label="سقف تعهد"
                />
              </v-col>
              <v-col
                cols="12"
                sm="3"
              >
                <div class="create-update-model-input-box">
                  <label>تاریخ شروع</label>
                  <date-picker
                    v-model="form.start_date"
                    format="YYYY-MM-DD"
                    display-format="jYYYY/jMM/jDD"
                    editable
                    class="date-picker"
                  >
                    <template v-slot:label>
                      <img src="/images/form/datepicker.svg">
                    </template>
                  </date-picker>
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="3"
              >
                <div class="create-update-model-input-box">
                  <label>تاریخ پایان</label>
                  <date-picker
                    v-model="form.end_date"
                    format="YYYY-MM-DD"
                    display-format="jYYYY/jMM/jDD"
                    editable
                    class="date-picker"
                  >
                    <template v-slot:label>
                      <img src="/images/form/datepicker.svg">
                    </template>
                  </date-picker>
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
  </v-container>
</template>
<script>

import DataTableComponent from "~/components/panel/global/DataTableComponent.vue";

export default {
  name: "UserInsuranceComponent",
  components: {DataTableComponent},
  props: {
    userId: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {
      showFilterModal: false,
      showCreateModal: false,
      showRemoveItemModal: false,
      create: false,
      headers: [
        '',
        'نام بیمه',
        'درصد تخفیف',
        'زمان شروع',
        'زمان پایان',
        'سقف تعهد',
        'وضعیت',
        'عملیات',
      ],
      search: {
        q: '',
        page: 1,
        user_id: this.userId,
        is_active: 1
      },
      form: {
        id: 0,
        name: "",
        percentage: 0,
        is_active: 0,
        user_id: this.userId,
        insurance_id: 0,
        start_date: '',
        end_date: '',
        total: 0
      },
      selectedItem: null,
      selectedInsurance: null,
      selectedInsurances: [],
    }
  },
  mounted() {
    this.getInsuranceList()
    this.getAllInsurancesList()
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
        user_id: this.userId,
        is_active: 1,
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
        percentage: insurance.percentage,
        is_active: insurance.is_active,
        user_id: insurance.user_id,
        insurance_id: insurance.insurance_id,
        start_date: insurance.start_date,
        end_date: insurance.end_date,
        total: insurance.total,
      }
      console.log(insurance.end_date, "end")
      this.toggleCreateModal()
    },
    paginate(page = 1) {
      this.search.page = page
      this.getInsuranceList()
    },
    getInsuranceList() {
      this.$store.dispatch('insurances/getUserInsurances', this.search)
    },
    getAllInsurancesList() {
      this.$store.dispatch('insurances/getOwnInsurances', {
        is_active: 1
      })
    },
    getStatus(sent) {
      return sent ? 'ارسال شده' : 'ارسال نشد'
    },
    clearForm() {
      this.form = {
        id: 0,
        name: "",
        percentage: 0,
        is_active: 0,
        user_id: this.userId,
        insurance_id: 0,
        start_date: '',
        end_date: '',
        total: 0,
      }
    },
    createInsurance() {
      const type = this.create ? 'insurances/createUserInsurance' : 'insurances/updateUserInsurance'
      const data = {
        ...this.form,
        insurance_id: this.form.insurance_id !== 0 ? this.form.insurance_id : null,
      }
      this.$store.dispatch(type, data)
        .then(() => {
          setTimeout(() => {
            this.closeForm()
            this.showCreateModal = false
            this.getInsuranceList()
          }, 50)
        })
    },
    deleteInsurances(ids) {
      this.$store.dispatch('insurances/deleteUserInsurance', {
        ids
      })
        .then(() => {
          setTimeout(() => {
            this.getInsuranceList()
            this.action = null
            this.selectedInsurances = []
          }, 50)
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
      this.$store.dispatch('insurances/removeUserInsurance', this.selectedItem)
        .finally(() => {
          setTimeout(() => {
            this.toggleRemoveItemModal()
            this.getInsuranceList()
          }, 50)
        })
    },
    onInsuranceChanged(e) {
      if (e) {
        this.form.insurance_id = e.id
        this.form.name = e.name
        this.form.percentage = e.percentage
      } else {
        this.form.insurance_id = 0
      }
    },
    onPercentageChange(e) {
      if (e > 100) {
        this.form.percentage = 100
      } else if (e < 0) {
        this.form.percentage = 0
      } else {
        this.form.percentage = e
      }
    }
  },
  computed: {
    insurances() {
      return this.$store.getters['insurances/getUserInsuranceList']
    },
    userInsurances() {
      return this.$store.getters['insurances/getUserInsurance']
    },
    allInsurances() {
      return this.$store.getters['insurances/getOwnInsurances']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    users() {

    },
    selectedAll: {
      get() {
        return this.selectedInsurances.length > 0 && this.selectedInsurances.length === this.insurances.data.length
      },
      set(bool) {
        if (bool) {
          this.selectedInsurances = []
          this.selectedInsurances = this.insurances.data.map(i => i.id)
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
