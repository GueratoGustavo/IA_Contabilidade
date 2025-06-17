<template>
  <div id="app">
    <h1>🚀 Agente Financeiro</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">Sobre</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav {
  margin: 1em 0;
}
nav a {
  text-decoration: none;
  color: #42b983;
  margin: 0 10px;
}
nav a.router-link-exact-active {
  font-weight: bold;
}
</style>
