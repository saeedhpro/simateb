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
          <div class="selected-count" v-if="selectedItems.length > 0">
            {{ selectedItems.length }}
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
        <div @click="openCreateModal" class="page-actions">
          <img src="/images/pages/plus.svg" alt="users">
          <span class="title-main">نمونه کار جدید</span>
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
          :total="items.meta.total"
          @paginate="paginate"
        >
          <template v-slot:body>
            <tr v-for="(i, n) in items.data" :key="n">
              <td class="text-center">{{ (page - 1) * 10 + n + 1 }}</td>
              <td class="text-center">
                <div class="table-row flex flex-row align-center justify-start">
                  <input type="checkbox"
                         class="table-selectable-checkbox"
                         v-model="selectedItems"
                         :value="i"
                  />
                  <img v-for="(img, n) in i.image_list" :key="n" alt="" :src="img">
                </div>
              </td>
              <td class="text-center">{{ i.description ? i.description : '-' }}</td>
              <td class="text-center flex flex-row justify-space-around align-center">
                <button @click="openUpdateModal(i)" class="action-buttons">
                  <v-icon size="16">mdi-pencil-outline</v-icon>
                  <span>ویرایش</span>
                </button>
                <button
                  @click="showRemoveItem(i.id)"
                  class="action-buttons">
                  <v-icon size="16">mdi-trash-can-outline</v-icon>
                  <span>حذف</span>
                </button>
              </td>
            </tr>
          </template>
          <template v-slot:notfound>
            <div v-if="items.meta.total === 0">اطلاعاتی یافت نشد</div>
          </template>
        </data-table-component>
      </v-col>
    </v-row>
    <v-dialog
      v-model="showRemoveItemModal"
      max-width="648px"
      persistent
    >
      <v-card
        class="create-update-modal"
      >
        <v-card-title
          class="create-update-modal-title-box"
        >
          <div class="create-update-modal-title">
            <button
              @click="cancelRemoveItem"
              class="create-update-modal-close"
            >
              <v-icon>mdi-close</v-icon>
            </button>
          </div>
          <v-spacer/>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <div class="create-update-model-input-title">عنوان</div>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <div class="create-update-model-input-description">آیا از حذف کردن این نمونه کار اطمینان دارید؟
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <button
                  class="second-false-button"
                  @click="cancelRemoveItem"
                >
                  خیر
                </button>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <button
                  class="main-false-button"
                  @click="removeItem"
                >
                  بله، حذف کن
                </button>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <create-sample-item
      :organization_id="organization.id"
      :category_id="categoryID"
      :open="showCreateModal"
      @close="closeCreateModal"
      @done="doneCreateModal"
    />
    <update-sample-item
      v-if="item && showUpdateModal"
      :item="item"
      :organization_id="organization.id"
      :category_id="categoryID"
      :open="showUpdateModal"
      @close="closeUpdateModal"
      @done="doneUpdateModal"
    />
  </v-card>
</template>

<script>
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import CreateSampleItem from "~/components/admin/sample/CreateSampleItem.vue";
import UpdateSampleItem from "~/components/admin/sample/UpdateSampleItem.vue";

export default {
  name: "AdminOrganizationSampleItemComponent",
  components: {
    UpdateSampleItem,
    CreateSampleItem,
    DataTableComponent,
  },
  data() {
    return {
      showDelete: false,
      showCreateModal: false,
      showUpdateModal: false,
      selectedItems: [],
      items: {
        data: [],
        meta: {
          total: 0
        }
      },
      headers: [
        '',
        'تصاویر',
        'توضیحات',
        'عملیات',
      ],
      q: "",
      page: 1,
      limit: 10,
      actions: [
        {
          id: 0,
          label: 'اقدام جمعی'
        },
        {
          id: 1,
          label: 'حذف دسته جمعی'
        },
      ],
      action: null,
      selectedItem: null,
      showRemoveItemModal: false,
      sample: null,
      item: null
    }
  },
  mounted() {
    this.paginate(1)
  },
  methods: {
    paginate(page = 1) {
      this.getItemsList()
      this.$emit('paginate', page)
    },
    getItemsList() {
      this.selectedItems = []
      const data =  {
        page: this.page,
        limit: this.limit,
        id: this.$route.params.sample,
      }
      this.$store.dispatch('admin/organizations/getSampleItems',data)
        .then(res => {
          this.items = {
            ...res.data,
          }
        })
    },
    openCreateModal(item = null) {
      if (item) {
        this.form = {
          ...item
        }
      }
      this.showCreateModal = true
    },
    openUpdateModal(item) {
      this.item = {
        ...item
      }
      this.showUpdateModal = true
    },
    closeCreateModal() {
      this.showCreateModal = false
    },
    closeUpdateModal() {
      this.showUpdateModal = false
      this.item = null
    },
    doneCreateModal() {
      this.showCreateModal = false
      this.item = null
      this.paginate(1)
    },
    doneUpdateModal() {
      this.showUpdateModal = false
      this.sample = null
      this.paginate(1)
    },
    doAction() {
      if (!this.action) return
      switch (this.action) {
        case 1:
        case '1':
          this.toggleShowDelete()
          this.remove()
          break
      }
    },
    itemSelected(e) {
      this.selectedItems = e
    },
    toggleShowDelete() {
      this.showDelete = !this.showDelete
    },
    remove() {
      this.deleteItems(this.selectedItems.map(i => i.id))
        .then(()=> {
          this.action = null
          this.selectedItems = []
          this.toggleShowDelete()
          this.getItemsList()
        })
    },
    deleteItems(ids) {
      return this.$store.dispatch('admin/organizations/deleteOrganizationItems', {
        ids,
        id: this.organization.id,
      })
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
          this.cancelRemoveItem()
          this.paginate(1)
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
    },
    getLogo(i) {
      return i.icon ?? i.logo
    },
    showRemoveItem(id) {
      this.selectedItem = id
      this.toggleRemoveItemModal()
    },
    toggleRemoveItemModal() {
      this.showRemoveItemModal = !this.showRemoveItemModal
    },
    cancelRemoveItem() {
      this.selectedItem = null
      this.toggleRemoveItemModal()
    },
    removeItem() {
      this.deleteItems([this.selectedItem])
    }
  },
  computed: {
    categoryID() {
      return parseInt(this.$route.params.sample)
    },
    organization() {
      return this.$store.getters['organizations/getOrganization']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    selectedAll: {
      get() {
        return this.selectedItems.length > 0 && this.selectedItems.length === this.items.data.length
      },
      set(bool) {
        if (bool) {
          this.selectedItems = []
          this.selectedItems = this.items.data
        } else {
          this.selectedItems = []
        }
      }
    },
  },
}
</script>

<style scoped>

</style>
