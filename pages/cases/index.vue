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
            علت مراجعه
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
                  <span>فرم ایجاد علت مراجعه</span>
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
                      sm="6"
                      md="6"
                    >
                      <div class="create-update-model-input-box">
                        <label>عنوان</label>
                        <input type="text" v-model="form.name">
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <div class="create-update-model-input-box">
                        <label>مدت زمان ویزیت (دقیقه)</label>
                        <input type="number" v-model="form.duration">
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <div class="create-update-model-input-box">
                        <custom-radio-box
                          v-model="form.is_limited"
                          label="دارای محدودیت"
                          :rtl="true"
                        />
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      v-if="form.is_limited"
                    >
                      <div class="create-update-model-input-box">
                        <label>میزان محدودیت (در صورت تمایل)</label>
                        <input type="number" v-model="form.limitation">
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
                        @click="createCaseType"
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
                      <div class="create-update-model-input-description">آیا از حذف کردن این علت مراجعه اطمینان دارید؟
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
                :total="cases.total_rows"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in cases.data" :key="n">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 | persianDigit }}</td>
                    <td class="text-center">
                      <span class="file-id">
                        {{ i.name ? i.name : '-'  }}
                      </span>
                    </td>
                    <td class="text-center">{{ i.duration | persianDigit }}</td>
                    <td class="text-center">{{ i.is_limited ? i.limitation : '-' | persianDigit }}</td>
                    <td class="text-center flex flex-row justify-space-around align-center">
                      <button @click="editCase(i)" class="action-buttons">
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
                  <div v-if="cases.total_rows === 0">اطلاعاتی یافت نشد</div>
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
import CustomRadioBox from "~/components/panel/global/CustomInput/CustomRadioBox";

export default {
  name: "index",
  layout: "panel",
  middleware: "auth",
  components: {CustomRadioBox, DataTableComponent},
  mounted() {
    this.paginate()
  },
  methods: {
    getCaseList() {
      this.showFilterModal = false
      this.$store.dispatch('cases/getList', this.search)
    },
    paginate(page = 1) {
      this.search.page = page
      this.getCaseList()
    },
    showRemoveItem(id) {
      this.selectedItem = id
      this.toggleRemoveItemModal()
    },
    toggleRemoveItemModal() {
      this.showRemoveItemModal = !this.showRemoveItemModal
    },
    cancelRemoveItem() {
      this.selectedItem = null
      this.toggleRemoveItemModal()
    },
    removeItem() {
      if (!this.selectedItem) return
      this.$store.dispatch('cases/removeCaseType', this.selectedItem)
        .finally(() => {
          setTimeout(() => {
            this.toggleRemoveItemModal()
            this.getCaseList()
          }, 50)
        })
    },
    editCase(caseType) {
      this.create = false
      this.form = {
        id: caseType.id,
        name: caseType.name,
        duration: caseType.duration,
        is_limited: caseType.is_limited,
        limitation: caseType.limitation,
        organization_id: caseType.organization_id,
      }
      this.toggleCreateModal()
    },
    closeForm() {
      this.clearForm()
      this.toggleCreateModal()
    },
    toggleCreateModal() {
      this.showCreateModal = !this.showCreateModal
    },
    createModal() {
      this.create = true
      this.toggleCreateModal()
    },
    clearForm() {
      this.form = {
        id: null,
        name: '',
        duration: 0,
        is_limited: false,
        limitation: 0,
        type: 1,
        organization_id: null,
      }
    },
    createCaseType() {
      const type = this.create ? 'cases/createCaseType' : 'cases/updateCaseType'
      this.$store.dispatch(type, {
        id: this.form.id,
        name: this.form.name,
        is_limited: this.form.is_limited,
        duration: parseInt(this.form.duration),
        limitation: parseInt(this.form.limitation),
        type: 1,
        organization_id: this.form.organization_id ? parseInt(this.form.organization_id) : parseInt(this.loginUser.organization_id),
      })
        .then(() => {
          setTimeout(() => {
            this.closeForm()
            this.showCreateModal = false
            this.getCaseList()
          }, 50)
        })
    },
  },
  data() {
    return {
      showCreateModal: false,
      showRemoveItemModal: false,
      create: false,
      headers: [
        '',
        'عنوان',
        'مدت ویزیت (دقیقه)',
        'میزان محدودیت',
        'عملیات',
      ],
      search: {
        page: 1,
      },
      form: {
        id: null,
        name: '',
        duration: 0,
        is_limited: false,
        limitation: 0,
        organization_id: null,
      }
    }
  },
  computed: {
    cases() {
      return this.$store.getters['cases/getList']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    }
  }
}
</script>

<style scoped>

</style>
