<template>
  <div class="prebooking__field text-field">
    <input class="prebooking__input" type="text" :name="data.name" :placeholder="data.placeholder"
           autocomplete="off"
           ref="acInput" @input="initService" v-click-outside="blur">
    <div class="prebooking__error">{{data.errorMsg}}</div>
    <div class="dropdown dropdown-cities">
      <div v-bar>
        <ul class="points-list">
          <li :data-addr="JSON.stringify(item.location)" v-for="(item, i) in results" :key="i"
              @mouseenter="placeHover(item)" @click="insertValue(item)">
            {{item.description}}
          </li>
        </ul>
      </div>
      <div class="map" ref="mapRef"></div>
    </div>
  </div>
</template>


<script>
	import calendar from '~/components/partials/calendar.vue'

	export default {
		props: ['data'],
		components: {
			calendar
		},
		computed: {
			points() {
				return this.$store.getters.getPoints;
			},
			distance() {
				return this.$store.getters.getDistance;
			},
      fieldType(){
				return this.data.name === 'from' ? 'p' : 'd'
      }
		},

		data() {
			return {
				value: '',
				results: [],
				map: {},
				cityList: false,
				state: {
					date: new Date(),
					language: 'ru',
				},
				loadingTimer: null,
			}
		},
		watch: {
			value: function (oldVal, newVal) {
				if (newVal === '') {
					this.cityList = false;
				}
			},
			distance: function (old, newval) {
			},
		},

		mounted() {
			this.map = new google.maps.Map(
				this.$refs.mapRef, {
					center: {lat: -33.866, lng: 151.196},
					zoom: 15,
					mapTypeControl: false,
					disableDefaultUI: true,
          language: this.$i18n.locale,

				});

			let input = this.$refs.acInput;

			if (this.$store.state.points.to && this.$store.state.points.from && this.$store.getters.checkCoords) {
				input.value = (input.name === 'to') ? (this.$store.state.points.to.description || '') : (this.$store.state.points.from.description || '');
			}

			if (localStorage.getItem('formData')) {
				let formData = JSON.parse(localStorage.getItem('formData'));
				this.$store.commit('setData', formData);
      }
		},
		methods: {

			displaySuggestions(predictions, status) {
				if (!predictions) return;

				let placeService = new google.maps.places.PlacesService(this.map),
					country = '',
					countryItem = '';


				if (status != google.maps.places.PlacesServiceStatus.OK) {
					return;
				}

				predictions.forEach(prediction => {

					let request = {
						placeId: prediction.place_id,
						id: prediction.id,
					};

					// Определяем координаты, записываем в объект
					placeService.getDetails(request, (place, status) => {
						if (status == google.maps.places.PlacesServiceStatus.OK) {

							let arr = place.adr_address.split(', ');

							arr.forEach((item) => {
								if (item.includes('country-name')) {
									countryItem = item;
								}
							});

							country = countryItem.substring(countryItem.indexOf('>') + 1, countryItem.lastIndexOf('</span'));
							this.$store.commit('setCountry', country);

							let lat = place.geometry.location.lat(),
								lng = place.geometry.location.lng();

							prediction['location'] = {lat, lng}
						}
					})
				});
				if (predictions) this.$refs.acInput.closest('.prebooking__field').classList.add('active');
				this.results = predictions;
			},
			initService() {
				let
					service = new google.maps.places.AutocompleteService(),
					myInput = this.$refs.acInput.value,
					parent = this.$refs.acInput.closest('.prebooking__field');

				parent.classList.remove('error')
				parent.classList.remove('distance-error')
				clearTimeout(this.loadingTimer);

				this.loadingTimer = setTimeout(() => {
					if (myInput.length < 3) {
						this.$el.classList.remove('active');
						return;

					}
					// Поиск мест
					service.getQueryPredictions({
						input: myInput,
						componentRestrictions: {country: 'ru'},
					}, this.displaySuggestions);


				}, 500);

			},

			placeHover(item) {

				let marker = new google.maps.Marker({
					map: this.map,
					position: item.location,
					icon: '/img/marker.svg'
				});

				this.map.setCenter(item.location)
			},
			async insertValue(item) {
				console.log(item.location)
				let
					wrap = this.$el, // главный dom-элемент
					input = wrap.querySelector('.prebooking__input'),
					inputName = input.name;

          this.$store.commit('setCoordinates', {c: item.location.lat, type: this.fieldType + 'lat'})
          this.$store.commit('setCoordinates', {c: item.location.lng, type: this.fieldType + 'lng'})


				input.value = item.description;   // Передаем значение в инпут
				this.$store.commit(`${inputName}PointUpdate`, item);   // Передаем данные выбранных точек в $store
				wrap.classList.remove('active');  // Закрываем окно выборки адресов
			},
			blur() {
				setTimeout(() => {
					this.$el.classList.remove('active')
				}, 100)
			}
		},

	}
</script>


<style lang="scss" scoped>

  .error {

    .prebooking {

      &__error {
        opacity: 1;
      }

      &__input {
        box-shadow: 0 0 0 2px #FF3495;
        z-index: 3;
      }
    }

  }

  .distance-error {

    .prebooking {

      &__distance-error {
        opacity: 1;
      }

      &__input {
        box-shadow: 0 0 0 2px #FF3495;
        z-index: 3;
      }
    }
  }

  .dropdown-cities {
    position: absolute;
    top: calc(100% - 4px);
    left: 0;
    display: flex;
    width: 682px;
    height: 216px;
    max-width: none;
    box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.4);
    z-index: 1;
    padding: 0;
    opacity: 0;
    pointer-events: none;
    padding-bottom: 15px;
    padding-top: 12px;

    .map {
      width: 189px;
      height: 189px;
      background: #cecece;
      margin-right: 15px;
      margin-left: 15px;

      flex: 0 0 auto;
    }
  }

  @media (max-width: 1024px) {
    .dropdown-cities {
      top: calc(100% - 4px);
    }

    .text-field {

      &:nth-child(2).active {

        .dropdown-cities {
          left: -100%;
        }
      }
    }
  }

  @media (max-width: 667px) {
    .dropdown-cities {
      flex-direction: column;
      width: 100%;
      height: auto;
      padding-bottom: 0;
      overflow: hidden;

      .map {
        width: 100%;
        margin-top: 20px;
        margin: 20px 0 0 0;
      }
    }

    .points-list {
      max-height: 210px;
    }

    .text-field:nth-child(2).active .dropdown-cities {
      left: 0;
    }
  }

</style>
