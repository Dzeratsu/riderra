<template>
  <div class="container">
    <form class="form" :class="data.class" ref="form">
      <div
        class="form__row js-form-row"
        v-for="(item, index) in fields"
        :key="index"
      >
        <div class="form__item" :id="index">
          <input
            class="form__input js-required"
            type="text"
            name="name[]"
            :placeholder="$tc('main.utility.setupname')"
            v-model="name"
          />
          <span class="form__item-label">Имя</span>
        </div>
        <div class="form__item">
          <input
            class="form__input js-required input-middle"
            type="tel"
            name="phone[]"
            :placeholder="$tc('main.utility.phone_ex') + ' +84 567-66-77'"
            @input="inputActive($event)"
            v-model="phone"
          />
          <span class="form__item-label">{{ $tc("main.utility.phone") }}</span>
        </div>
         <div class="form__item" :id="index">
          <input
            class="form__input js-required"
            type="text"
            name="email[]"
            :placeholder="'E-mail'"
            v-model="email"
          />
          <span class="form__item-label">E-mail</span>
        </div>
        <div class="form__sub-button js-slice-row" @click="remove(item)">
          Удалить
        </div>
        <div
          class="form__sub-button js-add-row"
          ref="more"
          @click="clone(index)"
        >
          + Дополнительный номер
        </div>
      </div>
      <div class="form__row">
        <div class="form__item form__item--wide">
          <input
            class="form__input"
            type="text"
            name="comment"
            v-model="comment"
            :placeholder="$tc('main.utility.comment')"
          />
          <!--<span class="form__item-label">Комментарий</span>-->
        </div>
      </div>
      <div class="form__row submit-row">
        <div class="form__item policy">
          <label class="policy__label">
            <input class="policy__checkbox" type="checkbox" checked />
            <span
              ><a
                href="/privacy-policy.pdf"
                target="_blank"
                class="policy__link"
                >{{ $tc("main.utility.confidential") }}</a
              ></span
            >
          </label>
        </div>
        <div class="form__item">
          <!--<input class="form__button button" type="submit" value="Отправить">-->
          <div v-if="data.class === 'transaction'">
            <input
              type="submit"
              class="form__button button"
              @click.prevent="sendForm"
              :value="$tc('main.utility.send')"
            />
          </div>
          <div v-else>
            <input
              type="submit"
              class="form__button button"
              @click.prevent=""
              :value="$tc('main.utility.send')"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import MaskedInput from "vue-masked-input";
import Paysera from "paysera-nodejs";

export default {
  props: ["data"],
  components: {
    MaskedInput,
  },
  computed: {
    orderData() {
      return this.$store.state.formData;
    },
    currentCar() {
      return this.$store.state.current;
    },
    paymentType() {
      return this.$store.state.paymentType;
    },
    price() {
      return this.$store.state.current.price;
    },
  },
  data() {
    return {
      fields: [
        {
          name: "",
          phone: "",
        },
      ],
      formData: null,
      formArray: [],
      error: false,
      comment: "",
      name: "",
      phone: "",
      email: "",
      coords: null,
      languages: [
        {
          lang: 'ru',
          iso: "RUR"
        },
        {
          lang: 'en',
          iso: "ENG",
        },
        {
          lang: 'de',
          iso: "DEU"
        }
      ]
    };
  },
  methods: {
    validation() {
      let form = this.$refs.form,
        inputs = form.querySelectorAll(".js-required");

      this.error = false;

      for (let i = 0; i < inputs.length; i++) {
        inputs[i].parentNode.classList.toggle(
          "error",
          inputs[i].value.length < 2
        );
        this.error = this.error ? true : inputs[i].value.length < 2;
      }
    },
    inputActive(ev) {
      let form = this.$refs.form,
        inputs = form.querySelectorAll(".js-required");

      for (let i = 0; i < inputs.length; i++) {
        inputs[i].parentNode.classList.remove("error");
      }
    },
    clone(index) {
      this.fields.push({
        name: "",
        phone: "",
      });
    },
    remove(index) {
      this.fields.splice(index, 1);
    },
    sendForm() {
      this.validation();

      if (this.error === true) return;
      let formData = new FormData(this.$refs.form),
        dataList = {};
      formData.append("price", this.currentCar.price);

      formData.forEach((value, key) => {
        dataList[key] = value;
      });

      this.formData = dataList;
      this.formArray.push(this.formData, this.orderData);

      console.log(this.formArray);
      console.log(this.formData);
      console.log(this.$store.state.coordinates)

      this.sendToIvcardo();
    },
    getPayseraLink(id,order) {
      let  currency = this.$store.state.current.сurrency;
      if (!currency) currency="RUB";
      const order_r = encodeURIComponent(JSON.stringify(order))
      const lang_iso = this.languages.filter((e)=> e.lang === this.$i18n.locale)
      let options = {
          projectid: "157878",
          sign_password: "3806734b256c27e41ec2c6bffa26d9e7",
          accepturl: process.env.baseUrl+"/success",
          cancelurl: process.env.baseUrl+"?pay=cancel&order="+id,
          callbackurl: process.env.baseUrl+"/api/updateBooking?paysera=1&orderdata="+order_r,
          test: 0,
        },
      paysera = new Paysera(options),
      params = {
        orderid: id,
        amount: order.pPrice * 100,
        currency: currency,
        payment: "card",
        lang: lang_iso.iso
      };

      return paysera.buildRequestUrl(params);
    },
    getOrderNum() {
      return Math.floor(Math.random() * Math.floor(100000));
    },
    sendToIvcardo() {
      let journey = 1;
      var price = Math.max(this.price, this.price*this.$store.state.distance);
      //var price = this.price*this.$store.state.distance/100;
      price = Math.round(price);
      if (this.formArray[1].return_route=="on") journey=2;
      let extras = "21612;"+this.getExstras(this.$store.state.extras_id.animals,this.orderData.pets)+this.getExstras(this.$store.state.extras_id.kid_seats_3_6,this.orderData.kid_seats_3_6)+this.getExstras(this.$store.state.extras_id.kid_seats_6_12,this.orderData.kid_seats_6_12);
      const coords = this.$store.state.coordinates,
        data = {
          journey: journey,
          pHours: this.orderData.hours,
          pService: this.$store.state.current.service_id,
/*          pDate: this.orderData["day_start]"]+" "+this.orderData.time,*/
          pDate: this.orderData.time,
          pPremise: this.orderData.from,

          pLat: coords.plat,
          pLong: coords.plng,
          dPremise: this.orderData.to,

          dLat: coords.dlat,
          dLong: coords.dlng,
          Passengers: [
            {
              pName: this.name,
              pPhone: this.phone,
              pEmail: this.email
            },
          ],
          NoOfCases: this.orderData.baggage,
          pNotes: this.comment,
          pPrice: this.price,
          pTime: this.orderData.time,
          pPassenger: this.orderData.passangers,
          Extras: extras,
        };
      console.log(data);
      console.log("Sending...")
      this.$store.dispatch("sendBooking", data).then((res) => {
        console.log(res.data);
        if (res.data.Success) {
          console.log("Sending Success")
          localStorage.setItem(res.data.Data,JSON.stringify(data))
          if (this.paymentType === "card") {
            localStorage.setItem(res.data.Data,JSON.stringify(data))
            const link = this.getPayseraLink(res.data.Data, data);
            console.log(link);
            if (link) {
              console.log("Go to PaySera...")
              window.location.href = link;
            }
          }else {
        /*    let info = {
              "Phone": data.Passengers[0].pPhone,
              "Email":  data.Passengers[0].pEmail
            }*/
         this.$axios.get('https://api.coingate.com/v2/rates/merchant/EUR/RUB').then((res)=> {
               let object = {
              "TerminalKey": '1616156141122DEMO',
              "Amount": data.pPrice * res.data * 100,
              "OrderId": data.Extras,
              "Description": "Поездка от " + data.pPremise + ' до ' + data.dPremise,
 /*             "DATA": JSON.stringify(info)*/
            }
            const config = {
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
            this.$axios.post('https://securepay.tinkoff.ru/v2/Init', JSON.stringify(object), config)
              .then((res)=> {
              const link = res.data.PaymentURL
                window.location.href = link
              })
         })
        }
        }
      });
    },
    tinkoff() {
      let terminal = '1616156141122DEMO'
      let pass = 'uwk8z3mj8sm887w4'

      let object = {
        "TerminalKey": terminal,
        "Amount": data.pPrice * EUR,
        "OrderId": data.Extras,
        "Description": "Поездка от" + data.pPremise + ' до ' + data.dPremise,
        "DATA": {
          "Phone": data.Passengers[2],
          "Email":  data.Passengers[0]
        }
      }
      const config = {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    this.$axios.post('https://securepay.tinkoff.ru/new/TxiCTzVQ', object, config)
      .then((res)=> console.log(res.data))
    },
    getExstras (id, count) {
      var result="";
      for (var i=0; i<count; i++) {
        result+=id+";";
      }
      return result;
    }

  },
  mounted () {
    setTimeout(()=>{
      if (this.price <= 0 || !this.$store.getters.checkCoords) {
        this.$router.replace({ path: '/' });
      }
    },0)
  }

};
</script>

<style scoped lang="scss">
.js-slice-row {
  cursor: pointer;
  position: absolute;
  font-size: 14px;
  left: 0;
  bottom: 0;
  color: #eb5757;
  opacity: 0;
  pointer-events: none;
}

.js-add-row {
  color: #2f80ed;
  cursor: pointer;
  position: absolute;
  font-size: 14px;
  right: 0;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
}

.transport-form {
  .submit-row {
    display: none;
  }

  .js-form-row {
    padding-bottom: 30px;
  }

  .form {
    &__row {
      margin-bottom: 40px;
    }
  }

  .js-slice-row {
    opacity: 1;
    pointer-events: all;
  }
  .js-form-row {
    &:first-child {
      .js-slice-row {
        opacity: 0;
        pointer-events: none;
      }
    }

    &:nth-last-child(3) {
      .js-add-row {
        opacity: 1;
        pointer-events: all;
      }
    }
  }
}

.car-form {
  .submit-row {
    display: flex;
  }
}

.form {
  &__button {
    height: 60px;
    text-align: center;
  }

  &__input {
    -webkit-appearance: none;
    -webkit-box-shadow: 0 0 0 1px #d8d8e6;
    box-shadow: inset 0 0 0 1px #cecece;
    position: relative;
    transition: box-shadow 150ms;
    height: 56px;
    font-size: 16px;
    padding: 5px 16px;

    &:focus {
      -webkit-appearance: none;
      -webkit-box-shadow: 0 0 0 2px #2f80ed;
      box-shadow: 0 0 0 2px #2f80ed;
      z-index: 1;
    }
  }

  &__row {
    display: flex;
    margin-bottom: 20px;
    position: relative;
  }

  &__item {
    width: 50%;
    position: relative;

    &.error {
      .form__input {
        box-shadow: 0 0 0 2px #eb5757;
        z-index: 3;

        &::-webkit-input-placeholder {
          color: #eb5757;
        }
        &::-ms-input-placeholder {
          color: #eb5757;
        }

        &::placeholder {
          color: #eb5757;
        }
      }
    }

    &:first-child {
      .form__input {
        border-radius: 5px 0 0 5px;
      }
    }

    & + & {
      //margin-left: -1px;

      .form__input {
        border-radius: 0 5px 5px 0;
      }
    }

    &--wide {
      width: 100%;

      .form__input:first-child {
        border-radius: 5px;
      }
    }
  }

  &__item-label {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: -10px;
    left: 0;
    transform: translate3d(0, -50%, 0);
    transition: all 150ms;
    font-size: 14px;
    color: #7d7d7d;
    font-weight: normal;
  }

  .form__input:focus + .form__item-label,
  .form__input:not(:placeholder-shown) + .form__item-label {
    opacity: 1;
    transform: translate3d(0, -100%, 0);
  }
}

.form {
  .policy__label {
    align-items: center;
  }

  &__item + &__item {
    margin-left: -1px;
  }
}

.safari {
  .form__input {
    -webkit-appearance: none;
    -webkit-box-shadow: 0 0 0 2px #d8d8e6;
    box-shadow: inset 0 0 0 2px #d8d8e6;
  }
}

.input-middle {
  border-radius: 0 !important;
}
/* @media screen and (min-color-index:0) and(-webkit-min-device-pixel-ratio:0) {
         .form__input{

           -webkit-appearance: none;
           -webkit-box-shadow: 0 0 0 2px #D8D8E6;
           box-shadow: inset 0 0 0 2px #cecece;

         }
   }
   @media not all and (min-resolution:.001dpcm){
     .form__input{

       -webkit-appearance: none;
       -webkit-box-shadow: 0 0 0 2px #D8D8E6;
       box-shadow: inset 0 0 0 2px #cecece;

     }
   }*/

/* Safari 10.1+ */

@media all and (max-width: 1024px) {
  .policy {
    font-size: 12px;
  }

  .form {
    &__input {
      height: 46px;
      font-size: 14px;
      padding: 5px 12px;
    }

    &__button {
      height: 50px;
      line-height: 50px;
    }

    &__item-label {
      display: none;
    }
  }
}

@media all and (max-width: 767px) {
  .form__item + .form__item .form__input {
    border-radius: 5px;
  }
  .form {
    &__sub-button {
      font-size: 12px;
    }

    &__input {
      height: 40px;
      border-radius: 5px;
    }

    &__row {
      flex-wrap: wrap;
    }

    &__item {
      width: 100%;

      & + & {
        margin-top: 20px;
      }

      &:first-child,
      &:last-child {
        .form__input {
          border-radius: 5px;
        }
      }
    }
  }

  .policy {
    font-size: 10px;
    padding-bottom: 10px;
  }
}
</style>
