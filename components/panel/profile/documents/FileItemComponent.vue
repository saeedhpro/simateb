<template>
  <div class="file-item-component">
    <v-row>
      <v-col
        cols="12"
        sm="4"
        md="3"
      >
        <v-dialog
          v-model="show"
          max-width="600px"
          width="100%"
        >
          <v-img
            width="100%"
            :src="path"
          />
        </v-dialog>
        <a v-if="ext === 'pdf'" class="file-image" :href="path" target="_blank">
          <img src="/images/form/pdf.svg" alt="" style="max-height: 160px">
        </a>
        <img v-else class="file-image" :src="path" @click="toggleShow" alt="">
      </v-col>
      <v-col
        cols="12"
        sm="8"
        md="4"
      >

        <div class="input-box">
          <label
            for="info"
          >
            توضیح پزشک
          </label>
          <textarea
            id="info"
            class="info-input"
            @input="changeInput"
            name="info"
            v-model="i"
            :disabled="isPatient"
          >

      </textarea>
        </div>
      </v-col>
      <v-col
        cols="12"
        :sm="isPatient ? 9 : 8"
        :md="isPatient ? 5 : 4"
      >
        <div class="input-box">
          <label
            for="comment"
          >
            نظر بیمار
          </label>
          <textarea
            id="comment"
            class="comment-input"
            @input="changeInput"
            name="comment"
            v-model="c"
            :disabled="!isPatient"
          >
      </textarea>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="4"
        md="1"
        v-if="!isPatient"
      >
        <v-dialog
          v-model="showDelete"
          max-width="680"
        >
          <v-card
            class="accept-file-remove-model"
          >
            <button
              class="close"
              @click="remove"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <v-card-title class="accept-file-remove-title">
              <span>لطفا در انجام این عمل دقت کنید!</span>
            </v-card-title>

            <v-card-text
              class="accept-file-remove-text"
            >
              داکیومنت ارسالی بیمار حذف خواهد شد و قابل بازگشت نیست
            </v-card-text>

            <v-card-actions>
              <button
                class="action-button accept-button"
                @click="acceptDelete"

              >
                ادامه بده
              </button>
              <v-spacer></v-spacer>
              <button
                class="action-button cancel-button"
                @click="remove"
              >
                انصراف
              </button>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div class="d-flex flex-row justify-space-between">
          <button
            @click="remove"
            class="remove-button"
          >
            <v-icon>
              mdi-delete-outline
            </v-icon>
          </button>
          <button
            @click="change"
            class="remove-button save"
          >
            <v-icon>
              mdi-content-save-outline
            </v-icon>
          </button>
        </div>
      </v-col>
<!--      <v-col-->
<!--        cols="12"-->
<!--      >-->
<!--        <div class="d-flex justify-end">-->
<!--          <button class="main-button" :style="{maxWidth: '160px'}" @click="change">ذخیره</button>-->
<!--        </div>-->
<!--      </v-col>-->
    </v-row>
  </div>
</template>

<script>
export default {
  name: "FileItemComponent",
  props: {
    id: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
      default: "",
    },
    ext: {
      type: String,
      required: true,
      default: "jpg",
    },
    info: {
      type: String,
      default: "",
    },
    comment: {
      type: String,
      default: "",
    }
  },
  mounted() {
    this.i = this.info
    this.c = this.comment
  },
  data() {
    return {
      show: false,
      showDelete: false,
      c: '',
      i: '',
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    },
    remove() {
      this.showDelete = !this.showDelete
    },
    acceptDelete() {
      this.$emit('remove', this.id)
      this.remove()
    },
    changeInput(e) {
      // this.$emit('input', {
      //   id: this.id,
      //   index: this.index,
      //   [e.target.name]: e.target.value,
      // })
    },
    change() {
      this.$emit('change', {
        id: this.id,
        info: this.i,
        comment: this.c,
        path: this.path,
        ext: this.ext,
      })
    }
  },
  computed: {
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    isPatient() {
      if (this.loginUser) {
        return this.loginUser.user_group_id === 1
      }
      return false
    }
  }
}
</script>

<style scoped>

</style>
