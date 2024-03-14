<template>
  <nav>
    <router-link to="/employee"> employee </router-link> -
    <router-link to="/"> login </router-link>
  </nav>
  <RouterView />
</template>

<style>
#app {
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  padding: 0;
  background-color: rgb(246, 245, 245);
  height: 100vh;
}
</style>
