<template>
  <transition name="slide">
    <div class="mobile-menu" v-if="menu" v-scroll-lock="menu">
      <div class="mobile-menu__wrap container">
        <language :data="langData"></language>
        <a class="mobile-menu__tel" href="tel:+78122004946">+7-812-200-49-46</a>
        <nav class="nav">
          <a class="nav__link" href="">{{$tc('main.carousel')}}</a>
          <a class="nav__link" href="">{{$tc('main.autopark')}}</a>
          <a class="nav__link" href="">{{$tc('main.reviews')}}</a>
          <a class="nav__link" href="/terms-of-use.pdf" target="_blank">{{$tc('main.termOfUse')}}</a>
          <a class="nav__link" href="/privacy-policy.pdf" target="_blank">{{$tc('main.privacy')}}</a>
        </nav>
<!--
        <a href="#" class="mobile-menu__signin">{{$tc('main.utility.login')}}</a>
-->
      </div>
    </div>
  </transition>
</template>

<script>
  import language from '~/components/partials/language.vue'

  export default {
    components:{
      language
    },
    computed: {
      menu() {
        return this.$store.getters.getMenu;
      }
    },
    data() {
      return {
        langData: {
          class: ''
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .mobile-menu {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background: linear-gradient(90deg, #FF017A 36.45%, #702283 105.02%);
    z-index: 30;
    display: block;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;



    a {
      text-decoration: none;
    }

    &__wrap {
      display: block;
      min-height: 100%;
      overflow-y: scroll;
      padding-top: 85px;
      padding-bottom: 150px;
    }

    &__tel {
      font-size: 26px;
      color: #fff;
    }

    &__signin {
      display: block;
      line-height: 40px;
      border: 1px solid #fff;
      border-radius: 40px;
      padding: 0 16px;
      text-decoration: none;
      font-weight: 800;
      text-align: center;
      font-size: 14px;
      color: #fff;
    }

  }

  .nav {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    margin-bottom: 50px;

    &__link {
      font-size: 18px;
      font-weight: normal;
      text-decoration: none;
      color: #fff;

      & + & {
        margin-top: 20px;
      }

    }


  }

  .slide-enter-active{
    transform: translate3d(0, 0, 0);
    transition: transform 300ms;

  }

  .slide-leave-to, .slide-enter{
    transform: translate3d(0, -100%, 0);
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
