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
          ثبت در سیستم توسط: {{ `${loginUser.staff.lname} ${loginUser.staff.fname}` }}
          ({{ loginUser.created | toRelativeDate }} {{
            loginUser.created | toPersianDate('YYYY/MM/DD HH:mm:ss')
          }})
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
                ذخیره
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
export default {
  name: "SendSmsComponent",
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
      },
      showCreateModal: false,
    }
  },
  methods: {
    closeForm() {
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
      this.toggleCreateModal()
      this.$store.dispatch('messages/createMessage', this.form)
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
    }
  },
  watch: {
    selectedUsers(items) {
      this.form.numbers = items.map(i => i.tel)
    }
  }
}
</script>

<style scoped>

</style>
