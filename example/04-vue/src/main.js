/*
 * @Description: 
 * @Author: linjy
 * @Date: 2019-08-08 22:56:27
 * @LastEditTime: 2019-08-09 17:30:11
 * @LastEditors: linjy
 */
import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import router from "./router";
import storeConfig from "./storeConfig";

Vue.use(Vuex);

Vue.config.productionTip = false;
const store = new Vuex.Store(storeConfig);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
