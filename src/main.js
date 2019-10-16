import Vue from 'vue'
import firebase from 'firebase';
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import i18n from './i18n'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)
Vue.config.productionTip = false

let app = '';
// const config = {
//   apiKey: "",
//   authDomain: "flimse-json-db.firebaseapp.com",
//   databaseURL: "https://flimse-json-db.firebaseio.com",
//   projectId: "flimse-json-db",
//   storageBucket: "flimse-json-db.appspot.com",
//   messagingSenderId: "794788708493"
// };

// firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      i18n,
      render: h => h(App)
    }).$mount('#app');
  }
});
