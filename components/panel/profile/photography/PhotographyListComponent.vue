<template>
  <div class="profile-photography-list-component">
    <div
      v-if="loading"
    >
      <LoadingCard />
    </div>
    <div v-else class="photography-results-box">
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
import LoadingCard from "~/components/global/LoadingCard.vue";

export default {
  name: "PhotographyListComponent",
  components: {LoadingCard, PhotographyItemComponent},
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
        type: 'photography',
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
