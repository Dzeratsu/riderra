<template>
  <div>
    <main-section></main-section>
    <!--<h1><nuxt-link to="/transport">фыв</nuxt-link></h1>-->

    <section-first></section-first>
    <section-cities></section-cities>
    <section-cars></section-cars>
    <reviews></reviews>
    <partners></partners>
    <questions></questions>
    <section class="site-section site-section--pf">
      <form-feedback :data="formData"></form-feedback>
    </section>
    <autopark/>
  </div>

</template>

<script>
import maps from '~/components/maps.vue'
import mainSection from '~/components/main/topSection.vue'
import sectionFirst from '~/components/main/HowWeWorks.vue'
import sectionCities from '~/components/main/citiesSection.vue'
import sectionCars from '~/components/main/carpark.vue'
import reviews from '~/components/main/reviews.vue'
import partners from '~/components/main/partners.vue'
import questions from '~/components/main/questions.vue'
import formFeedback from '~/components/partials/form.vue'
import Autopark from "@/components/main/autopark";

export default {
  components: {
    Autopark,
    maps, mainSection, sectionFirst, sectionCities, sectionCars, reviews, partners, questions, formFeedback
  },
  data(){
    return {
      formData: {
        class: 'feedback'
      }
    }
  },
  async created () {

    if(this.$route.query.pay=="cancel") {
      let order = localStorage.getItem(this.$route.query.order);
      if (order!=null) {
        console.log("PaySera Cancel")
        let deleteData = {
          BookingID: this.$route.query.order,
          Reason: "Invoice: Cancel"
        }
        console.log("Booking Canceling...")
        let {data} = await this.$store.dispatch("cancelBooking", deleteData);
        if (data.Success) {
          console.log("Booking Cancelled!")
          localStorage.removeItem(this.$route.query.order)
        }
      }
      this.$router.replace({ path: '/' });
    }
  },
}
</script>

<style scoped lang="scss">

  .site-section--pf{

    .container{
      padding-bottom: 230px;
    }
  }


  @media (max-width: 1024px){

    .site-section--pf{

      .container{
        padding-bottom: 120px;
      }
    }
  }
  @media (max-width: 767px){

    .site-section--pf{

      .container{
        padding-bottom: 100px;
      }
    }
  }
</style>

