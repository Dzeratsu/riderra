<template>
  <footer class="footer container">
    <div class="row footer__top">
      <div class="col-sm-3 col-xs-12">
      <div class="footer__logo ">
        <svg width="108" height="23" viewBox="0 0 108 23" class="logo__img">
          <use xlink:href="/sprite.svg#logo"></use>
        </svg>

        <language :data="langData"></language>

      </div>
      </div>
      <ul class="footer__col col-xs-12 col-sm-3 ">
        <li><a href="/terms-of-use.pdf" target="_blank" class="footer__link">{{$tc('main.termOfUse')}}</a></li>
        <li><a href="/privacy-policy.pdf" target="_blank" class="footer__link">{{$tc('main.privacy')}}</a></li>
      </ul>
      <ul class="footer__col footer__col--contacts col-xs-12 col-sm-3 col-md-push-1">
        <li><a class="footer__link phone" href="tel:+78122004946">+7-812-200-49-46</a></li>
        <li><a class="footer__link" href="mailto:mail@riderra.ru">mail@riderra.ru</a></li>
      </ul>

      <div class="col-sm-3 col-xs-12 ">
        <div class="socials">
          <a href="#" class="socials__link">
            <svg width="21" height="21" viewBox="0 0 20 21" fill="none">
              <use xlink:href="/sprite.svg#insta"></use>
            </svg>
          </a>
          <a href="#" class="socials__link">
            <svg width="21" height="13" viewBox="0 0 21 12">
              <use xlink:href="/sprite.svg#vk"></use>
            </svg>
          </a>
          <a href="#" class="socials__link">
            <svg width="11" height="21" viewBox="0 0 11 21">
              <use xlink:href="/sprite.svg#fb"></use>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="row footer__bottom">
      <div class="col-sm-3 col-xs-12 footer__copyright">
        © 2012-{{year.getFullYear()}} Riderra
      </div>
      <div class="col-sm-4 col-xs-12 money-operators">
        <img class="money-operators__item" src="/img/cards/visa.svg" alt="">
        <img class="money-operators__item" src="/img/cards/mastercard.svg" alt="">
        <img class="money-operators__item" src="/img/cards/visa_n.svg" alt="">
        <img class="money-operators__item" src="/img/cards/mir.svg" alt="">
        <img class="money-operators__item" src="/img/cards/apple_pay.svg" alt="">
        <img class="money-operators__item" src="/img/cards/paysera_logotype_internet.svg" alt="">

      </div>
      <div class="col-sm-4 col-xs-12 col-sm-push-1 made-by">
        <span style="font-size: 18px"> <a href="https://awem.pro/" target="blank">developed by awem</a></span>


      </div>
    </div>
  </footer>
</template>

<script>
  import language from '~/components/partials/language.vue'

  export default {
    components:{
      language
    },
    data(){
      return {
        year: new Date(),
        langData: {
          class: 'blue'
        }
      }
    }
  }
</script>
<style lang="scss" scoped>

  .money-operators {
    display: flex;
    align-items: center;

    &__item {

      & + & {
        margin-left: 30px;
      }
    }
  }

  .made-by {
    display: flex;
    font-size: 12px;
    justify-content: flex-end;

    span {
      line-height: 32px;
    }
  }

  .socials {
    display: flex;
    justify-content: flex-end;

    margin-left: auto;

    &__link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      border: 1px solid #c4c4c4;
      border-radius: 50%;
      transition: 150ms border-color;


      & + & {
        margin-left: 15px;
      }

      svg{
        fill: #c4c4c4;
        transition: 150ms all;
      }

      &:hover{
        border-color: #b4b4b4;

        svg{
          fill: #b4b4b4;
        }
      }
    }


  }

  .footer {
    padding-bottom: 54px;
    color: #000;
    font-size: 14px;
    position: relative;

    &__link{
      color: #000;
      transition: 150ms color;

      &:hover{
        color: #707070;
      }
    }

    &__copyright {
      color: #7D7D7D;
      display: flex;
      align-items: center;
    }

    a {
      text-decoration: none;
    }

    &__top {
      display: flex;
      flex-wrap: wrap;
      padding-top: 50px;

      &:before{
        content: '';
        display: block;
        width: 100%;
        max-width: 1166px;
        height: 1px;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background: #D8D8E6;

      }
    }

    &__bottom {
      display: flex;
      flex-wrap: wrap;
      padding-top: 80px;
    }

    &__links {
      padding-top: 15px;

      &--contacts {
        padding-top: 10px;
      }
    }

    &__phone {
      text-decoration: none;
    }

    &__logo{

      display: flex;
      align-items: flex-end;
      svg {
        fill: #000;
      }
    }


    .phone {
      font-size: 16px;
    }
  }

  .payment-page .footer__top:before{
    content: none;
  }

  @media all and (max-width: 1024px) {

    .footer {
      font-size: 10px;

      &__copyright {
        display: flex;
        align-items: center;
      }

      &__logo {
        justify-content: center;

      }

      &__col {
        text-align: left;
      }
    }

    .socials {
      justify-content: center;
    }

    .money-operators {
      display: flex;
      align-items: center;

      &__item {
        max-width: 30px;
        max-height: 12px;

        & + & {
          margin-left: 20px;
        }
      }
    }

    .socials {

      &__link {
        width: 30px;
        height: 30px;

        svg {
          max-width: 16px;
          max-height: 18px;
        }
      }
    }

    .made-by {

      span {
        line-height: 30px;
      }

      &__logo {
        max-width: 85px;
      }
    }
  }

  @media all and (max-width: 767px) {

    .footer {

      &__top{

        &:before{
          width: 90%;
        }
      }

      &__bottom{
        padding-top: 0;
      }

      &__copyright{
        justify-content: center;
        order: 3;
        margin-top: 20px;

      }

      &__logo {
        text-align: center;
        margin-bottom: 40px;
      }

      &__col {
        text-align: center;
        margin-bottom: 40px;

      }
    }

    .money-operators{
      justify-content: center;
      order: 2;

    }

    .socials {
      justify-content: center;
      margin-bottom: 40px;

    }

    .made-by{
      justify-content: center;
      order: 1;
      margin-bottom: 40px;


    }

  }
</style>
