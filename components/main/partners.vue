<template>
  <section class="site-section site-section--sm">
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <h2 class="h2 site-section__title">
            {{$tc('main.partners')}}
          </h2>
        </div>
      </div>
      <div v-swiper:mySwiper="swiperData" class="partners" ref="mySlider">
        <div class="swiper-wrapper ">
          <div class="swiper-slide partners__item"
               v-for="(slide, i) in slides"
               :key="i">
              <img :src="slide.src" class="partners__img">

          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

  .partners{

    &__item{
      max-width: 145px;
      height: 145px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__img{
      max-width: 100%;
      max-height: 100%;
    }
  }
  @media all and (max-width: 991px) {


  }

</style>

<script>

  export default {
    components: {},
    data() {
      return {
        swiperData: {
          slidesPerView: 6,
          speed: 400,
          spaceBetween: 30,
          height: 'auto',
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '"><span class="swiper-bullet-inner"></span></span>';
            },
          },
          breakpoints: {
            991:{
              spaceBetween: 20
            },
            667: {
              slidesPerView: 3,
              spaceBetween: 20
            }
          }
        },
        slides: [
          {
            src: '/img/partners/Dottransfers.png',
          },{
            src: '/img/partners/HeyCars.jpg',
          },{
            src: '/img/partners/HolidayTaxis.jpg',
          },{
            src: '/img/partners/Hoppa.png',
          },{
            src: '/img/partners/Jayride.png',
          },{
            src: '/img/partners/Talixo.png',
          },

          {
            src: '/img/partners/Dottransfers.png',
          },{
            src: '/img/partners/HeyCars.jpg',
          },{
            src: '/img/partners/HolidayTaxis.jpg',
          },{
            src: '/img/partners/Hoppa.png',
          },{
            src: '/img/partners/Jayride.png',
          },{
            src: '/img/partners/Talixo.png',
          },
        ]
      }
    },
    mounted() {
      const that = this;
      that.$refs.mySlider.swiper.on('slideChange', function () {
        console.log(this)
      });
    }
  }
</script>


