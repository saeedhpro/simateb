<template>
  <div class="profile-photography-list-component">
    <div class="photography-results-box">
      <photography-item-component
        v-for="(i,n) in list.data"
        :key="n"
        :appointment="i"
      />
    </div>
  </div>
</template>

<script>
import PhotographyItemComponent from "~/components/panel/profile/photography/PhotographyItemComponent";

export default {
  name: "PhotographyListComponent",
  components: {PhotographyItemComponent},
  props: {
    userId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      page: 1,
      list: {
        data: [],
        limit: 10,
        page: 1,
        sort: '',
        total_rows: 0,
        total_pages: 0,
        meta: {
          total: 0
        }
      },
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList() {
      this.$store.dispatch('users/getUserResultedAppointmentsList', {
        id: this.userId,
        type: 'photography',
        page: this.page,
      })
      .then((res) => {
        this.list = res.data
      })
    }
  },
}
</script>

<style scoped>

</style>
