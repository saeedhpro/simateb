<template>
  <div
    ref="container"
    class="d-flex flex-row flex-wrap"
  >
    <slot />
  </div>
</template>

<script>
import { Fancybox } from "@fancyapps/ui";
import '@fancyapps/ui/dist/fancybox/fancybox.css';

export default {
  name: "Fancybox",
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    Fancybox.defaults = {
      ...Fancybox.defaults,
      thumbs: {
        type: "classic",
        axis: 'y',
        parentEl: this.$refs.container,
      },
    }
    Fancybox.bind(this.$refs.container, '[data-fancybox]', {
      ...(this.options || {
        thumbs: {
          autoStart : true,
          parentEl: this.$refs.container,
          type: "classic",
          axis: 'y',
        }
      }),
    });
  },
  updated() {
    Fancybox.unbind(this.$refs.container);
    Fancybox.close();
    Fancybox.defaults = {
      ...Fancybox.defaults,
      thumbs: {
        autoStart : true,
        type: "classic",
        axis: 'y',
        parentEl: this.$refs.container
      },
    }
    Fancybox.bind(this.$refs.container, '[data-fancybox]', {
      ...(this.options || {
        thumbs: {
          autoStart : true,
          type: "classic",
          axis: 'y',
          parentEl: this.$refs.container
        }
      }),
    });
  },
  unmounted() {
    Fancybox.destroy();
  },
}
</script>

<style scoped lang="scss">

</style>
