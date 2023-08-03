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
            تعطیلات رسمی
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
                  <span>فرم ایجاد تعطیلات</span>
                </div>
                <v-spacer/>
                <div class="create-update-modal-regbox">
                  ثبت در سیستم توسط: {{ `${loginUser.staff.lname} ${loginUser.staff.fname}` }}
                  ({{ loginUser.created | toRelativeDate }} {{
                    loginUser.created | toPersianDate('YYYY/MM/DD HH:mm:ss')
                  }})
                </div>
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
                        <input type="text" v-model="form.title">
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                    >
                      <div class="create-update-model-input-box">
                        <label>تاریخ</label>
                        <custom-date-input
                          :type="'date'"
                          v-model="form.hdate"
                          :initial-value="form.hdate"
                        />
<!--                        <date-picker-->
<!--                          v-model="form.hdate"-->
<!--                          format="YYYY-MM-DD"-->
<!--                          display-format="jYYYY/jMM/jDD"-->
<!--                          editable-->
<!--                          class="date-picker"-->
<!--                        >-->
<!--                          <template v-slot:label>-->
<!--                            <img src="/images/form/datepicker.svg">-->
<!--                          </template>-->
<!--                        </date-picker>-->
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                    >
                      <div class="create-update-model-input-box">
                        <label>موسسه</label>
                        <v-autocomplete
                          v-model="form.organization_id"
                          :items="organizations"
                          outlined
                          dense
                          item-text="name"
                          item-value="id"
                          label=""
                        ></v-autocomplete>
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
                        class="second-button"
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
                        class="second-button"
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
                        @click="createHoliday"
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
                      <div class="create-update-model-input-description">آیا از حذف کردن این تعطیلات اطمینان دارید؟
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
            <span class="title-main">تعطیلات جدید</span>
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
          <v-row class="search-box">
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <div class="create-update-model-input-box flex flex-row justify-start align-center">
                <label class="mb-0 ml-2">سال</label>
                <multiselect
                  v-model="year"
                  :options="years"
                  :close-on-select="true"
                  :show-labels="false">
                  <template slot="singleLabel" slot-scope="props"><span
                    class="option__desc"><span
                    class="option__title">{{ `${props.option}` }}</span></span>
                  </template>
                  <template slot="option" slot-scope="props">
                    <div class="option__desc"><span
                      class="option__title">{{ `${props.option}` }}</span></div>
                  </template>
                </multiselect>
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
                :total="holidays.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in holidays.data" :key="n">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 | persianDigit }}</td>
                    <td class="text-center">
                      {{ i.hdate ? $moment(i.hdate).format("jYYYY/jMM/jDD") : '-'  }}
                    </td>
                    <td class="text-center">{{ i.title ? i.title : '-' | persianDigit }}</td>
                    <td class="text-center">{{ i.organization ? i.organization.name : '-' | persianDigit }}</td>
                    <td class="text-center flex flex-row justify-space-around align-center">
                      <button @click="editHoliday(i)" class="action-buttons">
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
                  <div v-if="holidays.meta.total === 0">اطلاعاتی یافت نشد</div>
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
        'تاریخ',
        'عنوان',
        'سازمان',
        'عملیات',
      ],
      search: {
        q: '',
        page: 1,
        start: '',
        end: '',
      },
      form: {
        organization_id: null,
        hdate: "",
        title: "",
      },
      year: 1398,
      organization: null,
      selectedItem: null,
      selectedHolidays: [],
    }
  },
  mounted() {
    this.getYear()
    this.getAllOrganizations()
  },
  methods: {
    getYear() {
      this.year = parseInt(this.$moment().format("jYYYY"))
      this.changeYear()
    },
    changeYear() {
      const start = moment.from(`${this.year}/01/01 00:00:00`, 'fa', 'YYYY/MM/DD HH:mm:ss')
        .locale("en")
        .format('YYYY-MM-DD HH:mm:ss')
      const end = moment.from(`${this.year}/12/01 23:59:59`, 'fa', 'YYYY/MM/DD HH:mm:ss')
        .endOf("jYear")
        .locale("en")
        .format('YYYY-MM-DD HH:mm:ss')
      this.search.start = start
      this.search.end = end
      this.paginate()
    },
    doAction() {
      if (!this.action) return
      switch (this.action) {
        case 1:
        case '1':
          this.deleteHolidays(this.selectedHolidays)
      }
    },
    closeForm() {
      this.clearForm()
      this.toggleCreateModal()
    },
    clearFilterForm() {
      this.search = {
        page: this.search.page,
        start: '',
        end: '',
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
    editHoliday(holiday) {
      this.create = false
      this.form = {
        id: holiday.id,
        title: holiday.title,
        hdate: this.$moment(holiday.hdate).format("YYYY-MM-DD"),
        organization_id: holiday.organization ? holiday.organization.id : null,
      }
      this.toggleCreateModal()
    },
    paginate(page = 1) {
      this.search.page = page
      this.getHolidayList()
    },
    getHolidayList() {
      this.$store.dispatch('admin/holidays/getList', this.search)
    },
    getStatus(sent) {
      return sent ? 'ارسال شده' : 'ارسال نشد'
    },
    clearForm() {
      this.form = {
        title: '',
        hdate: '',
        organization_id: null,
      }
      this.organization = null
    },
    createHoliday() {
      const type = this.create ? 'admin/holidays/createHoliday' : 'admin/holidays/updateHoliday'
      this.$store.dispatch(type, this.form)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
          setTimeout(() => {
            this.closeForm()
            this.showCreateModal = false
            this.getHolidayList()
          }, 100)
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
    },
    deleteHolidays(ids) {
      this.$store.dispatch('admin/holidays/deleteHoliday', {
        ids
      })
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
          setTimeout(() => {
            this.getHolidayList()
            this.action = null
            this.selectedHolidays = []
          }, 50)
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
    },
    getAllOrganizations() {
      this.$store.dispatch('admin/organizations/getOrganizations')
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
      this.$store.dispatch('admin/holidays/removeHoliday', this.selectedItem)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
        .finally(() => {
          setTimeout(() => {
            this.toggleRemoveItemModal()
            this.getHolidayList()
          }, 50)
        })
    }
  },
  computed: {
    holidays() {
      return this.$store.getters['admin/holidays/getList']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    users() {

    },
    organizations() {
      return this.$store.getters['admin/organizations/getOrganizations']
    },
    selectedAll: {
      get() {
        return this.selectedHolidays.length > 0 && this.selectedHolidays.length === this.holidays.data.length
      },
      set(bool) {
        if (bool) {
          this.selectedHolidays = []
          this.selectedHolidays = this.holidays.data.map(i => i.id)
        } else {
          this.selectedHolidays = []
        }
      }
    },
    years() {
      const years = [];
      const year = parseInt(this.$moment().format("jYYYY")) + 10;
      for (let i = 1398; i < year; i++) {
        years.push(i)
      }
      return years
    }
  },
  watch: {
    year() {
      this.changeYear()
    }
  }
}
</script>

<style scoped>

</style>
