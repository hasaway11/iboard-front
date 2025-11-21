import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../utils/constant";

const useAuthStore = create((set)=>{
  return {
    username: undefined,
    role: undefined,

    fetchAndStoreAuth:function() {
      axios.get(baseURL + '/auth/check').then(res=>{
        set({username:res.data.username, role:res.data.role});
      }).catch(err=>{
        if(err.status!==409)
          console.log(err);
        set({username:null, role:null});
      })
    },

    setLogin: ({username, role}) => set({username, role}),

    setLogout: () => set({username:null, role:null})
  }
});

export default useAuthStore;