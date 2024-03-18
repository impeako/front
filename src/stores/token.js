import { defineStore} from "pinia";

export const useTokenStore = defineStore("token",{
    state: () => {
        return {
          token : null,
          role : null,
        }
      },
    actions: {
      setToken(token) {
        this.token = token;
      },
      getToken() {
        return this.token;
      },
      clearToken() {
        this.token = null;
      },
      setRole(role) {
        this.role = role;
      },
      getRole() {
        return this.role;
      },
      clearRole() {
        this.role = null;
      },
    },
    getters: {

    },
});