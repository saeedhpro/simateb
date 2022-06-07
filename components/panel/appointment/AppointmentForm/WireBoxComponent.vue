<template>
  <div class="wire-box-component">
    <v-expansion-panels flat>
      <v-expansion-panel
        class="wire-box"
      >
        <v-expansion-panel-header
          class="wire-box-header"
        >
          wire
        </v-expansion-panel-header>
        <v-expansion-panel-content class="px-0">
          <data-table-component
            :headers="wireHeaders"
            :has-paginate="false"
            :total="0"
            class="wire-table"
          >
            <template v-slot:body>
              <tr dir="ltr" v-for="(list, n) in wireList" :key="n">
                <td v-for="(i, m) in list" :key="m" class="text-center cursor-pointer" @click="addToDoctorDo(i.action)">{{ i.title | persianDigit }}</td>
              </tr>
            </template>
          </data-table-component>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import DataTableComponent from "~/components/panel/global/DataTableComponent";
export default {
  name: "WireBoxComponent",
  components: {DataTableComponent},
  data() {
    return {
      wireHeaders: [
        'coaxial',
        'ligature wire',
        'Wire overlay',
        'nt(rectangular)',
        'nt(round)',
        'Ss(rectangular)',
        'Ss(round)',
      ],
      wireList: [
        [
          {
            title: '0155',
            action: 'coaxial 0155'
          },
          {
            title: '',
            action: ''
          },
          {
            title: '12',
            action: 'nt(rectangular) 12'
          },
          {
            title: '16*25',
            action: 'nt(rectangular) 16*25'
          },
          {
            title: '12',
            action: 'nt(rond) 12'
          },
          {
            title: '16*22',
            action: 'ss(rectangular) 16*22'
          },
          {
            title: '12',
            action: 'Ss(rond) 12'
          },
        ],
        [
          {
            title: '0175',
            action: 'coaxial 0175'
          },
          {
            title: '',
            action: ''
          },
          {
            title: '14',
            action: 'nt(rectangular) 14'
          },
          {
            title: '17*25',
            action: 'nt(rectangular) 17*25'
          },
          {
            title: '14',
            action: 'nt(rond) 14'
          },
          {
            title: '17*25',
            action: 'ss(rectangular) 17*25'
          },
          {
            title: '14',
            action: 'Ss(rond) 14'
          },
        ],
        [
          {
            title: '0195',
            action: 'coaxial 0195'
          },
          {
            title: '',
            action: ''
          },
          {
            title: '16',
            action: 'nt(rectangular) 16'
          },
          {
            title: '18*25',
            action: 'nt(rectangular) 18*25'
          },
          {
            title: '16',
            action: 'nt(rond) 16'
          },
          {
            title: '18*25',
            action: 'ss(rectangular) 18*25'
          },
          {
            title: '16',
            action: 'Ss(rond) 16'
          },
        ],
        [
          {
            title: '0195',
            action: 'coaxial 0195'
          },
          {
            title: '',
            action: ''
          },
          {
            title: '18',
            action: 'nt(rectangular) 18'
          },
          {
            title: '19*25',
            action: 'nt(rectangular) 19*25'
          },
          {
            title: '18',
            action: 'nt(rond) 18'
          },
          {
            title: '19*25',
            action: 'ss(rectangular) 19*25'
          },
          {
            title: '18',
            action: 'Ss(rond) 18'
          },
        ],
        [
          {
            title: '',
            action: ''
          },
          {
            title: '',
            action: ''
          },
          {
            title: '20',
            action: 'nt(rectangular) 20'
          },
          {
            title: '',
            action: ''
          },
          {
            title: '20',
            action: 'nt(rond) 20'
          },
          {
            title: '',
            action: ''
          },
          {
            title: '20',
            action: 'Ss(rond) 20'
          },
        ],
      ],
    }
  },
  methods: {
    addToDoctorDo(action) {
      if(action) {
        this.$emit('selected', action)
      }
    }
  }
}
</script>

<style scoped>

</style>
