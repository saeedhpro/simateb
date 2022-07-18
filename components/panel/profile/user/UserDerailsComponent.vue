<template>
  <div class="profile-details">
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-row>
          <v-col
            cols="12"
            md="2"
          >
            <img
              class="profile-image"
              :src="user.logo ? user.logo : 'https://randomuser.me/api/portraits/men/88.jpg'">
          </v-col>
          <v-col
            cols="12"
            md="10"
          >
            <div class="detail-box">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-row style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">نام و نام خانوادگی:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{ `${user.fname} ${user.lname}` | persianDigit }}</div>
                    </v-col>
                  </v-row>
                  <v-row style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">سن:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{ user.age | persianDigit }} سال</div>
                    </v-col>
                  </v-row>
                  <v-row style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">شماره موبایل:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{ user.tel | persianDigit }}</div>
                    </v-col>
                  </v-row>
                  <v-row style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">شماره تماس:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{ user.tel1 ? user.tel1 : '-' | persianDigit }}</div>
                    </v-col>
                  </v-row>
                  <v-row style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">شماره پرونده:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box file-id-box">
                        پرونده <span class="file-id">{{ user.file_id ? user.file_id : '-' | persianDigit }}</span>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                >
                  <v-row style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">کد ملی:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{ user.cardno | persianDigit }}</div>
                    </v-col>
                  </v-row>
                  <v-row style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">تاریخ تولد:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{
                          $moment(user.birth_date).format("jYYYY/jMM/jDD") | persianDigit
                        }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">استان:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{ user.province ? user.province.name : '-' | persianDigit }}</div>
                    </v-col>
                  </v-row>
                  <v-row style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">شهرستان:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{ user.county ? user.county.name : '-' | persianDigit }}</div>
                    </v-col>
                  </v-row>
                  <v-row style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">شهر:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{ user.city ? user.city.name : '-' | persianDigit }}</div>
                    </v-col>
                  </v-row>
                  <v-row style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">آدرس:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{ user.address ? user.address : '-' | persianDigit }}</div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
      >
        <v-dialog
          v-model="showDelete"
          max-width="680"
        >
          <v-card
            class="accept-file-remove-model"
          >
            <button
              class="close"
              @click="remove"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <v-card-title class="accept-file-remove-title">
              <span>حذف کاربر</span>
            </v-card-title>

            <v-card-text
              class="accept-file-remove-text"
            >
              آیا از حذف کردن این کاربر اطمینان دارید؟<br/>
              لطفا دقت کنید که پس از حذف، اطلاعات کاربر قابل بازگشت نیست
            </v-card-text>

            <v-card-actions>
              <button
                class="action-button accept-button"
                @click="remove"

              >
                خیر
              </button>
              <v-spacer></v-spacer>
              <button
                class="action-button red-button"
                @click="deleteUser"
              >
                بله، حذف کن
              </button>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <div class="description-box">
          <div class="action-box">
            <v-menu
              close-on-content-click
              offset-y
              v-if="canDelete"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  class="more-action-button"
                >
                  <v-icon>
                    mdi-dots-horizontal
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  @click="remove"
                >
                  <v-list-item-title>حذف کاربر</v-list-item-title>
                </v-list-item>
                <v-divider/>
              </v-list>
            </v-menu>
            <div
              @click="showMedicalHistory"
              class="action-button">
              <v-icon>
                mdi-card-account-details-outline
              </v-icon>
              <span>تاریخچه درمانی</span>
            </div>
            <div
              class="action-button"
              @click="showUpdate"
            >
              <v-icon>
                mdi-pencil-outline
              </v-icon>
              <span>ویرایش اطلاعات</span>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <update-user-form-component
      :is-admin="false"
      :item="user"
      :open="showUpdateModal"
      @close="closeUpdateModal"
    />
    <user-medical-history-component
      v-if="user"
      :open="showHistoryModal"
      :user="user"
      @close="toggleHistoryModal"
    />
  </div>
</template>

<script>
import UserMedicalHistoryComponent from "~/components/panel/profile/user/UserMedicalHistoryComponent";
import UpdateUserFormComponent from "~/components/panel/profile/user/UpdateUserFormComponent";

export default {
  name: "UserDerailsComponent",
  components: {UpdateUserFormComponent, UserMedicalHistoryComponent},
  props: {
    user: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      showDelete: false,
      showHistoryModal: false,
      showUpdateModal: false,
    }
  },
  methods: {
    remove() {
      this.showDelete = !this.showDelete
    },
    deleteUser() {
      this.$store.dispatch('users/removeUser', this.user.id)
        .then(() => {
          this.$router.push({
            path: '/organization',
          })
        })
        .catch(err => {

        })
    },
    showUpdate() {
      this.toggleShowUpdateModal()
    },
    toggleShowUpdateModal() {
      this.showUpdateModal = !this.showUpdateModal
    },
    closeUpdateModal() {
      this.$emit('updated');
      this.toggleShowUpdateModal()
    },
    showMedicalHistory() {
      this.getMedicalHistory()
      this.toggleHistoryModal()
    },
    toggleHistoryModal() {
      this.showHistoryModal = !this.showHistoryModal
    },
    getMedicalHistory() {
      this.$store.dispatch('users/getMedicalHistory', this.user.id)
    },
  },
  computed: {
    canDelete() {
      if (this.user.id === this.loginUser.id) {
        return false
      }
      return this.user.user_group_id !== 2;
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    }
  },
}
</script>

<style scoped>

</style>
