import { create } from "zustand";
import api from "../utils/api";

const useAuthStore = create((set)=>{
  return {
    username: undefined,
    role: undefined,

    fetchAndStoreAuth:function() {
      api.get('/api/auth/check').then(res=>{
        set({username:res.data.username, role:res.data.role});
      }).catch(err=>{
        if(err.status!==409)
          console.log(err);
        set({username:null, role:null});
      })
    },

    setLogin: (username, role) => {
      console.log(username, role);
      set({username, role})
    },

    setLogout: () => set({username:null, role:null})
  }
});

export default useAuthStore;