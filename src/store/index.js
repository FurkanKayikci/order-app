import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  materials: [],
  customers: [],
  orders: [],
};

const getters = {};

const mutations = {
  setMaterials(state, payload) {
    state.materials = payload;
  },
  setCustomers(state, payload) {
    state.customers = payload;
  },
  setOrders(state, payload) {
    state.orders = payload;
  },
  addCustomers(state, payload) {
    state.customers.push(payload);
  },
  addState(state, params) {
    if (params.dataType == "materials") state.materials.push(params.newData);
    if (params.dataType == "customers") state.customers.push(params.newData);
    if (params.dataType == "orders") state.orders.push(params.newData);
  },
};

const actions = {
  fetchTableDatas(_, dataType) {
    return axios.get(
      "https://order-app-1a22e-default-rtdb.firebaseio.com/" +
        dataType +
        ".json"
    );
  },
  pushTableDatas(_, dataToAdd) {
    return axios.post(
      "https://order-app-1a22e-default-rtdb.firebaseio.com/" +
        dataToAdd.dataType +
        ".json",
      dataToAdd.newData
    );
  },
  editTableDatas(_, dataToAdd) {
    return axios.put(
      "https://order-app-1a22e-default-rtdb.firebaseio.com/" +
        dataToAdd.dataType +
        "/" +
        dataToAdd.newData.keyId +
        ".json",
      dataToAdd.newData
    );
  },
  getStateLength(_, dataType) {
    if (dataType === "customers") return state.customers.length;
    if (dataType === "materials") return state.materials.length;
    if (dataType === "orders") return state.orders.length;
  },
};

const modules = {};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
});
