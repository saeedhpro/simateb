<template>
  <div class="dental-examination-component">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <div class="create-update-model-input-box">
          <label>Chief Complaint</label>
          <input @input="onChanged" type="text" v-model="h.chief_complaint">
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <div class="create-update-model-input-box">
          <label>Previous Orthodontic Ttreatment</label>
          <input @input="onChanged" type="text" v-model="h.previous_orthodontic">
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <div class="create-update-model-input-box">
          <label>Oral Hygiene</label>
          <v-select
            outlined
            :items="oralHygieneList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.oral_hygiene"
            dense
          ></v-select>
        </div>
      </v-col>
    </v-row>
    <v-divider/>
    <v-row>
      <v-col
        cols="12"
      >
        <span class="medical-sub-header">Extraoral Evaluation</span>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <div class="create-update-model-input-box">
          <label>Frontal</label>
          <v-select
            outlined
            :items="frontalList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.frontal"
            dense
          ></v-select>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <div class="create-update-model-input-box">
          <label>Profile</label>
          <v-select
            outlined
            :items="profileList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.profile"
            dense
          ></v-select>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <span class="medical-sub-header">Intraoral Evaluation</span>
      </v-col>
      <v-col
        cols="12"
      >
        <v-tabs
          v-model="dTabs"
          center-active
          class="medical-tabs-header rtl"
        >
          <v-tab
            class="medical-tab"
            v-for="(i,n) in items"
            :key="n"
          >
            {{ itemsName[i] }}
          </v-tab>
        </v-tabs>
        <div
          class="medical-tabs-box"
        >
          <v-tabs-items v-model="dTabs">
            <v-tab-item
              v-for="(i,n) in items"
              :key="n"
            >
              <dental-item-component
                :dental="h[selectedItem]"
                :type="selectedItem"
                @dentClicked="dentClicked"/>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DentalItemComponent from "~/components/panel/profile/medical/DentalItemComponent";

export default {
  name: "DentalExaminationComponent",
  components: {DentalItemComponent},
  props: {
    histories: {
      type: Object,
      default: null
    }
  },
  mounted() {
    setTimeout(() => {
      const histories = this.histories;
      if (histories) {
        this.h = {
          ...histories,
          oral_hygiene: histories.oral_hygiene,
          previous_orthodontic: histories.previous_orthodontic,
          chief_complaint: histories.chief_complaint,
          frontal: histories.frontal,
          profile: histories.profile,
          teeth_present: histories.teeth_present,
          un_erupted: histories.un_erupted,
          ie_missing: histories.ie_missing,
          ie_extracted: histories.ie_extracted,
          ie_impacted: histories.ie_impacted,
          ie_supernumerary: histories.ie_supernumerary,
          ie_caries: histories.ie_caries,
          ie_rct: histories.ie_rct,
          ie_anomalies: histories.ie_anomalies,
        }
      }
    }, 200)
  },
  data() {
    return {
      dTabs: 0,
      h: {
        oral_hygiene: '',
        previous_orthodontic: '',
        chief_complaint: '',
        frontal: '',
        profile: '',
        teeth_present: '',
        un_erupted: '',
        ie_missing: '',
        ie_extracted: '',
        ie_impacted: '',
        ie_supernumerary: '',
        ie_caries: '',
        ie_rct: '',
        ie_anomalies: '',
      },
      items: [
        'teeth_present',
        'un_erupted',
        'ie_missing',
        'ie_extracted',
        'ie_impacted',
        'ie_supernumerary',
        'ie_caries',
        'ie_rct',
        'ie_anomalies',
      ],
      itemsName: {
        teeth_present: 'Teeth Present',
        un_erupted: 'un erupted',
        ie_missing: 'missing',
        ie_extracted: 'extracted',
        ie_impacted: 'impacted',
        ie_supernumerary: 'supernumerary',
        ie_caries: 'caries',
        ie_rct: 'R.C.T',
        ie_anomalies: 'anomalies',
      },
      selectedItem: 'teeth_present',
      oralHygieneList: [
        {
          id: 'good',
          label: 'Good',
        },
        {
          id: 'fair',
          label: 'Fair',
        },
        {
          id: 'poor',
          label: 'Poor',
        },
      ],
      frontalList: [
        {
          id: 'dolichofacials',
          label: 'dolichofacials',
        },
        {
          id: 'mesofacial',
          label: 'mesofacial',
        },
        {
          id: 'brachyfacial',
          label: 'brachyfacial',
        },
        {
          id: 'symmetrical',
          label: 'symmetrical',
        },
        {
          id: 'asymmetrical_skeletal',
          label: 'asymmetrical - skeletal',
        },
        {
          id: 'asymmetrical_functional',
          label: 'asymmetrical - functional',
        },
      ],
      profileList: [
        {
          id: 'convex - Mx prognathic',
          label: 'convex - Mx prognathic',
        },
        {
          id: 'convex - Md retrognathic',
          label: 'convex - Md retrognathic',
        },
        {
          id: 'convex - bimax peognathic',
          label: 'convex - bimax peognathic',
        },
        {
          id: 'straight',
          label: 'straight',
        },
        {
          id: 'concave - Mx retrognathic',
          label: 'concave - Mx retrognathic',
        },
        {
          id: 'concave - Md prognathic',
          label: 'concave - Md prognathic',
        },
        {
          id: 'concave - bimax retrognathic',
          label: 'concave - bimax retrognathic',
        },
      ],
    }
  },
  methods: {
    dentClicked(item, type) {
      this.h[type] = item
      this.onChanged()
    },
    openItem(item) {
      this.selectedItem = item
    },
    onChanged() {
      this.$emit('changed', this.h)
    }
  },
  watch: {
    dTabs(index) {
      this.selectedItem = this.items[index]
    }
  }
}
</script>

<style scoped>

</style>
