<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          class="page-main-box mt-12"
        >
          <v-row>
            <v-col>
              <div class="dashboard-header">
                <span>آخرین کاربران آنلاین</span>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <data-table-component
                :headers="onlineUserHeaders"
                :page="1"
                :total="onlineUsers.length"
                @paginate="() => {}"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in onlineUsers" :key="n">
                    <td class="text-center">{{ n + 1 }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <span><nuxt-link :to="`/admin/profile/${i.id}`">{{
                            `${i.fname} ${i.lname}`
                          }}</nuxt-link></span>
                      </div>
                    </td>
                    <td class="text-center">{{ i.tel }}</td>
                    <td class="text-center">{{ i.user_group ? i.user_group.name : '-' }}</td>
                    <td class="text-center">
                      {{ i.last_login_ago }}
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="onlineUsers.length === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          class="page-main-box mt-12"
        >
          <v-row>
            <v-col>
              <div class="dashboard-header">
                <span>آخرین ورود بیماران</span>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <data-table-component
                :headers="onlinePatientHeaders"
                :page="1"
                :total="onlinePatients.length"
                @paginate="() => {}"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in onlinePatients" :key="n">
                    <td class="text-center">{{ n + 1 }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <span><nuxt-link :to="`/admin/profile/${i.id}`">{{
                            `${i.fname} ${i.lname}`
                          }}</nuxt-link></span>
                      </div>
                    </td>
                    <td class="text-center">{{ i.tel }}</td>
                    <td class="text-center">{{ i.user_group ? i.user_group.name : '-' }}</td>
                    <td class="text-center">
                      {{ i.last_login_ago }}
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="onlinePatients.length === 0">اطلاعاتی یافت نشد</div>
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

export default {
  name: "index.vue",
  components: {DataTableComponent},
  layout: 'admin',
  middleware: 'admin',
  data() {
    return {
      onlineUserHeaders: [
        '',
        'نام کاربر',
        'شماره تماس',
        'گروه',
        'آخرین ورود',
      ],
      onlinePatientHeaders: [
        '',
        'نام کاربر',
        'شماره تماس',
        'مطب',
        'آخرین ورود',
      ],
    }
  },
  mounted() {
    this.getOnlineUserList()
    this.getOnlinePatientList()
  },
  methods: {
    getOnlineUserList() {
      this.$store.dispatch('admin/users/getOnlineUsers')
    },
    getOnlinePatientList() {
      this.$store.dispatch('admin/users/getOnlinePatients')
    }
  },
  computed: {
    onlineUsers() {
      return this.$store.getters['admin/users/getOnlineUsers']
    },
    onlinePatients() {
      return this.$store.getters['admin/users/getOnlinePatients']
    },
  }
}
</script>

<style scoped>

</style>
