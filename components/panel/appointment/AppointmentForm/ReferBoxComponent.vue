<template>
  <div class="refer-box-component">
    <v-expansion-panels flat>
      <v-expansion-panel
        class="wire-box"
      >
        <v-expansion-panel-header
          class="wire-box-header"
        >
          ارجاعیات
        </v-expansion-panel-header>
        <v-expansion-panel-content class="px-0">
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <refer-item-component
                type="radiology"
                title="رادیولوژی"
                @selected="addToCases"
              />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import ReferItemComponent from "~/components/panel/appointment/AppointmentForm/ReferItemComponent";
export default {
  name: "ReferBoxComponent",
  components: {ReferItemComponent},
  methods: {
    addToCases(val) {
      this.$emit('selected', val)
    }
  }
}
</script>

<style scoped>

</style>
