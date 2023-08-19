<template>
  <div v-if="show">
    <v-dialog
      v-model="show"
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
              @click="close"
              class="create-update-modal-close"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <span>لیست اقدامات قبلی</span>
          </div>
          <v-spacer/>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row
            >
              <v-col
                cols="12"
              >
                <data-table-component
                  :headers="headers"
                  :page="1"
                  :total="prescriptionList.length"
                  @paginate="() => {}"
                >
                  <template v-slot:body>
                    <tr  v-for="(p,i) in prescriptionList" :key="i">
                      <td class="text-center">{{ i + 1 }}</td>
                      <td class="text-center">
                        <span
                          v-for="(p,i) in toList(p.prescription)"
                          :key="i"
                          class="file-id mx-1"
                        >
                        {{ p }}
                        </span>
                      </td>
                      <td class="text-center">
                        <span class="file-id">
                          {{
                            p.start_at_fa
                          }}
                        </span>
                      </td>
                    </tr>
                  </template>
                  <template v-slot:notfound>
                    <div v-if="prescriptionList.length == 0">اطلاعاتی یافت نشد</div>
                  </template>
                </data-table-component>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="3"
                md="3"
              >
                <button
                  class="second-button"
                  @click="close"
                >
                  بستن
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
import DataTableComponent from "~/components/panel/global/DataTableComponent.vue";

export default {
  name: "AppointmentPagePrescriptionListModal",
  components: {DataTableComponent},
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    prescriptionList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
    toList(p) {
      return p.length > 0 ? p.split('-') : [];
    },
  },
  computed: {
    show() {
      return this.open
    },
    headers() {
      return [
        '',
        'اقدام',
        'تاریخ',
      ]
    }
  }
}
</script>
<style scoped>

</style>
