<template>
  <div v-swiper:mySwiper="swiperData" class="cars" :class="{'transport-cars': data.type === 'transport'}" ref="mySlider">
    <div class="swiper-wrapper ">
      <div class="swiper-slide cars__item"
           :style="{ backgroundColor: slide.color, color: slide.color}"
           v-for="(slide, i) in carsSlider"
           :key="i"
           @click="showPopup(slide)"
            >
        <figure class="cars__inner">
          <!--<img :ssrc="slide.src" class="cars__img">-->
          <!--<div class="cars__img"
               :style="{ backgroundImage: 'url(' + slide.src + ')'}"></div>-->

          <div class="cars__figure">
            <img :src="slide.src" alt="" class="cars__img">
          </div>
          <figcaption class="cars__caption">
            <div class="cars__title h3" ref="swiperTitle" v-html="$tc(slide.title)"></div>
            <p class="cars__desc" ref="swiperDesc" v-html="$tc(slide.models)"></p>

            <div class="cars-price">
              <div class="cars-price__current">От {{ slide.price | toUSD }} <span v-if="slide.сurrency_icon">{{slide.сurrency_icon}}</span><span v-else>₽</span></div>
              <div class="cars-price__prev" v-if="slide.prevPrice">{{ slide.prevPrice | toUSD}} <span v-if="slide.сurrency_icon">{{slide.сurrency_icon}}</span><span v-else>₽</span></div>
            </div>
            <div @click.self="chooseCar(slide)" class="cars__button" ref="chooseButton">
              <nuxt-link to="/payment" class="cars__button-link white-button">{{$tc('main.utility.choose')}}</nuxt-link>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>

  import { mapState } from 'vuex'


  export default {
    computed: mapState(['cars']),
    props: ['data'],
    filters: {
      toUSD (value) {
        return String(value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
      }
    },
    data() {
      return {
        carsSlider: this.cars,
        swiperData: {
          slidesPerView: 3,
          speed: 400,
          spaceBetween: 20,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '"><span class="swiper-bullet-inner"></span></span>';
            },
          },
          breakpoints: {
            767: {
              slidesPerView: 'auto',
            }
          }
        }
      }
    },
    methods:{

      showPopup(current){
        if(event.target.classList.contains('white-button')){
          this.setCurrent(current)
          return ;
        }
        this.setCurrent(current)
        this.$store.commit('showPopup', true);


      },
      setCurrent(current){
        let that = this;
        console.log(current);
        this.$store.commit('currentCarObj', current);
        localStorage.setItem('currentCar', JSON.stringify(that.$store.state.current))
      },
      chooseCar(current){

        console.log('chooooose')
        let that = this;
        this.$store.commit('showPopup', false);

        this.setCurrent(current)
        // this.$store.commit('showPopup', true);

          // console.log(this.$store.state.current)

      },
    },
    mounted() {

      if (this.$route.fullPath=="/transport") {
        this.carsSlider = this.$store.getters.getActiveTarifs;
      } else {
        this.carsSlider = this.cars;
      }
      setTimeout (()=>{
        if (this.$store.state.ivcardoPrices) {
          this.$store.dispatch("priceAction");
        }
      },0)
    }
  }
</script>
<style scoped lang="scss">

  .page-leave-active .cars__img{
    display: none;
  }

  .transport-cars{
    margin-top: 70px;
    margin-bottom: 200px;

    .cars{

      &__title{
        position: absolute;
        top: 25px;
        left: 20px;
      }

      &__button{
        display: block;
        max-width: 131px;
        margin-top: 0;
        height: 62px;
        width: 100%;


      }

      &__button-link{
        margin-top: 0;
        &:hover{
          color: #000;
          background: #fff;
        }
      }

      &__caption{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      &__desc{
        width: 100%;
        margin-bottom: 30px;
      }

      &__item{
        padding-top: 65px;
      }


    }

    .cars-price{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      position: relative;

      &__prev{
        order: 1;
        text-decoration: line-through;
        position: absolute;
        transform: translateY(-50%);
        top: 0px;
      }

      &__current{
        order: 2;
      }
    }
  }

  .cars-price{
    display: none;
    align-items: flex-end;
    color: #fff;
    font-size: 32px;
    font-weight: normal;

    &__prev{
      opacity: 0.7;
      font-size: 18px;

    }
  }

  .cars {

    &__button{
      display: none;
    }

    &__button-link{
      text-decoration: none;

      &:hover{
        text-decoration: none;
      }
    }

    .swiper-slide {
      opacity: 0;
      transform: translate3d(10%, 0, 0);
      transition: transform 250ms, opacity 250ms, box-shadow 250ms;
    }
    .swiper-slide-active,
    .swiper-slide-next,
    .swiper-slide-next + .swiper-slide {
      opacity: 1;
      transform: translate3d(0, 0, 0);

    }

    &.swiper-container {
      overflow: visible;
    }

    &__item {
      padding: 45px 0 40px;
      border-radius: 5px;
      color: #fff;
      position: relative;
      overflow: hidden;
      transition: transform 250ms, box-shadow 250ms;
      text-decoration: none;
      cursor: pointer;

      &:hover,
      &:focus {
        transform: translate3d(0,-10px,0);
        box-shadow: 0 20px 90px 3px;
        text-decoration: none;
        outline: none;
      }
    }

    &__inner {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__figure{
      position: relative;
      overflow: hidden;
      margin-bottom: 50px;
    }

    &__img {
      max-width: 140%;
      position: relative;
      transform: translate3d(-40%, 0, 0);

    }

    &__caption {
      padding: 0 20px;
      color: #fff;
    }

    &__desc {
      width: 60%;
      color: #fff;
    }
  }



  @media all and (max-width: 1024px) {
    .cars {

      &__item {
        padding: 30px 0;

        &:focus,
        &:hover{
          transform: translate3d(0,0,0);
        }
      }

      &__figure{
        margin-bottom: 25px;
      }


      &__desc {
        font-size: 12px;
        width: 80%;
      }
    }

    .transport-cars{
      margin-top: 60px;
      margin-bottom: 100px;

      .cars{

        &__item{
          padding-top: 55px;
          top: 0;

         /* &:hover{
            height: 365px;
            .cars__desc{
              height: auto;
              margin: 10px 0 20px;
              opacity: 1;

            }

            .cars-price{
              padding-top: 40px;
            }
          }*/
        }

        &__desc{
          margin: 0;
          opacity: 0;
          height: 0;
          position: absolute;
          bottom: 110px;
          transition: all 250ms;
        }

        &__button{
          height: 50px;
          line-height: 50px;
          max-width: 100%;
        }

      }

      .cars-price{
        width: 100%;
        font-size: 22px;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        padding-right: 20px;
        margin-bottom: 12px;

        &__current{
          order: 1;

        }

        &__prev{
          font-size: 12px;
          position: relative;
          transform: translateY(0);
          order: 2;
        }
      }
    }




  }

  @media all and (max-width: 767px) {
    .cars{
      padding-bottom: 0;

      &__item{
        width: 80%;
        transition: all 0s;
      }

      .swiper-pagination{
        display: none;
      }
    }

    .transport-cars{
      margin-top: 30px;
      margin-bottom: 90px;
    }
  }
</style>
