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
                      <div class="value-box">{{ `${user.fname} ${user.lname}` | persianDigit }}</div>
                    </v-col>
                    <v-divider vertical />
                    <v-col cols="6">
                      <div class="value-box file-id-box text-left">
                        پرونده <span class="file-id">{{ user.file_id ? user.file_id : '-' | persianDigit }}</span>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row style="width: 100%">
                    <v-col cols="6">
                      <div class="value-box">{{ user.tel | persianDigit }}</div>
                    </v-col>
                  </v-row>
                  <v-row style="width: 100%">
                    <v-col cols="6">
                      <div class="value-box">{{ user.age | persianDigit }} سال</div>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                >
                  <v-row style="width: 100%">
                    <v-col cols="12">
                      <div class="label-box text-right label-description">توضیحات:</div>
                    </v-col>
                    <v-col cols="12">
                      <div class="value-box">{{ user.address ? user.address : '-' | persianDigit }}</div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <delete-user-modal-component
        :open="showDelete"
        @close="remove"
        @remove="deleteUser"
      />
    </v-row>
    <admin-update-user-form-component
      v-if="isAdmin"
      :item="user"
      :open="showUpdateModal"
      @close="closeUpdateModal"
    />
    <update-user-form-component
      v-else
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
import AdminUpdateUserFormComponent from "~/components/admin/user/AdminUpdateUserFormComponent";
import DeleteUserModalComponent from "~/components/global/delete/DeleteUserModalComponent";

export default {
  name: "ShowUserDerailsComponent",
  components: {
    DeleteUserModalComponent,
    AdminUpdateUserFormComponent, UpdateUserFormComponent, UserMedicalHistoryComponent},
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
          this.$router.go(-1)
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
      this.item = null
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
      if (this.user.id === this.loginUser.id || this.loginUser.user_group_id !== 2) {
        return false
      }
      return this.user.user_group_id !== 2;
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    isAdmin() {
      if (!this.loginUser) return false
      return this.loginUser.user_group_id === 2
    }
  },
}
</script>

<style scoped>

</style>
