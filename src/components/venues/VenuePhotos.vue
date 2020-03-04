<template>
  <div class="card-carousel">
    <div class="card-img">
      <img :src="currentImage" alt="">
      <div class="actions">
            <span @click="prevImage" class="prev">
                <i class="fas fa-chevron-left"></i>
            </span>
        <span @click="nextImage" class="next">
                <i class="fas fa-chevron-right"></i>
            </span>
      </div>
    </div>
    <div class="thumbnails">
      <div
        v-for="(image, index) in  images"
        :key="image.id"
        :class="['thumbnail-image', (activeImage == index) ? 'active' : '']"
        @click="activateImage(index)"
      >
        <img :src="image.thumb">
      </div>
    </div>
  </div>
</template>



<script>
  export default {
    data() {
      return {
        images: [],
        activeImage: 0
      }
    },
    computed: {
      currentImage() {
        return this.images[this.activeImage].big;
      }
    },
    methods: {
      nextImage() {
        var active = this.activeImage + 1;
        if (active >= this.images.length) {
          active = 0;
        }
        this.activateImage(active);
      },
      prevImage() {
        var active = this.activeImage - 1;
        if (active < 0) {
          active = this.images.length - 1;
        }
        this.activateImage(active);
      },
      activateImage(imageIndex) {
        this.activeImage = imageIndex;
      }
    }
  }
</script>
