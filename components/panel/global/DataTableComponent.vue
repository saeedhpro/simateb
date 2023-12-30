<template>
  <div>
    <v-simple-table
      fixed-header
    >
      <template v-slot:default>
        <thead>
        <tr>
          <th
            v-for="(i, n) in  headers"
            :key="n"
            class="text-center"
          >
            {{ i }}
          </th>
        </tr>
        </thead>
        <tbody>
          <slot name="body"></slot>
        </tbody>
      </template>
    </v-simple-table>
    <div class="text-center pt-2">
      <v-pagination
        v-if="hasPaginate && length > 1"
        dir="ltr"
        v-model="p"
        :length="length"
        :total-visible="5"
      ></v-pagination>
      <slot name="notfound"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataTableComponent",
  props: {
    headers: {
      type: Array,
      required: true,
      default: () => []
    },
    total: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 10
    },
    hasPaginate: {
      type: Boolean,
      default: true
    },
    page: {
      type: Number,
      default: 1
    },
  },
  mounted() {
    this.p = this.page
  },
  data() {
    return {
      p: 1,
    }
  },
  watch: {
    p() {
      this.$emit('paginate', this.p)
    }
  },
  computed: {
    length() {
      return Math.ceil(this.total / this.perPage)
    }
  }
}
</script>

<style scoped lang="scss">
  thead {
    th {
      background: #F0F0F0 0 0 no-repeat padding-box !important;
      border: 1px solid #DBDBDB !important;
      text-align: center;
      font: normal normal bold 16px/28px IRANYekanRegular;
      letter-spacing: 0;
      color: #212945;
      padding: 17px;
      &:first-child {
        border-radius: 0 8px 0 0;
      }
      &:last-child {
        border-radius: 8px 0 0 0;
      }
    }
  }

</style>
