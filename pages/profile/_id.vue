<template>
  <div class="profile-page" v-if="user">
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
                    :src="user.logo ? user.logo : 'https://randomuser.me/api/portraits/men/88.jpg'">
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                >
                  <div class="detail-box">
                    <div class="name-box">
                      <span>{{ `${user.fname} ${user.lname}` | persianDigit}}</span>
                      <v-divider vertical />
                      <span class="file-id-box">
                        <span>پرونده</span>
                        <span class="file-id">{{ user.file_id ? user.file_id : '-' | persianDigit }}</span>
                      </span>
                    </div>
                    <span>{{ user.tel | persianDigit}}</span>
                    <span>{{ user.age | persianDigit}} سال</span>
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
                  {{ user.description }}
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
    <v-row>
      <v-col
        cols="12"
      >
        <v-container>
          <v-tabs
            v-model="tabs"
            centered
            class="profile-tabs-header"
          >
            <v-tab
              class="profile-tab"
            >
              <img src="/images/profile/list.svg">
              لیست پذیرش ها
            </v-tab>
            <v-tab
              class="profile-tab"
            >
              <img src="/images/profile/radio.svg">
              نتایج رادیولوژی
            </v-tab>
            <v-tab
              class="profile-tab"
            >
              <img src="/images/profile/photo.svg">
              نتایج فوتوگرافی
            </v-tab>
            <v-tab
              class="profile-tab"
            >
              <img src="/images/profile/doc.svg">
              ارسال مستندات
            </v-tab>
            <v-tab
              class="profile-tab"
            >
              <img src="/images/profile/pay.svg">
              پرداخت ها
            </v-tab>
          </v-tabs>
        </v-container>
        <div
          class="profile-tabs-box"
        >
          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <appointment-list-component :user-id="user.id"/>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-title class="text-h5">
                  An awesome title
                </v-card-title>
                <v-card-text>
                  <p>
                    Duis lobortis massa imperdiet quam. Donec vitae orci sed dolor rutrum auctor. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Praesent congue erat at massa.
                  </p>

                  <p>
                    Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Etiam sit amet orci eget eros faucibus tincidunt. Donec sodales sagittis magna.
                  </p>

                  <p class="mb-0">
                    Ut leo. Suspendisse potenti. Duis vel nibh at velit scelerisque suscipit. Fusce pharetra convallis urna.
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-title class="text-h5">
                  An even better title
                </v-card-title>
                <v-card-text>
                  <p>
                    Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed hendrerit. Maecenas malesuada. Vestibulum ullamcorper mauris at ligula. Proin faucibus arcu quis ante.
                  </p>

                  <p class="mb-0">
                    Etiam vitae tortor. Curabitur ullamcorper ultricies nisi. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Aliquam lobortis. Suspendisse potenti.
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AppointmentListComponent from "~/components/panel/profile/appointments/AppointmentListComponent";
export default {
  name: "profile.vue",
  components: {AppointmentListComponent},
  layout: 'panel',
  mounted() {
    this.getUser(this.$route.params.id)
  },
  data() {
    return {
      tabs: null,
    }
  },
  methods: {
    getUser(id) {
      this.$store.dispatch('users/getUser', id)
    },
  },
  computed: {
    user() {
      return this.$store.getters['users/getUser']
    }
  }
}
</script>

<style scoped>

</style>
