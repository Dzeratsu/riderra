<template>
  <div class="modal" v-scroll-lock="true">
    <div class="modal__inner">
      <div class="car-class__header">
        <div class="car-class__close" @click="hidePopup">
          <svg viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1.29447" y1="0.587365" x2="23.2945" y2="22.5874" stroke="white"/>
            <line y1="-0.5" x2="31.1127" y2="-0.5"
                  transform="matrix(0.708057 -0.706156 0.708057 0.706156 0.940918 22.9409)" stroke="white"/>
          </svg>
        </div>
        <slider></slider>
        <div class="description container">
          <transition name="fade" mode="out-in">
            <div class="description__title" :key="currentCar.title">{{ $tc(currentCar.title) }}</div>
          </transition>
          <transition name="fade" mode="out-in">
            <div class="description__text" :key="currentCar.desc">{{ $tc(currentCar.desc) }}</div>
          </transition>
          <transition name="fade" mode="out-in">
            <div class="description__price" :key="currentCar.price">{{ currentCar.price | toUSD }} <span v-if="currentCar.сurrency_icon">{{currentCar.сurrency_icon}}</span><span v-else>₽</span></div>
          </transition>
        </div>
      </div>
      <div class="car-class__content">
        <div class="container">
          <div v-swiper:mySwiper="swiperData" class="slider" ref="mySlider">
            <div class="swiper-wrapper">
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
              <p v-html="$tc(currentCar.largetext)"/>
              <!--<button class="button modal__button" @click.self="chooseCar">Заказать</button>-->

              <div class="modal__button" @click="leavePage" ref="chooseButton">
                <nuxt-link to="/payment" class="button">{{$tc('main.utility.choose')}}</nuxt-link>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
import formFeedback from '~/components/partials/form.vue'
import slider from '~/components/partials/popupSlider.vue'
import calendar from '~/components/partials/calendar.vue'

export default {
  components: {
    formFeedback, slider, calendar
  },
  computed: {
    currentCar() {
      console.log('current get');
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
          renderBullet: function (index, className) {
            return '<span class="' + className + '"><span class="swiper-bullet-inner"></span></span>';
          },
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
  methods: {
    hidePopup() {
      this.$store.commit('showPopup', false);
    },
    leavePage() {
      this.$store.commit('showPopup', false);
    }
  },
  data() {
    return {
      formData: {
        class: 'transport-form car-form'
      },
    }
  },
  head() {
    return {
      bodyAttrs: {},
    }
  },

}
</script>
<style scoped lang="scss">


.fade-enter-active, .fade-leave-active {
  transition: all 250ms;
  opacity: 1;
  transform: translate3d(0, 0, 0);
  visibility: visible;
}

.fade-leave-active {
  transition-duration: 0ms;

  .modal-cars__item {
    opacity: 0;
    transition-duration: 0ms;
    visibility: hidden;


  }
}


.fade-enter, .fade-leave-to /* .list-leave-active до версии 2.1.8 */
{
  visibility: hidden;

  transform: translate3d(0, -100%, 0);

}

.description {
  max-width: 100%;
  display: flex;
  align-items: flex-start;
  color: #fff;
  position: absolute;
  bottom: 150px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);

  &__container {
    width: 100%;
  }

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
    width: 40%;
    margin-left: 10%;
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
  width: 100%;
  min-height: 100vh;
  z-index: 100;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background: #702283;

  &__button {
    width: 100%;
    margin-top: 40px;
  }

  &__inner {
    min-height: 100%;
    width: 100%;
    overflow-y: scroll;
  }

}

.car-class {

  &__header {
    height: 100vh;
    background: #702283;
    position: relative;
    min-height: 650px;
    max-height: 800px;
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
    background: #2F80ED;
    border-radius: 50%;
    transition: background-color 150ms;

    &:hover {
      background: #619EF1;
    }

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
    bottom: 90px;

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

  .car-class {

    &__header {
      height: 600px;
    }
  }
}

@media (max-width: 767px) {

  .car-class {

    &__header {
      min-height: 480px;
      overflow: hidden;
      height: 100vh;
    }

    &__close {
      top: 25px;
      right: 25px;
      padding: 15px;
      width: 38px;
      height: 38px;
      padding: 10px;
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
    flex-direction: column;
    bottom: 60px;

    &__title {
      font-size: 18px;
      width: 50%;
    }

    &__text {
      font-size: 12px;
      width: 70%;
      margin: 0;

    }

    &__price {
      font-size: 18px;
      width: 50%;
      margin-left: 0;
      margin-top: 20px;
    }

  }
}
</style>
