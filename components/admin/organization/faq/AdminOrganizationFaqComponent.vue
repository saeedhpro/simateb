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
          <div class="selected-count" v-if="selectedFaqs.length > 0">
            {{ selectedFaqs.length }}
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
          <span class="title-main">افزودن سوال جدید</span>
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
          :total="faqs.meta.total"
          @paginate="paginate"
        >
          <template v-slot:body>
            <tr v-for="(i, n) in faqs.data" :key="n">
              <td class="text-center">{{ (page - 1) * 10 + n + 1 }}</td>
              <td class="text-center">
                <div class="table-row flex flex-row align-center justify-start">
                  <input type="checkbox"
                         class="table-selectable-checkbox"
                         v-model="selectedFaqs"
                         :value="i"
                  />
                  <span class="mr-5">{{ i.question ? i.question : '-' }}</span>
                </div>
              </td>
              <td class="text-center">{{ i.answer ? i.answer : '-' }}</td>
              <td class="text-center flex flex-row justify-space-around align-center">
                <button @click="openCreateModal(false,i)" class="action-buttons">
                  <v-icon size="16">mdi-pencil-outline</v-icon>
                  <span>ویرایش</span>
                </button>
              </td>
            </tr>
          </template>
          <template v-slot:notfound>
            <div v-if="faqs.meta.total === 0">اطلاعاتی یافت نشد</div>
          </template>
        </data-table-component>
      </v-col>
    </v-row>
    <v-dialog
      v-model="showCreateModal"
      max-width="1056px"
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
              @click="closeCreateModal"
              class="create-update-modal-close"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <span v-if="created">فرم ایجاد سوال</span>
            <span v-else>فرم ویرایش سوال</span>
          </div>
          <v-spacer/>
          <div class="create-update-modal-regbox">
          </div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <div class="create-update-model-input-box">
                  <label>سوال</label>
                  <input type="text" v-model="form.question">
                </div>
              </v-col>
              <v-col
                cols="12"
              >
                <div class="create-update-model-input-box">
                  <label>پاسخ</label>
                  <textarea v-model="form.answer" rows="4"></textarea>
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
                sm="3"
                md="3"
              >
                <button
                  class="second-button full-width"
                  @click="clearForm"
                >
                  پاک کردن فرم
                </button>
              </v-col>
              <v-spacer/>
              <v-col
                cols="12"
                sm="3"
                md="3"
              >
                <button
                  class="second-button full-width"
                  @click="closeCreateModal"
                >
                  بستن
                </button>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <button
                  class="main-button"
                  @click="createFaq"
                >
                  ذخیره
                </button>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import DataTableComponent from "~/components/panel/global/DataTableComponent";

export default {
  name: "AdminOrganizationFaqComponent",
  components: {
    DataTableComponent,
  },
  data() {
    return {
      showDelete: false,
      showCreateModal: false,
      selectedFaqs: [],
      form: {
        id: 0,
        question: '',
        answer: '',
      },
      created: true,
      headers: [
        '',
        'سوال',
        'پاسخ',
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
    }
  },
  mounted() {
    this.paginate(1)
  },
  methods: {
    paginate(page = 1) {
      this.getFaqsList()
      this.$emit('paginate', page)
    },
    getFaqsList() {
      this.selectedFaqs = []
      const data =  {
        organization_id: this.organization.id,
        page: this.page,
        limit: this.limit
      }
      this.$store.dispatch('admin/organizations/getOrganizationFaqs',data)
      this.$emit('getFaqsList', this.q)
    },
    clearForm() {
      this.form = {
        id: 0,
        question: '',
        answer: ''
      }
    },
    createFaq() {
      if (this.created) {
        const data = {
          organization_id: this.organization.id,
          question: this.form.question,
          answer: this.form.answer,
        }
        this.$store.dispatch('admin/organizations/createOrganizationFaq', data)
          .then(() => {
            this.$toast.success('با موفقیت انجام شد')
            this.closeCreateModal()
            this.paginate(1)
          })
          .catch(err => {
            this.$toast.error('متاسفانه خطایی رخ داده است لطفا بعدا امتحان کنید')
          })
      } else {
        const data = {
          id: this.form.id,
          question: this.form.question,
          answer: this.form.answer,
        }
        this.$store.dispatch('admin/organizations/updateOrganizationFaq', data)
          .then(() => {
            this.$toast.success('با موفقیت انجام شد')
            this.closeCreateModal()
            this.paginate(1)
          })
          .catch(err => {
            this.$toast.error('متاسفانه خطایی رخ داده است لطفا بعدا امتحان کنید')
          })
      }
    },
    openCreateModal(created = true, faq = null) {
      this.created = created
      if (faq) {
        this.form = {
          ...faq
        }
      }
      this.showCreateModal = true
    },
    closeCreateModal() {
      this.created = true
      this.showCreateModal = false
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
      this.selectedFaqs = e
    },
    toggleShowDelete() {
      this.showDelete = !this.showDelete
    },
    remove() {
      this.deleteFaqs(this.selectedFaqs.map(i => i.id))
        .then(()=> {
          this.action = null
          this.selectedFaqs = []
          this.toggleShowDelete()
          this.getFaqsList()
        })
    },
    deleteFaqs(ids) {
      console.log(ids, "ids")
      return this.$store.dispatch('admin/organizations/deleteOrganizationFaqs', {
        ids
      })
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
          this.closeForm(true)
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
    },
  },
  computed: {
    organization() {
      return this.$store.getters['organizations/getOrganization']
    },
    faqs() {
      return this.$store.getters['admin/organizations/getOrganizationFaqs']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    selectedAll: {
      get() {
        return this.selectedFaqs.length > 0 && this.selectedFaqs.length === this.faqs.data.length
      },
      set(bool) {
        if (bool) {
          this.selectedFaqs = []
          this.selectedFaqs = this.faqs.data
        } else {
          this.selectedFaqs = []
        }
      }
    },
  },
}
</script>

<style scoped>

</style>
