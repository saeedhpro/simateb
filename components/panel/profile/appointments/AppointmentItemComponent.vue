<template>
  <div class="profile-appointment-item-component">
    <v-row>
      <v-col
        cols="12"
        sm="4"
        md="2"
      >
        <div class="img-box">

          <button
            class="edit-button"
          >
            ویرایش
          </button>
        </div>
      </v-col>

      <v-col
        cols="12"
        sm="8"
        md="10"
      >
        <div class="appointment-details">
          <v-row>
            <v-col
              cols="12"
              md="6"
            >

            </v-col>
            <v-col
              cols="12"
              md="6"
            >

            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "AppointmentItemComponent",
  props: {}
}
</script>

<style scoped>

</style>
