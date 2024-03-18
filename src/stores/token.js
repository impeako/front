import { defineStore} from "pinia";

export const useTokenStore = defineStore("token",{
    state: () => {
        return {
          isAuthenticated: false,
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
        this.role = null;
        this.isAuthenticated = false;
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
      authenticate(){
        this.isAuthenticated = true;
      },
      initializeAuth() {
        const token = localStorage.getItem('authToken');
        const role = localStorage.getItem('userRole');
        if (token) {
          this.isAuthenticated = true;
          this.token = token;
          this.role = role;
        }
      }
    },
    getters: {
    },
});