<template>
  <div class="modal">
    <div class="modal__inner">
      <div class="car-class__header">
        <nuxt-link to="/" class="car-class__close">
          <svg viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1.29447" y1="0.587365" x2="23.2945" y2="22.5874" stroke="white"/>
            <line y1="-0.5" x2="31.1127" y2="-0.5"
                  transform="matrix(0.708057 -0.706156 0.708057 0.706156 0.940918 22.9409)" stroke="white"/>
          </svg>
        </nuxt-link>
        <slider></slider>
        <div class="description container">
          <div class="description__title">{{ currentCar.title }}</div>
          <div class="description__text">{{ currentCar.models }}</div>
          <div class="description__price">{{ currentCar.price | toUSD }} ₽</div>
        </div>
      </div>
      <div class="car-class__content">
        <div class="container">
          <div v-swiper:mySwiper="swiperData" class="slider" ref="mySlider">
            <div class="swiper-wrapper ">
              <div class="swiper-slide slider__item"
                   v-for="(slide, i) in slides"
                   :key="i">
                <img class="slider__img" :src="slide.src" alt="">
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
          <div class="row car-class__descr">
            <div class="col-sm-6">
              <h2 class="h2 site-section__title">{{$tc('main.autopark.features')}}</h2>
            </div>
            <div class="col-sm-6">
              <p v-html="$tc(currentCar.largetext)" />
            </div>
          </div>
        </div>
        <form-feedback :data="formData"></form-feedback>
      </div>
    </div>

  </div>

</template>


<script>
  import formFeedback from '~/components/partials/form.vue'
  import slider from '~/components/partials/popupSlider.vue'

  export default {
    components: {formFeedback, slider},
    computed: {
      currentCar() {
        return this.$store.state.current;
      },

      swiperData() {

        return {
          slidesPerView: 'auto',
          speed: 400,
          spaceBetween: 60,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          slides: this.slides
        }
      },

      slides() {
        return [
          {
            src: '/img/slider/' + this.currentCar.name + '/slide1.jpg'
          }, {
            src: '/img/slider/' + this.currentCar.name + '/slide2.jpg'
          }
        ]
      },
    },
    filters: {
      toUSD(value) {
        return String(value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
      }
    },
    data() {
      return {
        formData: {
          type: 'transport'
        },
      }
    },

    head() {
      return {
        bodyAttrs: {},
      }
    }
    ,

  }
</script>
<style scoped lang="scss">

  .description {
    max-width: 100%;
    display: flex;
    align-items: flex-start;
    color: #fff;
    position: absolute;
    bottom: 55px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);

    &__title {
      font-size: 36px;
      color: #fff;
      width: 20%;
    }

    &__text {
      font-size: 16px;
      line-height: 23px;
      font-weight: 100;
      padding-top: 4px;
      width: 25%;
      margin-left: 15%;
    }

    &__price {
      font-size: 32px;
      width: 20%;
      margin-left: auto;
    }
  }

  .modal {
    position: fixed;
    display: block;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: 100vh;
    z-index: 100;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background: #702283;

    &__inner {
      height: 100%;
      width: 100%;
      overflow-y: scroll;
    }

  }

  .car-class {

    &__header {
      height: 100vh;
      background: #702283;
      position: relative;
    }

    &__close {
      display: block;
      width: 50px;
      height: 50px;
      position: fixed;
      top: 64px;
      right: 64px;
      /*background: url(/img/close.svg) center no-repeat;*/
      cursor: pointer;
      z-index: 20;
      padding: 14px;

      svg {
        max-width: 100%;
      }
    }

    &__content {
      padding-top: 110px;
      padding-bottom: 110px;
      background: #fff;
      overflow: hidden;
    }

    &__descr {
      padding-top: 130px;
      padding-bottom: 150px;

      .h2 {
        max-width: 60%;
      }
    }
  }

  .slider {
    overflow: visible;

    &__item {
      width: 80%;
      overflow: hidden;
    }

    &__img {
      width: 100%;
      max-width: 100%;
      border-radius: 5px;

    }
  }

  @media (max-width: 1024px) {

    .description {

      &__title {
        font-size: 26px;
      }

      &__text {
        font-size: 14px;
      }

      &__price {
        font-size: 26px;
      }

    }
  }

  @media (max-width: 767px) {

    .car-class {

      &__header {
        min-height: 480px;
        overflow: hidden;
      }

      &__close {
        top: 10px;
        right: 10px;
        padding: 15px;
      }

      &__descr {
        padding-bottom: 80px;
      }

      &__content {
        padding-bottom: 70px;
      }
    }

    .description {
      width: 90%;
      padding: 0;
      flex-wrap: wrap;

      &__title {
        font-size: 18px;
        width: 50%;
      }

      &__text {
        font-size: 12px;
        width: 50%;
        margin: 0;

      }

      &__price {
        font-size: 18px;
        width: 50%;
        margin-left: auto;
        margin-top: 20px;
      }

    }
  }
</style>
