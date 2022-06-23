<template>
  <div class="profile-page">
    <v-row>
      <v-col
        cols="12"
        >
        <div class="profile-details">
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <img
                    class="profile-image"
                    :src="loginUser.logo ? loginUser.logo : 'https://randomuser.me/api/portraits/men/88.jpg'">
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                >
                  <div class="detail-box">
                    <div class="name-box">
                      <span>{{ `${loginUser.fname} ${loginUser.lname}` | persianDigit}}</span>
                      <v-divider vertical />
                      <span class="file-id-box">
                        <span>پرونده</span>
                        <span class="file-id">{{ loginUser.file_id ? loginUser.file_id : '-' | persianDigit }}</span>
                      </span>
                    </div>
                    <span>{{ loginUser.tel | persianDigit}}</span>
                    <span>{{ loginUser.age | persianDigit}} سال</span>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <div class="description-box">
                <div class="title">توضیحات</div>
                <div class="description">
                  {{ loginUser.description }}
                </div>
                <div class="action-box">
                  <v-menu
                    close-on-content-click
                    offset-y
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
                      >
                        <v-list-item-title>حذف کاربر</v-list-item-title>
                      </v-list-item>
                      <v-divider />
                    </v-list>
                  </v-menu>
                  <div class="action-button">
                    <v-icon>
                      mdi-card-account-details-outline
                    </v-icon>
                    <span>تاریخچه درمانی</span>
                  </div>
                  <div class="action-button">
                    <v-icon>
                      mdi-pencil-outline
                    </v-icon>
                    <span>ویرایش اطلاعات</span>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "index.vue",
  layout: 'admin',
  middleware: 'admin',
  mounted() {

  },
  methods: {
    getUser() {

    },
  },
  computed: {
    loginUser() {
      return this.$store.getters['login/getUser']
    }
  }
}
</script>

<style scoped>

</style>
