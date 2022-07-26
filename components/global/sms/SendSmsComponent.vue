<template>
  <div>
    <v-dialog
      v-model="show"
      persistent
      max-width="1056px"
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
            <span>فرم ارسال پیامک</span>
          </div>
          <v-spacer/>
          <div class="create-update-modal-regbox">
          </div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <div class="create-update-model-input-box">
                  <label>نوع ارسال</label>
                  <multiselect
                    v-model="type"
                    :options="types"
                    :multiple="false"
                    :close-on-select="true"
                    :clear-on-select="false"
                    :preserve-search="true"
                    label="name"
                    track-by="name"
                    placeholder=""
                    :show-labels="false">
                    <template slot="singleLabel" slot-scope="props"><span
                      class="option__desc"><span
                      class="option__title">{{ props.option.name }}</span></span>
                    </template>
                    <template slot="option" slot-scope="props">
                      <div class="option__desc"><span
                        class="option__title">{{ props.option.name }}</span></div>
                    </template>
                  </multiselect>
                </div>
              </v-col>
              <v-col
                cols="12"
                v-if="type && type.id === 2"
              >
                <div class="create-update-model-input-box">
                  <label>کاربران</label>
                  <multiselect
                    v-model="selectedUsers"
                    :options="users"
                    :multiple="multiple"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    label="fname"
                    track-by="fname"
                    searchable
                    placeholder=""
                    :show-labels="false">
                    <template slot="singleLabel" slot-scope="props"><span
                      class="option__desc"><span
                      class="option__title">{{ `${props.option.fname} ${props.option.lname}` }}</span></span>
                    </template>
                    <template slot="option" slot-scope="props">
                      <div class="option__desc"><span
                        class="option__title">{{ `${props.option.fname} ${props.option.lname}` }}</span></div>
                    </template>
                  </multiselect>
                </div>
              </v-col>
              <v-col
                cols="12"
                v-if="type && type.id === 1"
              >
                <custom-text-input
                  :label="'شماره'"
                  :error="errors.phone_number"
                  v-model="form.phone_number"
                  @input="errors.phone_number = ''"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <div class="create-update-model-input-box">
                  <label>متن پیامک</label>
                  <textarea
                    v-model="form.msg"
                    rows="4"
                  ></textarea>
                  <div class="sms-number">تعداد پیامک: <span>{{ smsNumber | toPersianNumber }}</span></div>
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
                  @click="toggleCreateModal"
                >
                  ارسال
                </button>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showCreateModal"
      max-width="680"
    >
      <v-card
        class="accept-file-remove-model"
      >
        <button
          class="close"
          @click="toggleCreateModal"
        >
          <v-icon>mdi-close</v-icon>
        </button>
        <v-card-title class="accept-file-remove-title">
          <span>ارسال پیامک</span>
        </v-card-title>

        <v-card-text
          class="accept-file-remove-text"
        >
          آیا از ارسال پیامک اطمینان دارید؟
        </v-card-text>

        <v-card-actions>
          <button
            class="action-button accept-button"
            @click="toggleCreateModal"

          >
            خیر
          </button>
          <v-spacer></v-spacer>
          <button
            class="action-button cancel-button"
            @click="createMessage"
          >
            بله، ارسال کن
          </button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CustomTextInput from "~/components/custom/CustomTextInput";

export default {
  name: "SendSmsComponent",
  components: {CustomTextInput},
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    selectedItems: {
      type: Array,
      required: true,
      default: () => [],
    },
    users: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      form: {
        msg: '',
        numbers: [],
        phone_number: '',
      },
      errors: {
        phone_number: '',
        msg: '',
        numbers: '',
      },
      showCreateModal: false,
      type: {
        id: 1,
        name: 'تک شماره'
      },
      types: [
        {
          id: 1,
          name: 'تک شماره'
        },
        {
          id: 2,
          name: 'همه کاربران انتخاب شده'
        },
        {
          id: 3,
          name: 'همه کاربران'
        },
      ]
    }
  },
  methods: {
    closeForm() {
      this.showCreateModal = false
      this.$emit('close')
    },
    clearForm() {
      this.form = {
        msg: '',
        numbers: [],
      }
      this.$emit('clear')
    },
    createMessage() {
      const data = {
        ...this.form,
        type: this.type.id,
      }
      if (this.isAdmin) {
        data.organization_id = null
      }
      this.$store.dispatch('messages/createMessage', data)
        .then(() => {
          setTimeout(() => {
            this.clearForm()
            this.closeForm()
          }, 50)
        })
    },
    toggleCreateModal() {
      this.showCreateModal = !this.showCreateModal
    }
  },
  computed: {
    show() {
      return this.open
    },
    selectedUsers: {
      get() {
        return this.selectedItems
      },
      set(value) {
        this.$emit('selected', value)
      }
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    smsNumber() {
      return parseInt(Math.ceil(this.form.msg.length / 68))
    },
  },
  watch: {
    selectedUsers(items) {
      this.form.numbers = items.map(i => i.tel)
    },
    type(val) {
      if (!val) {
        this.type = {
          id: 1,
          name: 'تک شماره'
        }
      }
    },
  }
}
</script>

<style scoped>

</style>
