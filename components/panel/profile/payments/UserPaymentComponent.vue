<template>
  <div class="user-payments-component">
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
              md="2"
            >
              <div class="payment-detail">
                <span>مجموع هزینه درمان:</span>
                <span>{{ total.due_total | toPersianCurrency('تومان', 1) }}</span>
              </div>
            </v-col>
            <v-col
              cols="12"
              md="2"
            >
              <div class="payment-detail">
                <span>مجموع پرداخت‌ها:</span>
                <span>{{ total.total | toPersianCurrency('تومان', 1) }}</span>
              </div>
            </v-col>
            <v-col
              cols="12"
              md="2"
            >

            </v-col>
            <v-spacer/>
            <v-col
              cols="12"
              md="2"
            >
              <div class="page-actions"
                   style="min-width: 220px"
                   @click="toggleCreateModal"
              >
                <img src="/images/pages/plus.svg" alt="users">
                <span class="title-main">ثبت پرداخت</span>
              </div>
            </v-col>
          </v-row>
          <v-row class="search-box">
            <v-col
              cols="12"
              sm="12"
              md="3"
            >
              <div class="right-box">
                <v-checkbox
                  v-model="selectedAll"
                ></v-checkbox>
                <div class="selected-count" v-if="selectedUsers.length > 0">
                  {{ selectedUsers.length | persianDigit }}
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
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <data-table-component
                :headers="headers"
                :page="page"
                :total="payments.total_rows"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in payments.data" :key="n">
                    <td class="text-center">{{ (page - 1) * 10 + n + 1 | persianDigit }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <input type="checkbox"
                               class="table-selectable-checkbox"
                               v-model="selectedPayments"
                               :value="i"
                               :ripple="false"
                        />
                        <img :src="i.user ? i.user.logo : 'https://randomuser.me/api/portraits/men/88.jpg'">
                        <span> {{
                            i.user ? `${i.user.fname} ${i.user.lname}` : '-' | persianDigit
                          }}</span>
                      </div>
                    </td>
                    <td class="text-center dir-ltr">
                      {{ i.created ? $moment.utc(i.created).local().format('jYYYY/jM/jDD HH:mm:ss') : '-' | persianDigit }}
                    </td>
                    <td class="text-center">
                      {{ i.amount | persianDigit }}
                    </td>
                    <td class="text-center">
                      {{ i.trace_code ? i.trace_code : '-' | persianDigit }}
                    </td>
                    <td class="text-center">
                      <span class="file-id main">
                          {{ getPayType(i.paytype) | persianDigit }}
                      </span>
                    </td>
                    <td class="text-center">
                      {{ getPaidFor(i.paid_for) | persianDigit }}
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="payments.total_rows === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <send-sms-component
      :users="allUsers"
      :multiple="true"
      :selectedItems="selectedUsers"
      :open="showSmsModal"
      @selected="itemSelected"
      @close="closeSmsForm"
    />
    <admin-delete-users-component
      :open="showDelete"
      @close="toggleRemove"
      @remove="remove"
      :title="`پرداخت ها`"
    />
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
              @click="toggleCreateModal"
              class="create-update-modal-close"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <span>ثبت پرداخت</span>
          </div>
          <v-spacer/>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>نام بیمار</label>
                  <input disabled type="text" :value="fullName">
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>تاریخ</label>
                  <date-picker
                    v-model="form.created"
                    format="YYYY-MM-DD HH:mm:ss"
                    display-format="jYYYY/jMM/jDD HH:mm:ss"
                    editable
                    type="datetime"
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
                sm="6"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <custom-price-input
                    :label="'مبلغ'"
                    :error="errors.amount"
                    v-model="form.amount"
                    @input="changed"
                  />
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <custom-multi-select
                    v-model="payType"
                    :items="payTypes"
                    :error="errors.payType"
                    label="شکل پرداخت"
                  />
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <custom-multi-select
                    v-model="paidFor"
                    :items="paidFors"
                    :error="errors.paidFor"
                    label="پرداخت برای"
                  />
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <custom-text-input
                    :label="'کد پیگیری'"
                    v-model="form.trace_code"
                  />
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <custom-text-input
                    :label="'واریز به'"
                    v-model="form.paid_to"
                  />
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
                v-if="form.paytype === 3"
              >
                <div class="create-update-model-input-box">
                  <custom-text-input
                    :label="'چک برای بانک'"
                    :errors="errors.check_bank"
                    v-model="form.check_bank"
                  />
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
                v-if="form.paytype === 3"
              >
                <div class="create-update-model-input-box">
                  <custom-text-input
                    :label="'شماره چک'"
                    :errors="errors.check_num"
                    v-model="form.check_num"
                  />
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
                v-if="form.paytype === 3"
              >
                <div class="create-update-model-input-box">
                  <label>تاریخ چک</label>
                  <date-picker
                    v-model="form.check_date"
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
              >
                <div class="create-update-model-input-box">
                  <custom-text-area-input
                    v-model="form.info"
                    label="توضیحات"
                    :rows="5"
                  />
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
                  @click="toggleCreateModal"
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
                  @click="createPayment"
                >
                  ثبت
                </button>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import SendSmsComponent from "~/components/global/sms/SendSmsComponent";
import CustomPriceInput from "~/components/custom/CustomPriceInput";
import CustomMultiSelect from "~/components/custom/CustomMultiSelect";
import CustomTextAreaInput from "~/components/custom/CustomTextAreaInput";
import CustomTextInput from "~/components/custom/CustomTextInput";
import AdminDeleteUsersComponent from "~/components/admin/global/AdminDeleteUsersComponent";

export default {
  name: "UserPaymentComponent",
  components: {
    AdminDeleteUsersComponent,
    CustomTextInput,
    CustomTextAreaInput, CustomMultiSelect, CustomPriceInput, SendSmsComponent, DataTableComponent
  },
  props: {
    userId: {
      type: Number,
      required: true,
    },
    organizationId: {
      type: Number,
      required: true,
    },
    fullName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      page: 1,
      items: [
        {
          id: 1,
          label: 'حذف'
        },
        {
          id: 2,
          label: 'ارسال پیامک'
        }
      ],
      headers: [
        '',
        'بیمار',
        'تاریخ',
        'مبلغ (تومان)',
        'کد پیگیری',
        'شکل پرداخت',
        'پرداخت برای',
      ],
      action: null,
      actions: [
        {
          id: 0,
          label: 'اقدام جمعی'
        },
        {
          id: 1,
          label: 'حذف کن'
        },
        {
          id: 2,
          label: 'ارسال پیامک'
        }
      ],
      selectedUsers: [],
      selectedPayments: [],
      showSmsModal: false,
      showDelete: false,
      showCreateModal: false,
      form: {
        user_id: this.userId,
        created: this.$moment().format('YYYY/MM/DD HH:mm:ss'),
        amount: 0,
        paytype: 4,
        paid_for: 1,
        paid_to: '',
        info: '',
        trace_code: '',
        check_bank: '',
        check_num: '',
        check_date: '',
      },
      errors: {
        amount: '',
        check_bank: '',
        check_num: '',
      },
      payType: {
        id: 4,
        name: 'کارت به کارت'
      },
      payTypes: [
        {
          id: 2,
          name: 'نقدی'
        },
        {
          id: 3,
          name: 'چک'
        },
        {
          id: 4,
          name: 'کارت به کارت'
        },
      ],
      paidFor: {
        id: 1,
        name: 'قسط درمان'
      },
      paidFors: [
        {
          id: 1,
          name: 'قسط درمان'
        },
        {
          id: 2,
          name: 'هزینه های جانبی'
        },
      ],
    }
  },
  mounted() {
    this.paginate()
    this.getUserPaymentsTotal()
    this.getAllUsers()
  },
  methods: {
    changed(e) {
    },
    clearForm() {
      this.form = {
        user_id: this.userId,
        created: this.$moment().format('YYYY/MM/DD HH:mm:ss'),
        amount: 0,
        paytype: 4,
        paid_for: 1,
        paid_to: '',
        info: '',
        trace_code: '',
        check_bank: '',
        check_num: '',
        check_date: '',
      }
      this.errors = {
        amount: '',
        check_bank: '',
        check_num: '',
      }
    },
    toggleRemove() {
      this.showDelete = !this.showDelete
    },
    itemSelected(e) {
      this.selectedUsers = e
    },
    closeSmsForm() {
      this.selectedPayments = []
      this.action = null
      this.toggleSmsModal()
    },
    toggleSmsModal() {
      this.showSmsModal = !this.showSmsModal
    },
    toggleCreateModal() {
      this.showCreateModal = !this.showCreateModal
    },
    doAction() {
      if (!this.action) return
      switch (this.action) {
        case 1:
        case '1':
          this.toggleRemove();
          break;
        case 2:
        case '2':
          this.toggleSmsModal();
          break;
      }
    },
    remove() {
      this.deletePayments(this.selectedPayments.map(i => i.id))
      this.toggleRemove()
    },
    deletePayments(ids) {
      this.$store.dispatch('payments/deletePayments', {
        ids
      })
        .then(() => {
          this.getUserPayments()
          this.action = null
          this.selectedPayments = []
        })
    },
    createPayment() {
      this.errors.amount = ''
      if (this.validate()) {
        const data = {
          ...this.form,
          amount: parseFloat(this.form.amount.split(' ')[0].split(',').join('')),
        }
        this.$store.dispatch('payments/createPayment', data)
          .then(res => {
            console.log(res)
            this.clearForm()
            this.toggleCreateModal()
            this.paginate()
          })
      }
    },
    validate() {
      let validated = true
      const amount = this.form.amount.split(' ')[0].split(',').join('')
      if (!amount) {
        this.errors.amount = 'فیلد مبلغ الزامی است!'
        validated = false
      }
      if (amount < 1000) {
        this.errors.amount = 'مبلغ باید بیشتر از ۱۰۰۰ تومان باشد!'
        validated = false
      }
      if (this.form.paytype === 3) {
        if (!this.form.check_bank) {
          this.errors.check_bank = 'فیلد بانک الزامی است!'
          validated = false
        }
        if (!this.form.check_num) {
          this.errors.check_num = 'فیلد شماره چک الزامی است!'
          validated = false
        }
      }
      return validated
    },
    paginate(page = 1) {
      this.page = page
      this.getUserPayments()
    },
    getUserPayments() {
      this.$store.dispatch('payments/getList', {
        id: this.userId,
        page: this.page,
      })
    },
    getUserPaymentsTotal() {
      this.$store.dispatch('payments/getUserPaymentsTotal', this.userId)
    },
    getAllUsers() {
      this.$store.dispatch('users/getOrganizationUsers', this.organizationId)
    },
    getPaidFor(paidFor) {
      switch (paidFor) {
        case 1:
        case '1':
          return 'قسط درمان'
        case 2:
        case '2':
          return 'هزینه های جانبی'
        default:
          return '-'
      }
    },
    getPayType(payType) {
      switch (payType) {
        case 2:
        case '2':
          return 'نقدی'
        case 3:
        case '3':
          return 'چک'
        case 4:
        case '4':
          return 'کارت به کارت'
        default:
          return '-'
      }
    },
  },
  computed: {
    payments() {
      return this.$store.getters['payments/getList']
    },
    allUsers() {
      return this.$store.getters['users/getUsers']
    },
    selectedAll: {
      get() {
        return this.selectedPayments.length > 0 && this.selectedPayments.length === this.payments.data.length
      },
      set(bool) {
        if (bool) {
          this.selectedPayments = []
          this.selectedPayments = this.payments.data
        } else {
          this.selectedPayments = []
        }
      }
    },
    total() {
      return this.$store.getters['payments/getUserPaymentsTotal']
    }
  },
  watch: {
    selectedPayments() {
      this.selectedUsers = this.selectedPayments.map(i => i.user)
    },
    payType(val) {
      if (val) {
        this.form.paytype = val.id
        if (val.id !== 3) {
          this.form.check_bank = ''
          this.form.check_num = ''
          this.form.check_date = ''
        }
      } else {
        this.payType = {
          id: 4,
          name: 'کارت به کارت',
        }
      }
    },
    paidFor(val) {
      if (val) {
        this.form.paid_for = val.id
      } else {
        this.paidFor = {
          id: 1,
          name: 'قسط درمان',
        }
      }
    },
  }
}
</script>

<style scoped lang="scss">
.user-payments-component {
  .payment-detail {
    text-align: left;
    font: normal normal 500 16px/28px IRANYekanRegular !important;
    letter-spacing: 0;
    color: #3D3D66;
  }
}
</style>
