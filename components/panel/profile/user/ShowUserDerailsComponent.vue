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
            sm="6"
            md="2"
          >
            <img
              @click="openImageChooser"
              class="profile-image"
              :src="getLogo(user)">
            <div
              class="hidden-lg-and-up user-details-box small"
              v-if="isDoctor"
            >
              <div class="label-box">استان:</div>
              <div class="value-box">{{ user.province ? user.province.name : '-' }}</div>
              <div class="label-box">شهرستان:</div>
              <div class="value-box">{{ user.county ? user.county.name : '-' }}</div>
              <div class="label-box">شهر:</div>
              <div class="value-box">{{ user.city ? user.city.name : '-' }}</div>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="10"
            class="hidden-md-and-down"
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
                      <div class="value-box">{{ `${user.fname} ${user.lname}` }}</div>
                    </v-col>
                  </v-row>
                  <v-row style="width: 100%" v-if="user.age > 0">
                    <v-col cols="6">
                      <div class="label-box">سن:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{ user.age }} سال</div>
                    </v-col>
                  </v-row>
                  <v-row style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">شماره موبایل:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{ user.tel }}</div>
                    </v-col>
                  </v-row>
                  <v-row v-if="isDoctor" style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">شماره تماس:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{ user.tel1 ? user.tel1 : '-' }}</div>
                    </v-col>
                  </v-row>
                  <v-row v-if="isDoctor" style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">شماره پرونده:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box file-id-box">
                        پرونده <span class="file-id">{{ user.file_id ? user.file_id : '-' }}</span>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row v-if="!isDoctor"  style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">تاریخ تولد:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{
                          user.birth_date ? $moment(user.birth_date).format("jYYYY/jMM/jDD") : '-'
                        }}
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="hidden-sm-and-down"
                >
                  <v-row v-if="isDoctor" style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">کد ملی:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{ user.cardno }}</div>
                    </v-col>
                  </v-row>
                  <v-row v-if="isDoctor"  style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">تاریخ تولد:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{
                          user.birth_date ? $moment(user.birth_date).format("jYYYY/jMM/jDD") : '-'
                        }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row v-if="isDoctor" style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">استان:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{ user.province ? user.province.name : '-' }}</div>
                    </v-col>
                  </v-row>
                  <v-row v-if="isDoctor" style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">شهرستان:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{ user.county ? user.county.name : '-' }}</div>
                    </v-col>
                  </v-row>
                  <v-row v-if="isDoctor"  style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">شهر:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{ user.city ? user.city.name : '-' }}</div>
                    </v-col>
                  </v-row>
                  <v-row v-if="isDoctor" style="width: 100%">
                    <v-col cols="6">
                      <div class="label-box">آدرس:</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="value-box">{{ user.address ? user.address : '-' }}</div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="10"
            class="hidden-lg-and-up"
          >
            <div
              class="user-details-box small"
            >
              <div class="label-box">نام و نام خانوادگی:</div>
              <div class="value-box">{{ `${user.fname} ${user.lname}` }}</div>
              <div class="label-box" v-if="user.age > 0">سن:</div>
              <div class="value-box" v-if="user.age > 0">{{ user.age }} سال</div>
              <div class="label-box">شماره موبایل:</div>
              <div class="value-box">{{ user.tel }}</div>
              <div class="label-box">شماره تماس:</div>
              <div class="value-box">{{ user.tel1 ? user.tel1 : '-' }}</div>
              <div class="label-box">شماره پرونده:</div>
              <div class="value-box file-id-box">
                پرونده <span class="file-id">{{ user.file_id ? user.file_id : '-' }}</span>
              </div>
              <div class="label-box">تاریخ تولد:</div>
              <div class="value-box">{{user.birth_date ? $moment(user.birth_date).format("jYYYY/jMM/jDD") : '-' }}</div>
              <div class="label-box">آدرس:</div>
              <div class="value-box">{{ user.address ? user.address : '-' }}</div>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
      >
        <div class="description-box"
          v-if="isDoctor"
        >
          <div class="action-box">
            <v-menu
              close-on-content-click
              offset-y
              offset-x
              location="end"
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
              <v-list
                class="delete-user-btn"
              >
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
              @click="showMedicalHistory"
            >
              <v-icon>
                mdi-card-account-details-outline
              </v-icon>
              <span>تاریخچه درمان</span>
            </div>
            <div
              class="action-button"
              @click="showUpdate"
              v-if="canSeeUpdateUser"
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
    <admin-update-user-form-component
      v-if="isAdmin"
      :item="user"
      :open="showUpdateModal"
      @close="closeUpdateModal"
      @updated="updatedUpdateModal"
    />
    <update-user-form-component
      v-else
      :item="user"
      :open="showUpdateModal"
      @close="closeUpdateModal"
      @updated="updatedUpdateModal"
    />
    <user-medical-history-component
      v-if="user"
      :open="showHistoryModal"
      :user="user"
      @close="toggleHistoryModal"
    />
    <delete-user-modal-component
      :open="showNextDelete"
      @remove="deleteUser"
      @close="removeNext"
    />
    <alert-delete-user-modal-component
      :open="showDelete"
      @remove="removeNext"
      @close="remove"
    />
    <crop-image-component
      ref="crop"
      @changed="cropped"
      @imaged="imaged"
      @newImage="openImageChooser"
    />
    <input
      type="file"
      ref="file"
      name="image"
      hidden
      accept="image/*"
      @change="setCropImage"
    >
    <v-dialog
      v-model="showUpdateImage"
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
              @click="closeUpdateImageForm"
              class="create-update-modal-close"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <span>ویرایش عکس پروفایل بیمار</span>
          </div>
          <v-spacer/>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div
              v-if="loading"
            >
              <LoadingCard />
            </div>
            <v-img
              v-else
              :src="image"
              max-height="200px"
              max-width="200px"
            />
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-spacer/>
              <v-col
                cols="12"
                sm="3"
                md="3"
              >
                <button
                  class="second-button full-width"
                  @click="closeUpdateImageForm"
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
                  @click="updateProfile"
                >
                  ذخیره
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
import UserMedicalHistoryComponent from "~/components/panel/profile/user/UserMedicalHistoryComponent";
import UpdateUserFormComponent from "~/components/panel/profile/user/UpdateUserFormComponent";
import AdminUpdateUserFormComponent from "~/components/admin/user/AdminUpdateUserFormComponent";
import DeleteUserModalComponent from "~/components/global/delete/DeleteUserModalComponent";
import AlertDeleteUserModalComponent from "~/components/global/alert/AlertDeleteUserModalComponent";
import CropImageComponent from "~/components/panel/global/CropImageComponent.vue";
import LoadingCard from "~/components/global/LoadingCard.vue";

export default {
  name: "ShowUserDerailsComponent",
  components: {
    LoadingCard,
    CropImageComponent,
    DeleteUserModalComponent,
    AlertDeleteUserModalComponent,
    AdminUpdateUserFormComponent, UpdateUserFormComponent, UserMedicalHistoryComponent
  },
  props: {
    user: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      loading: false,
      showDelete: false,
      showNextDelete: false,
      showHistoryModal: false,
      showUpdateModal: false,
      showUpdateImage: false,
      image: null,
    }
  },
  methods: {
    remove() {
      this.showDelete = !this.showDelete
    },
    removeNext() {
      this.showDelete = false
      this.showNextDelete = !this.showNextDelete
    },
    deleteUser() {
      this.$store.dispatch('users/removeUser', this.user.id)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
          this.$router.go(-1)
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
    },
    showUpdate() {
      this.toggleShowUpdateModal()
    },
    toggleShowUpdateModal() {
      this.showUpdateModal = !this.showUpdateModal
    },
    closeUpdateModal() {
      this.toggleShowUpdateModal()
      this.item = null
    },
    updatedUpdateModal() {
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
    getLogo(user) {
      if (user.logo) {
        return user.logo
      } else {
        if (user.gender == 'female') {
          return '/images/profile/woman.svg'
        } else {
          return '/images/profile/man.svg'
        }
      }
    },
    openImageChooser() {
      this.$refs.file.value = null
      this.$refs.file.click()
    },
    setCropImage(e) {
      this.$refs.crop.setImage(e)
    },
    cropped(file) {
    },
    imaged(file) {
      if (!file) return
      this.image = file
      this.showUpdateImage = true
    },
    closeUpdateImageForm() {
      this.image = null
      this.showUpdateImage = false
    },
    updateProfile() {
      this.loading = true
      const data = {
        image: this.image,
        id: this.user.id
      }
      this.$store.dispatch('users/updateUserProfileImage', data)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
          this.closeUpdateImageForm()
          this.$emit('updated');
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
        .finally(() => {
          this.closeUpdateImageForm()
          this.loading = false
        })
    }
  },
  computed: {
    isDoctor() {
      if (!this.loginUser) return false;
      return this.loginUser.organization.is_doctor;
    },
    canDelete() {
      if (this.user.id === this.loginUser.id) {
        return false
      }
      return this.user.organization_id === this.loginUser.organization_id || this.loginUser.user_group_id === 2;
    },
    canSeeUpdateUser() {
        return this.loginUser.user_group_id === 2 ||
          this.loginUser.user_group_id === 3 ||
          this.loginUser.user_group_id === 4 ||
          this.loginUser.user_group_id === 5
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

<style scoped lang="scss">

.description-box {
  .action-button {
    transition: all .3s ease-in-out;
    &:hover {
      background: #F6F7FF 0 0 no-repeat padding-box !important;
      box-shadow: 0 12px 16px rgb(80 99 255 / 16%) !important;
      border: 1px solid #5063FF !important;
      outline: none !important;
      transition: all .3s ease-in-out;
    }
  }
}
.delete-user-btn {
  padding: 1px 3px !important;
  background: #FFF5F5 0 0 no-repeat padding-box;
  box-shadow: 0 2px 4px #F4433629;
  border: 1px solid #F44336;
  border-radius: 8px;
  .v-list-item {
    color: #F44336 !important;
    background: #FFF5F5 !important;
  }
}
</style>
