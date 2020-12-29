import axios from "axios"

const path = "fake_offices.json"

export default {
  state: {
    alarmedoffices: [],
    notalarmedoffices: [],
    gMapsApiKey: ""
  },
  getters: {
    getGMapsApiKey: state => state.gMapsApiKey,
    allAlarmList: state => {
      const allAlarms = [...state.notalarmedoffices, ...state.alarmedoffices]
      return allAlarms.filter(latitude => latitude.latitude != null);
    },
    allAlarm: state => {
      let alarm = state.alarmedoffices.filter(latitude => latitude.latitude != null)
      console.log(alarm)

      return alarm.sort((a, b) => (a.priority_id > b.priority_id ? 1 : -1)).reverse()
    },
  },
  mutations: {
    setAlarmsList(state, payload) {
      state.alarmedoffices = payload.alarmedoffices;
      state.notalarmedoffices = payload.notalarmedoffices;
      state.gMapsApiKey = payload.gmapsapikey[0].value;
    },
  },
  actions: {
    getAllAlarms({commit}) {
      axios.get(path).then((res) => {
        commit("setAlarmsList", res.data)
      });
    }
  },
}