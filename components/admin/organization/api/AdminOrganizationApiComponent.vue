<template>
  <v-card
    class="page-main-box"
  >
    <v-row class="search-box">
      <v-col
        cols="12"
        sm="12"
        md="5"
        lg="4"
      >
        <div class="right-box">
          <v-checkbox
            v-model="selectedAll"
          ></v-checkbox>
          <div class="selected-count" v-if="selectedApiKeys.length > 0">
            {{ selectedApiKeys.length }}
          </div>
          <v-select
            outlined
            :items="actions"
            label="اقدام جمعی"
            item-value="id"
            item-text="label"
            v-model="action"
          ></v-select>
          <button
            class="do-action-btn"
            @click="doAction"
            :disabled="!action"
          >انجام بده
          </button>
        </div>
      </v-col>
      <v-spacer/>
      <v-col
        cols="12"
        sm="12"
        md="3"
        lg="2"
      >
        <div class="page-actions"
             @click="createNewApiKey"
        >
          <img src="/images/pages/plus.svg" alt="users">
          <div class="title-main" v-if="loadingCreate">
            <v-progress-circular />
          </div>
          <span class="title-main" v-else>
            افزودن کلید جدید</span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <data-table-component
          :headers="headers"
          :page="page"
          :total="apiKeys.meta.total"
          @paginate="paginate"
        >
          <template v-slot:body>
            <tr v-for="(i, n) in apiKeys.data" :key="n">
              <td class="text-center">{{ (page - 1) * 10 + n + 1 }}</td>
              <td class="text-center">
                <div class="table-row flex flex-row align-center justify-start">
                  <input type="checkbox"
                         class="table-selectable-checkbox"
                         v-model="selectedApiKeys"
                         :value="i"
                  />
                  <span class="cursor-pointer">{{
                    i.api_key
                    }}</span>
                </div>
              </td>
              <td class="text-center">{{ i.is_active ? 'فعال' : 'غیرفعال' }}</td>
              <td>
                <button
                  @click="showDeleteItem(i)"
                  class="action-buttons">
                  <v-icon size="16">mdi-trash-can-outline</v-icon>
                  <span>حذف</span>
                </button>
              </td>
            </tr>
          </template>
          <template v-slot:notfound>
            <div v-if="apiKeys.meta.total === 0">اطلاعاتی یافت نشد</div>
          </template>
        </data-table-component>
      </v-col>
    </v-row>
    <admin-delete-users-component
      :open="showDelete"
      :title="`کلید api`"
      @close="toggleRemove"
      @remove="remove"
    />
  </v-card>
</template>

<script>
import DataTableComponent from "~/components/panel/global/DataTableComponent";

export default {
  name: "AdminOrganizationApiComponent",
  components: {
    DataTableComponent,
  },
  props: {
    page: {
      type: Number,
      required: true,
      default: 1,
    }
  },
  data() {
    return {
      showDelete: false,
      showEdit: false,
      loadingCreate: false,
      selectedApiKeys: [],
      headers: [
        '',
        'کلید',
        'وضعیت',
        'عملیات',
      ],
      actions: [
        {
          id: 0,
          label: 'اقدام جمعی'
        },
        {
          id: 1,
          label: 'حذف کن'
        },
      ],
      action: null,
      item: null,
    }
  },
  methods: {
    paginate(page = 1) {
      this.$emit('paginate', page)
    },
    getApiKeysList() {
      this.selectedApiKeys = []
      this.$emit('getApiKeysList', this.q)
    },
    doAction() {
      if (!this.action) return
      switch (this.action) {
        case 1:
        case '1':
          this.toggleShowDelete()
          break
      }
    },
    itemSelected(e) {
      this.selectedApiKeys = e
    },
    toggleShowDelete() {
      this.showDelete = !this.showDelete
    },
    editApiKey(item) {
      this.item = item
      this.showEdit = true
    },
    closeEditApiKey() {
      this.showEdit = false
      this.item = null
    },
    toggleRemove() {
      this.showDelete = false
      this.item = null
    },
    showDeleteItem(item) {
      this.showDelete = true
      this.item = item
    },
    remove() {
      this.deleteApiKeys([this.item.id])
      this.toggleRemove()
      this.getApiKeysList()
    },
    removeItems() {
      this.deleteApiKeys(this.selectedApiKeys.map(i => i.id))
      this.action = null
      this.selectedApiKeys = []
      this.toggleShowDelete()
      this.getApiKeysList()
    },
    deleteApiKeys(ids) {
      this.$store.dispatch('api/deleteApiKeys', {
        id: this.organization.id,
        ids
      })
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
          this.closeForm(true)
        })
        // .catch(err => {
        //   this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        // })
    },
    createNewApiKey() {
      if (this.loadingCreate) {
        return
      }
      this.loadingCreate = true
      const data = {
        organization_id: this.organization.id
      }
      this.$store.dispatch('api/createApiKey', data)
        .then(() => {
          setTimeout(() => {
            this.paginate(1)
            this.loadingCreate = false
          }, 500)
        })
        .catch(() => {
          this.loadingCreate = false
        })
    }
  },
  computed: {
    organization() {
      return this.$store.getters['organizations/getOrganization']
    },
    selectedAll: {
      get() {
        return this.selectedApiKeys.length > 0 && this.selectedApiKeys.length === this.apiKeys.data.length
      },
      set(bool) {
        if (bool) {
          this.selectedApiKeys = []
          this.selectedApiKeys = this.apiKeys.data
        } else {
          this.selectedApiKeys = []
        }
      }
    },
    apiKeys() {
      return this.$store.getters['api/getList']
    }
  },
}
</script>

<style scoped>

</style>
