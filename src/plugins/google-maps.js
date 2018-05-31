import * as VueGoogleMaps from 'vue2-google-maps'

export default ({ Vue }) => {
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAgWVpn5DtoUMftgXPYhVG6U7PcTfJOy2g',
      libraries: 'places'
    }
  })
}
