<template>
  <client-only placeholder="loading...">
    <div>
      <ckeditor-nuxt style="width: 100%" v-if="!loading" v-model="contentHolder" :config="config"  />
    </div>
  </client-only>
</template>

<script>

export default {
  name: "Ckeditor-Vue",
  components: {
    'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    contentHolder: {
      set(val) {
        this.$emit('input', val)
      },
      get() {
        return this.value
      }
    },
    config() {
      return {
        removePlugins: ['Title'],
        simpleUpload: this.simple,
        fontFamily: {
          options: [
            'default',
            'IRANYekanRegular, IRANYekanRegular',
            'Ubuntu, Arial, sans-serif',
            'Ubuntu Mono, Courier New, Courier, monospace',
            'Tahoma',
          ]
        }
      }
    },
    simple(){
      return {
        uploadUrl: this.uploadUrl,
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }
    },
    token() {
      return this.$cookies.get('access_token') ?? ''
    },
    uploadUrl() {
      return `${process.env.baseUrl}/app/upload`
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 500)
  },
};
</script>

<style scoped>
</style>
