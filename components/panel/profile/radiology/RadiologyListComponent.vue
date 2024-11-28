<template>
  <div class="profile-photography-list-component profile-tab">
    <div
      v-if="loading"
    >
      <LoadingCard />
    </div>
    <div v-else class="photography-results-box">
      <radiology-item-component
        v-for="(i,n) in list.data"
        :key="n"
        :appointment="i"
      />
    </div>
  </div>
</template>

<script>
import RadiologyItemComponent from "~/components/panel/profile/radiology/RadiologyItemComponent";
import LoadingCard from "~/components/global/LoadingCard.vue";

export default {
  name: "RadiologyListComponent",
  components: {LoadingCard, RadiologyItemComponent},
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
        meta: {
          total: 0,
        },
        total_rows: 0,
        total_pages: 0
      },
      loading: false
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.$store.dispatch('users/getUserResultedAppointmentsList', {
        id: this.userId,
        type: 'radiology',
        page: this.page,
      })
      .then((res) => {
        this.list = res.data
      })
        .finally(() => {
          setTimeout(() => {
            this.loading = false
          }, 300)
        })
    }
  },
}
</script>

<style scoped>

</style>
