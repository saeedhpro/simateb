<template>
  <v-container>
    <div class="dents-list">
      <div class="dent-box overflow-x-auto">
        <div class="dent-top">
          <img :class="{'selected': inList(i)}" @click="onDentClicked(i)" v-for="(i, n) in 16"
               :src="`/images/dents/${i}.png`" :key="n">
        </div>
        <div class="dent-bottom">
          <img :class="{'selected': inList(i + 16)}" @click="onDentClicked(i + 16)" v-for="(i, n) in 16"
               :src="`/images/dents/${i+16}.png`" :key="n">
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "DentalItemComponent",
  props: {
    dental: {
      Type: String,
      default: '',
      required: true
    },
    type: {
      Type: String,
      default: 'teeth_present',
      required: true
    }
  },
  mounted() {
    this.dents = this.dental.length > 0 ? this.dental.trim().split(',') : []
  },
  data() {
    return {
      dents: [],
    }
  },
  methods: {
    inList(item) {
      return this.dents.find(i => i == item)
    },
    onDentClicked(item) {
      const i = this.dents.find(i => i == item)
      if (i) {
        this.dents = this.dents.filter(i => i != item)
      } else {
        this.dents.push(item)
      }
      this.$emit('dentClicked', this.dents.join(), this.type)
    },
  },
  watch: {
    dental(val) {
      this.dents = this.dental.length > 0 ? this.dental.trim().split(',') : []
    }
  }
}
</script>

<style scoped lang="scss">
.dent-bottom img.selected, .dent-top img.selected {
  background: #EBF0FF 0 0 no-repeat padding-box;
  border: 1px solid #5063FF;
  border-radius: 8px;
  opacity: 1;
}

.dent-top, .dent-bottom {
  width: 100%;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  justify-content: center;

  img {
    border: 1px solid #fff;
    margin: 0 2px;
    max-width: 45px;
    width: 100%;

    &:hover {
      background: #EBF0FF 0 0 no-repeat padding-box;
      border: 1px solid #5063FF;
      border-radius: 8px;
    }
  }
}
</style>
