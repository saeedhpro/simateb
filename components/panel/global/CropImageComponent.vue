<template>
  <div class="crop-image-component">
    <v-dialog
      v-model="dialog"
      :max-width="dialogMaxWidth"
      :max-height="dialogMaxHeight"
      hide-overlay
      :disabled="!imgSrc"
    >
      <img
        v-show="cropSrc"
        :src="cropSrc"
        style="width: 200px; border: 1px solid gray"
        alt="Cropped Image"
      />
      <v-card>
        <v-card-title><span class="headline"></span></v-card-title>
        <v-card-text>
          <cropper
            ref="cropper"
            :guides="false"
            :view-mode="0"
            drag-mode="move"
            :auto-crop-area="0.5"
            :min-container-width="250"
            :min-container-height="180"
            :background="true"
            :rotatable="true"
            :src="imgSrc"
            alt="Source Image"
            :modal="true"
            :img-style="{ width: '400px', height: '400px' }"
            :center="false"
            :highlight="true"
          />
        </v-card-text>
        <v-card-actions>
          <!-- <v-tooltip> -->
          <v-icon color="blue" @click="cropImage">mdi-crop</v-icon>
          <!-- </v-tooltip> -->
          <v-icon color="blue" dark @click="rotate('r');">mdi-rotate-right</v-icon>
          <v-icon color="blue" dark @click="rotate('l');">mdi-rotate-left</v-icon>

          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1" @click="dialog = false;"
          >
            لغو
          </v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "CropImageComponent",
  components: {
  },
  props: {
    value: {},
    pk: {default: "image_key"},
    dialogMaxWidth: {default: "600px"},
    dialogMaxHeight: {default: "0.8vh"},
    maxWidth: {default: 1920},
    maxHeight: {default: 1200},
    // the URL of the blob image
    objectUrl: {default: ""}
  },
  data() {
    return {
      imgSrc: "",
      cropImg: null,
      dialog: false,
      file: null,
      filename: null,
      cropBlob: null
    };
  },
  computed: {
    croppedFile() {
      return new File([this.cropImg], this.file.name, {type: this.file.type});
    },
    cropSrc() {
      return this.cropImg || this.value;
    }
  },
  methods: {
    setImage(e) {
      // const file = e;
      const file = e.target.files[0];
      // this.file = file
      this.filename = file.name;

      if (!file.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }

      if (typeof FileReader === "function") {
        const reader = new FileReader();

        reader.onload = event => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
          this.$emit("update:dataUrl", this.imgSrc);
        };

        reader.readAsDataURL(file);
        this.dialog = true;
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      // this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$refs.cropper
        .getCroppedCanvas({
          maxWidth: this.maxWidth,
          maxHeight: this.maxHeight
        })
        .toBlob(
          blob => {
            this.cropImg = URL.createObjectURL(blob);
            this.croppedBlob = blob;
            this.$emit("update:objectUrl", this.cropImg);
            this.$emit("changed", this.cropImg);
          },
          "image/jpeg",
          0.95
        );
      this.dialog = false;
    },
    rotate(dir) {
      if (dir === "r") {
        this.$refs.cropper.rotate(90);
      } else {
        this.$refs.cropper.rotate(-90);
      }
    },
    flip(vert) {
      let {scaleX, scaleY, rotate} = this.$refs.cropper.getData();
      // when image is rotated, direction must be flipped
      if (rotate === 90 || rotate === 270) {
        vert = !vert;
      }
      if (vert) {
        this.$refs.cropper.scale(scaleX, -1 * scaleY);
      } else {
        this.$refs.cropper.scale(-1 * scaleX, scaleY);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-icon.v-icon.v-icon--link {
  padding: 0 10px;
}
</style>

