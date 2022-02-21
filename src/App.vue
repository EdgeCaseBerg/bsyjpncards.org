<template>
  <div id="nav">
    <router-link to="/">Study</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/何">何</router-link>
  </div>
  <router-view/>
</template>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
}
</style>
