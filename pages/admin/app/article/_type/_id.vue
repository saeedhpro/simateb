<template>
  <div class="profile-page">
    <v-container
      fluid
    >
      <app-header-component
        :type="getType"
        :is-article-page="true"
        @saveArticle="saveArticle"
      />
      <v-row>
        <v-col
          cols="12"
        >
          <v-card
            class="page-main-box"
          >
            <v-row>
              <v-col
                cols="12"
                md="8"
              >
                <div class="d-flex flex-column align-start justify-start">
                  <custom-text-input
                    :label="'عنوان'"
                    v-model="form.title"
                  />
                  <div class="create-update-model-input-box mt-4">
                    <label>متن</label>
                    <ckeditor-vue class="full-width" v-model="form.body" :config="editorConfig"/>
                  </div>
                </div>
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <div class="d-flex flex-column align-start justify-start">
                  <div class="create-update-model-input-box">
                    <label>دسته بندی ها</label>
                    <multiselect
                      v-model="form.categories"
                      :options="categories"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      label="name"
                      track-by="name"
                      placeholder=""
                      :show-labels="false">
                      <template slot="singleLabel" slot-scope="props"><span
                        class="option__desc"><span
                        class="option__title">{{ props.option.name }}</span></span>
                      </template>
                      <template slot="option" slot-scope="props">
                        <div class="option__desc"><span
                          class="option__title">{{ props.option.name }}</span></div>
                      </template>
                    </multiselect>
                  </div>
                  <div class="create-update-model-input-box full-height mt-4" style="max-height: 175px">
                    <label>تصویر شاخص</label>
                    <div class="file-input full-height">
                      <input
                        type="file"
                        ref="image"
                        name="image"
                        hidden
                        accept="image/*"
                        @change="chooseImage"
                      >
                      <img
                        class="full-height"
                        :src="form.new_thumbnail ? form.new_thumbnail : this.form.thumbnail ? this.form.thumbnail : '/images/pages/img.svg'"
                        @click="openChooseImage"
                      >
                      <crop-image-component
                        ref="crop"
                        @imaged="imaged"
                        @newImage="openChooseImage"
                      />
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AppHeaderComponent from "~/components/admin/app/AppHeaderComponent.vue";
import CkeditorVue from "~/components/global/Ckeditor.vue";
import CropImageComponent from "~/components/panel/global/CropImageComponent.vue";

export default {
  name: 'CreateArticle',
  components: {CropImageComponent, CkeditorVue, AppHeaderComponent},
  layout: 'admin',
  middleware: 'auth',
  data() {
    return {
      form: {
        id: 0,
        title: '',
        thumbnail: '',
        new_thumbnail: '',
        body: '',
        type: this.getType,
        is_special: false,
        categories: [],
      },
      categories: [],
    }
  },
  mounted() {
    this.getArticle()
    this.getCategories()
  },
  methods: {
    getArticle() {
      const id = this.$route.params.id
      this.$store.dispatch('admin/app/getArticle', id)
        .then(res => {
          const article = res.data.data
          this.form = {
            id: article.id,
            title: article.title,
            thumbnail: article.thumbnail,
            new_thumbnail: '',
            body: article.body,
            type: article.type,
            is_special: article.is_special,
            categories: [
              ...article.categories,
            ],
          }
        })
    },
    getCategories() {
      this.$store.dispatch('admin/app/getCategoryList', {
        type: this.getType
      })
        .then(res => {
          this.categories = res.data.data
        })
    },
    saveArticle() {
      const data = {
        ...this.form,
        type: this.getType,
        categories: this.form.categories.map(i=>i.id),
      }
      this.$store.dispatch('admin/app/updateArticle', data)
        .then(res => {
          this.$toast.success('مقاله با موفقیت ثبت شد')
          this.getArticle()
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است')
        })
    },
    chooseImage(e) {
      this.$refs.crop.setImage(e)
    },
    imaged(file) {
      if (!file) return
      this.form.new_thumbnail = file
      this.form.ext = file.split(",")[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0].split('/')[1]
    },
    openChooseImage() {
      this.$refs.image.value = null
      this.$refs.image.click()
    },
  },
  computed: {
    getType() {
      return this.$route.params.type
    },
    editorConfig() {
      return {
        fontFamily: {
          options: [
            'default',
            'IranSans X, Iransansx',
            'Ubuntu, Arial, sans-serif',
            'Ubuntu Mono, Courier New, Courier, monospace'
          ]
        },
        removePlugins: ['MediaEmbed', 'MediaEmbedToolbar'],
        toolbar: {
          items: [
            'heading',
            '|',
            'fontSize',
            'fontFamily',
            '|',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            '|',
            'highlight',
            'findAndReplace',
            'removeFormat',
            'selectAll',
            'specialCharacters',
            '|',
            'code',
            'codeBlock',
            'horizontalLine',
            '|',
            'alignment',
            '|',
            'numberedList',
            'bulletedList',
            '|',
            'outdent',
            'indent',
            '|',
            'todoList',
            'link',
            'blockQuote',
            'imageUpload',
            'insertTable',
            'mediaEmbed',
            '|',
            'textPartLanguage',
            'undo',
            'redo'
          ]
        },
        language: 'en',
        image: {
          toolbar: [
            'imageTextAlternative',
            'toggleImageCaption',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side'
          ]
        },
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableCellProperties',
            'tableProperties'
          ]
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
