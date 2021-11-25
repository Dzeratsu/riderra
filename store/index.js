import Vuex from "vuex";
import axios from "axios";
import querystring from "querystring";
const createStore = () => {
  return new Vuex.Store({
    actions: {
      async sendBooking({ commit, state }, data) {
        var query = "?data=" + encodeURIComponent(JSON.stringify(data));
        return await axios.get("/api/createBooking" + query);
      },
      async updateBooking (context, data) {
        var query = "?data=" + encodeURIComponent(JSON.stringify(data));
        return await axios.get("/api/updateBooking" + query);
      },
      async cancelBooking (context, data) {
        var query = "?data=" + encodeURIComponent(JSON.stringify(data));
        return await axios.get("/api/cancelBooking" + query);
      },
      decodePaysera (context, query) {
        var encodedData = query.replace('_', '/').replace('-', '+');
        var decoded = new Buffer(encodedData, 'base64').toString('ascii');
        return querystring.parse(decoded);
      },

      async pricesIvcardo (context) {

        let data = {
          CompanyGUID: "",
          CustomerGUID: "",
          Journey:"One Way",
          BlockHours: "0",
          Pickup: {
            Country: "",
            Lat: context.state.coordinates.plat,
            Long: context.state.coordinates.plng
          },
          Dropoff: {
            Country: "",
            Lat: context.state.coordinates.dlat,
            Long: context.state.coordinates.dlng
          },
          IsOpenDest: "0"
        }
        var query = "?data="+encodeURIComponent(JSON.stringify(data));
        context.commit("setPriceLoading", 1);
        context.commit("setErrorMessage","")
        let prices = await axios.get("/api/GetServiceTypesWithPrice"+query);
        if (prices.data.Success) {
          context.commit("setPrices", prices.data);
          context.commit("setPriceLoading", 2);
          if (!context.getters.checkRoutes) {
            context.commit("setPriceLoading", 0);
            context.commit("setErrorMessage","main.utility.error.booking.no_cars_avaliable")
          }
          return context.state.ivcardoPrices;
        }
        else {
          context.commit("setErrorMessage","main.utility.error.booking.no_cars_avaliable")
          context.commit("setPriceLoading", 0);
          console.log("Не удалось получить цены");
          return false;
        }
      },
      priceAction (context) {
        let prices_car = context.getters.getPrices;
        console.log(prices_car)
        if (prices_car.length>0) {
          context.commit("setCarPrice", prices_car)
        }
        else console.log("Доступные маршруты не найдены")
      }
    },
    state: {
      priceLoaded: false,
      priceLoading: false,
      isLoaded: false,
      errorMessage:"",
      media: "",
      popup: false,
      menu: false,
      country: "",
      time: "",
      ivcardoPrices: null,
      extras_id: {
        animals: "21615",
        kid_seats_3_6: "21616",
        kid_seats_6_12: "21617"
      },
      current: {
        name: "econom",
        service_id: "ec3720a1-404a-4df8-9ea3-5867faef9d17",
        src: "/img/cars/economy.png",
        color: "#E5006D",
        subColor: "#C01984",
        title: "main.autopark.econom.title",
        desc: "main.autopark.econom.subtitle",
        price: 5000,
        models: "main.autopark.econom.models"
      },
      distance: "",
      tarifs: {
        economy: {
          Россия: 1,
          Белоруссия: 1,
          Украина: 1,
          Казахстан: 1,
          Узбекистан: 1,
          Таджикистан: 1,
          Киргизия: 1,
          Хельсинки: 2,
          Стокгольм: 2,
          Рига: 2,
          Таллин: 2,
          Вильнюс: 2
        },
        business: {
          Россия: 2,
          Белоруссия: 2,
          Украина: 2,
          Казахстан: 2,
          Узбекистан: 2,
          Таджикистан: 2,
          Киргизия: 2,
          Хельсинки: 4,
          Стокгольм: 4,
          Рига: 4,
          Таллин: 4,
          Вильнюс: 4
        },
        luxury: {
          Россия: 2,
          Белоруссия: 2,
          Украина: 2,
          Казахстан: 2,
          Узбекистан: 2,
          Таджикистан: 2,
          Киргизия: 2,
          Хельсинки: 4,
          Стокгольм: 4,
          Рига: 4,
          Таллин: 4,
          Вильнюс: 4
        }
      },
      cars: [
        {
          name: "econom",
          service_id: "ec3720a1-404a-4df8-9ea3-5867faef9d17",
          src: "/img/cars/economy.png",
          color: "#E5006D",
          subColor: "#C01984",
          title: "main.autopark.econom.title",
          desc: "main.autopark.econom.subtitle",
          price: 600,
          models: "main.autopark.econom.models",
          largetext: "main.autopark.econom.largetext"
        },
        {
          name: "comfort",
          service_id: "2f810700-c9a2-4518-af4b-9fc8378b4ccd",
          src: "/img/cars/comfort.png",
          color: "#C80D7D",
          subColor: "#C01984",
          title: "main.autopark.comfort.title",
          desc: "main.autopark.comfort.subtitle",
          price: 900,
          models: "main.autopark.comfort.models",
          largetext: "main.autopark.comfort.largetext"
        },
        {
          name: "business",
          service_id: "3ff00a6d-58fe-476b-887e-e9379e60d613",
          src: "/img/cars/business.png",
          color: "#702283",
          subColor: "#C01984",
          title: "main.autopark.business.title",
          desc: "main.autopark.business.subtitle",
          models: "main.autopark.business.models",
          price: 1200,
          largetext: "main.autopark.business.largetext"
        },
        {
          name: "firstclass",
          service_id: "0201b9fe-39ac-4908-8891-2ed15a131f17",
          src: "/img/cars/firstclass.png",
          color: "#702283",
          subColor: "#C01984",
          price: 2500,
          title: "main.autopark.firstclass.title",
          desc: "main.autopark.firstclass.subtitle",
          models: "main.autopark.firstclass.models",
          largetext: "main.autopark.firstclass.largetext"
        },
        {
          name: "minivan",
          service_id: "84cfd798-2652-476e-930d-5277a760de85",
          src: "/img/cars/minivan.png",
          color: "#702283",
          subColor: "#C01984",
          price: 1200,
          title: "main.autopark.minivan.title",
          desc: "main.autopark.minivan.subtitle",
          models: "main.autopark.minivan.models",
          largetext: "main.autopark.minivan.largetext"
        },
        {
          name: "businesvan",
          service_id: "65904df3-cde5-4a9d-9aed-57a05d53726e",
          src: "/img/cars/businessvan.png",
          color: "#702283",
          subColor: "#C01984",
          price: 1500,

          title: "main.autopark.businesvan.title",
          desc: "main.autopark.businesvan.subtitle",
          models: "main.autopark.businesvan.models",
          largetext: "main.autopark.businesvan.largetext"
        },
        {
          name: "minibus",
          service_id: "cbca65f8-ac67-468b-94b1-9b4e804a14b0",
          src: "/img/cars/minibus.png",
          color: "#702283",
          subColor: "#C01984",
          price: 2500,

          title: "main.autopark.minibus.title",
          desc: "main.autopark.minibus.subtitle",
          models: "main.autopark.minibus.models",
          largetext: "main.autopark.minibus.largetext"
        },
        {
          name: "bus",
          service_id: "d74610f9-a44e-45e1-9f85-4f9169faafef",
          src: "/img/cars/bus.png",
          color: "#702283",
          subColor: "#C01984",
          price: 4000,

          title: "main.autopark.bus.title",
          desc: "main.autopark.bus.subtitle",
          models: "main.autopark.bus.models",
          largetext: "main.autopark.bus.largetext"
        }
      ],
      journey: true,
      hours: false,
      points: {
        from: null,
        to: null
      },
      formData: null,
      paymentType: "cash",
      coordinates: {
        plat: "",
        plng: "",
        dlat: "",
        dlng: ""
      }
    },
    getters: {
      getMenu: state => {
        return state.menu;
      },
      getPoints: state => {
        return state.points;
      },
      getTime: state => {
        return state.time;
      },
      getCurrentCar: state => {
        return state.current;
      },
      getDistance: state => {
        return state.distance;
      },
      getPaymentType: state => {
        return state.paymentType;
      },
      getLoaded: state => {
        return state.isLoaded;
      },
      getPrices: state => {
        let prices = [];
        state.ivcardoPrices.Data.forEach((item)=>{
          if (item.Price.Account.Total>0) {
            prices.push({price:item.Price.Account.Total, car:item.Vehicle.DemandPartnerRef, сurrency:item.Price.Account.Currency})
          }
        })
        return prices;
      },
      checkCoords: state => {
        if (state.coordinates.plat=="" || state.coordinates.plng=="" || state.coordinates.dlat=="" || state.coordinates.dlng=="") {
          return false;
        }
        return true;
      },
      checkRoutes: (state, getters) => {
        return (state.priceLoaded && getters.getPrices.length>0);
      },

      getActiveTarifs (state, getters) {
        let tarifs=[];
        let p = getters.getPrices;
        p.forEach((p_item)=>{
          let res = state.cars.filter((car) =>{
            return car.service_id == p_item.car
          })
          tarifs.push(res[0])
        })
        return tarifs
      }

    },
    mutations: {
      setQuery(state, payload) {
        state.media = payload;
      },
      setTime(state, payload) {
        state.time = payload;
      },
      toggleMenu(state, payload) {
        state.menu = payload;
      },
      fromPointUpdate(state, payload) {
        state.points.from = payload;
      },
      toPointUpdate(state, payload) {
        state.points.to = payload;
      },
      currentCarObj(state, payload){
        state.current = payload;
      },
      currentCar(state, payload) {
        state.current = state.cars[payload];
      },
      sliderChangeCar(state, payload) {
        state.current = state.cars[payload];
      },
      showPopup(state, payload) {
        state.popup = payload;
      },
      setCountry(state, payload) {
        state.country = payload;
      },
      setFormData(state, payload) {
        state.formData = payload;
      },
      setDistance(state, payload) {
        state.distance = payload;
      },
      setCar(state, payload) {
        state.current = payload;
      },
      setData(state, payload) {
        state.formData = payload;
      },
      setPaymentType(state, payload) {
        state.paymentType = payload;
      },
      setCoordinates(state, { c, type }) {
        state.coordinates[type] = c;
      },
      setHours(state, payload) {
        state.hours = payload;
      },
      setJourney(state, payload) {
        state.journey = payload;
      },
      setLoaded(state, payload) {
        state.isLoaded = payload;
      },
      setPrices(state, payload) {
        state.ivcardoPrices=payload;
      },
      setCarPrice(state, prices) {
        prices.forEach((item)=>{
          state.cars.filter((car,i)=>{
            if (car.service_id==item.car) {
              state.cars[i].price=item.price;
              if (item.сurrency=="EUR") {
                state.cars[i].сurrency_icon="€"
                state.cars[i].сurrency="EUR"
              }
            }
          })
        })
      },
      setPriceLoading (state, payload) {
        if (payload==0) {
          state.priceLoaded=false;
          state.priceLoading=false;
        }
        else if (payload==1) {
          state.priceLoaded=false;
          state.priceLoading=true;
        }
        else if (payload==2) {
          state.priceLoaded=true;
          state.priceLoading=false;
        }
      },
      setPriceLoaded (state, payload) {
        state.priceLoaded=payload;
      },
      setErrorMessage (state, message) {
        state.errorMessage=message;
      }
    }
  });
};

export default createStore;
