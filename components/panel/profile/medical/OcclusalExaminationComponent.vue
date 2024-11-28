<template>
  <div class="occlusal-examination-component">
    <v-row>
      <v-col
        cols="12"
      >
        <span class="medical-sub-header">Occlusion</span>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="create-update-model-input-box">
          <label>Left Molar</label>
          <v-select
            outlined
            :items="leftMolarList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.left_molar"
            dense
          ></v-select>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="create-update-model-input-box">
          <label>Right Molar</label>
          <v-select
            outlined
            :items="rightMolarList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.right_molar"
            dense
          ></v-select>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="create-update-model-input-box">
          <label>Left Canine</label>
          <v-select
            outlined
            :items="leftCanineList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.left_canine"
            dense
          ></v-select>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="create-update-model-input-box">
          <label>Right Canine</label>
          <v-select
            outlined
            :items="leftCanineList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.left_canine"
            dense
          ></v-select>
        </div>
      </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="create-update-model-input-box">
          <label>Overjet</label>
          <v-select
            outlined
            :items="leftMolarList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.overjet"
            dense
          ></v-select>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="create-update-model-input-box">
          <label>Right Molar</label>
          <v-select
            outlined
            :items="rightMolarList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.right_molar"
            dense
          ></v-select>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="create-update-model-input-box">
          <label>Left Canine</label>
          <v-select
            outlined
            :items="leftCanineList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.left_canine"
            dense
          ></v-select>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="create-update-model-input-box">
          <label>Right Canine</label>
          <v-select
            outlined
            :items="leftCanineList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.left_canine"
            dense
          ></v-select>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="create-update-model-input-box">
          <label>Overjet</label>
          <v-select
            outlined
            :items="overjetList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.overjet"
            dense
          ></v-select>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="create-update-model-input-box">
          <label>Overbite</label>
          <v-select
            outlined
            :items="overbiteList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.overbite"
            dense
          ></v-select>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="create-update-model-input-box">
          <label>Crossbite (x-bite)</label>
          <v-select
            outlined
            :items="crossbiteList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.crossbite"
            dense
          ></v-select>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="create-update-model-input-box">
          <label>Midlines</label>
          <v-select
            outlined
            :items="midlinesList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.midlines"
            dense
          ></v-select>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="create-update-model-input-box">
          <label>Crowding - Mx</label>
          <v-select
            outlined
            :items="crowdingMxList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.crowding_mx"
            dense
          ></v-select>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="create-update-model-input-box">
          <label>Crowding - Md</label>
          <v-select
            outlined
            :items="crowdingMdList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.crowding_md"
            dense
          ></v-select>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="create-update-model-input-box">
          <label>Spacing - Mx</label>
          <v-select
            outlined
            :items="spacingMxList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.spacing_mx"
            dense
          ></v-select>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="create-update-model-input-box">
          <label>Spacing - Md</label>
          <v-select
            outlined
            :items="spacingMdList"
            item-value="id"
            item-text="label"
            @change="onChanged"
            v-model="h.spacing_md"
            dense
          ></v-select>
        </div>
      </v-col>
      <v-col
        cols="12"
      >
        <div class="create-update-model-input-box">
          <label>Summary diagnosis</label>
          <textarea
            v-model="h.diagnosis"
            rows="4"
          ></textarea>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "OcclusalExaminationComponent",
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
          left_molar: histories.left_molar,
          right_molar: histories.right_molar,
          left_canine: histories.left_canine,
          right_canine: histories.right_canine,
          overjet: histories.overjet,
          overbite: histories.overbite,
          crossbite: histories.crossbite,
          midlines: histories.midlines,
          crowding_mx: histories.crowding_mx,
          crowding_md: histories.crowding_md,
          spacing_mx: histories.spacing_mx,
          spacing_md: histories.spacing_md,
          diagnosis: histories.diagnosis,
        }
      }
    }, 250)
  },
  data() {
    return {
      h: {
        left_molar: '',
        right_molar: '',
        left_canine: '',
        right_canine: '',
        overjet: '',
        overbite: '',
        crossbite: '',
        midlines: '',
        crowding_md: '',
        crowding_mx: '',
        spacing_mx: '',
        spacing_md: '',
        diagnosis: '',
      },
      leftMolarList: [
        {
          id: "class II",
          label: "class II",
        },
        {
          id: "end on",
          label: "end on",
        },
        {
          id: "class I",
          label: "class I",
        },
        {
          id: "class III",
          label: "class III",
        },
      ],
      rightMolarList: [
        {
          id: "class II",
          label: "class II",
        },
        {
          id: "end on",
          label: "end on",
        },
        {
          id: "class I",
          label: "class I",
        },
        {
          id: "class III",
          label: "class III",
        },
      ],
      leftCanineList: [
        {
          id: "class II",
          label: "class II",
        },
        {
          id: "end on",
          label: "end on",
        },
        {
          id: "class I",
          label: "class I",
        },
        {
          id: "class III",
          label: "class III",
        },
      ],
      rightCanineList: [
        {
          id: "class II",
          label: "class II",
        },
        {
          id: "end on",
          label: "end on",
        },
        {
          id: "class I",
          label: "class I",
        },
        {
          id: "class III",
          label: "class III",
        },
      ],
      overjetList: [
        {
          id: "class II",
          label: "deep"
        },
        {
          id: "end on",
          label: "WNL"
        },
        {
          id: "class I",
          label: "open"
        },
      ],
      overbiteList: [
        {
          id: "Excessive",
          label: "Excessive"
        },
        {
          id: "WNL",
          label: "WNL"
        },
        {
          id: "Negative",
          label: "Negative"
        },
      ],
      crossbiteList: [
        {
          id: "anterior - w/shift",
          label: "anterior - w/shift"
        },
        {
          id: "anterior - w/o shift",
          label: "anterior - w/o shift"
        },
        {
          id: "posterior - w/shift - bilateral",
          label: "posterior - w/shift - bilateral"
        },
        {
          id: "posterior - w/shift - unilateral",
          label: "posterior - w/shift - unilateral"
        },
        {
          id: "posterior - w/o shift - bilateral",
          label: "posterior - w/o shift - bilateral"
        },
        {
          id: "posterior - w/o shift - unilateral",
          label: "posterior - w/o shift - unilateral"
        },
      ],
      midlinesList: [
        {
          id: "mx",
          label: "Mx &amp; md coincident w/face"
        },
        {
          id: "mxoff",
          label: "Mx off"
        },
        {
          id: "mdoff_skeletal",
          label: "Md off - skeletal asymm"
        },
        {
          id: "posterior - w/shift - unilateral",
          label: "Md off - funct asymm"
        },
        {
          id: "posterior - w/o shift - bilateral",
          label: "Md off - dental asymm"
        },
      ],
      crowdingMxList: [
        {
          id: "none",
          label: "none"
        },
        {
          id: "mild",
          label: "mild"
        },
        {
          id: "moderate",
          label: "moderate"
        },
        {
          id: "severe",
          label: "severe"
        },
      ],
      crowdingMdList: [
        {
          id: "none",
          label: "none"
        },
        {
          id: "mild",
          label: "mild"
        },
        {
          id: "moderate",
          label: "moderate"
        },
        {
          id: "severe",
          label: "severe"
        },
      ],
      spacingMxList: [
        {
          id: "none",
          label: "none"
        },
        {
          id: "mild",
          label: "mild"
        },
        {
          id: "moderate",
          label: "moderate"
        },
        {
          id: "severe",
          label: "severe"
        },
      ],
      spacingMdList: [
        {
          id: "none",
          label: "none"
        },
        {
          id: "mild",
          label: "mild"
        },
        {
          id: "moderate",
          label: "moderate"
        },
        {
          id: "severe",
          label: "severe"
        },
      ],
    }
  },
  methods: {
    onChanged() {
      this.$emit('changed', this.h)
    }
  }
}
</script>

<style scoped>

</style>
