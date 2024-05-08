import { defineStore} from "pinia";

export const useTokenStore = defineStore("token",{
    state: () => {
        return {
          isAuthenticated: false,
          token : null,
          role : null,
          refreshToken: null,
        }
      },
    actions: {
      setToken(token) {
        this.token = token;
      },
      getToken() {
        return this.token;
      },
      setrefreshToken(token) {
        this.token = token;
      },
      getrefreshToken() {
        return this.token;
      },
      clearToken() {
        this.token = null;
        this.role = null;
        this.isAuthenticated = false;
        this.refreshToken = null;
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
        const refreshToken = localStorage.getItem('refreshToken')
        if (token) {
          this.isAuthenticated = true;
          this.token = token;
          this.role = role;
          this.refreshToken = refreshToken;
        }
      }
    },
    getters: {
    },
});