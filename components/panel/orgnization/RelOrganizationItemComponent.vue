<template>
  <div class="rel-organization-item-component">
    <div class="rel-organization-item-title">
      {{ title }}
    </div>
    <div class="rel-organization-item-content">
      <v-select
        outlined
        :items="items"
        label="انتخاب کنید"
        item-text="name"
        item-value="id"
        v-model="list"
        multiple
        return-object
        class="refer-item-select"
        @change="onRelSelected"
      >
        <template v-slot:selection="{ item, index }">
          <span v-if="index < 2">
            <span>{{ item.name }}</span>
          </span>
          <span class="px-1" v-if="list.length > 1 && index !== list.length - 1">,</span>
          <span
            v-if="index === 2"
            class="grey--text text-caption"
          >
          (+{{ list.length - 2 }} )
        </span>
        </template>
      </v-select>
      <!--      <div class="rel-organization-item-list">-->
      <!--        <div-->
      <!--          v-for="(i,n) in list"-->
      <!--          class="rel-organization-selected-item"-->
      <!--        >-->
      <!--          <span class="name">{{ i.name }}</span>-->
      <!--          <span class="close-btn" @click="remove(i)"><img alt="" src="/images/form/xmark.svg"></span>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "RelOrganizationItemComponent",
  props: {
    title: {
      type: String,
      default: "",
      required: true,
    },
    type: {
      type: String,
      default: "photography",
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
      required: true
    },
    relList: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  mounted() {
    this.setRelList()
  },
  data() {
    return {
      list: [],
      tempList: [],
    }
  },
  methods: {
    setRelList() {
      const relList = this.relList
      for (let i = 0; i < relList.length; i++) {
        this.list.push(relList[i].rel_organization)
      }
      this.tempList = this.list
    },
    onRelSelected(value) {
      let added = value.filter(
        (val) => !this.tempList.includes(val)
      );
      let removed = this.tempList.filter(
        (val) => !value.includes(val)
      );
      this.tempList = value;
      if (removed[0]) {
        this.$emit('removeRel', removed[0])
      }
      if (added[0]) {
        this.$emit('addRel', added[0])
      }
    },
  },
  watch: {
    relList() {
      if (this.relList.length === 0) {
        this.list = []
        this.tempList = []
      }
    }
  }
}
</script>

<style scoped>

</style>
