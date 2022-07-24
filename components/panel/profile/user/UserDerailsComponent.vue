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
                          user.birth_date ? $moment(user.birth_date).format("jYYYY/jMM/jDD") : '-' | persianDigit
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
    <delete-user-modal-component
      :open="showDelete"
      @close="remove"
      @remove="deleteUser"
    />
    <update-user-form-component
      :item="user"
      :open="showUpdateModal"
      @close="closeUpdateModal"
    />
  </div>
</template>

<script>
import UpdateUserFormComponent from "~/components/panel/profile/user/UpdateUserFormComponent";
import DeleteUserModalComponent from "~/components/global/delete/DeleteUserModalComponent";

export default {
  name: "UserDerailsComponent",
  components: {DeleteUserModalComponent, UpdateUserFormComponent},
  props: {
    user: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      showUpdateModal: false,
      showDelete: false,
    }
  },
  methods: {
    showUpdate() {
      this.toggleShowUpdateModal()
    },
    toggleShowUpdateModal() {
      this.showUpdateModal = !this.showUpdateModal
    },
    closeUpdateModal() {
      this.$emit('updated');
      this.toggleShowUpdateModal()
      this.item = null
    },
    remove() {
      this.showDelete = !this.showDelete
    },
    deleteUser() {
      this.$store.dispatch('users/removeUser', this.user.id)
        .then(() => {
          this.$router.go(-1)
        })
        .catch(err => {

        })
    },
  },
  computed: {
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    canDelete() {
      if (this.user.id === this.loginUser.id || this.loginUser.user_group_id !== 2) {
        return false
      }
      return this.user.user_group_id !== 2;
    },
  },
}
</script>

<style scoped>

</style>
