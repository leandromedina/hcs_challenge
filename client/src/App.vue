<template>
  <div id="app">
    <nav v-if="authenticated">
      <h2>Task Manager VueJS App</h2>
      <div
        class="menu-toggle"
        v-on:click="toggleMenu"
        v-bind:class="{opem: menu_open}"
      >Hello {{ user.name }}</div>
      <div class="menu" v-bind:class="{open: menu_open}">
        <router-link to="/tasks">Tasks</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/login" v-on:click.native="logout()">Logout</router-link>
      </div>
    </nav>
    <main>
      <router-view @authenticated="setAuthenticated" />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      authenticated: false,
      user: {},
      menu_open: false,
      mockAccount: {
        username: "test",
        password: "test"
      }
    };
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    setAuthenticated(user) {
      if (user) {
        this.authenticated = true;
        this.user = user;
      }
    },
    toggleMenu() {
      this.menu_open = !this.menu_open;
    },
    logout() {
      this.authenticated = false;
      this.user = {};
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
}

#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
}

nav {
  align-items: center;
  background: #2c3e50;
  color: #f0f0f0;
  display: flex;
  height: 50px;
  justify-content: space-between;
  left: 0;
  padding: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100vw;
  z-index: 100;
}
nav h2 {
  padding-left: 15px;
}

main {
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
}

.menu-toggle {
  align-items: center;
  background: #2c3e50;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: space-between;
  min-width: 100px;
  z-index: 10;
}
.open.menu-toggle::after {
  border-bottom: 5px solid #f0f0f0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 0;
}
.menu-toggle::after {
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #f0f0f0;
  content: "";
  height: 0;
  margin: 10px;
  width: 0;
}
.menu {
  background: #2c3e50;
  display: flex;
  flex-flow: column nowrap;
  position: fixed;
  right: 0;
  top: -150px;
  transition: top 0.5s ease-in-out;
  width: 150px;
}
.menu.open {
  top: 50px;
}
.menu a {
  background: #2c3e50;
  color: #f0f0f0;
  height: 30px;
  line-height: 30px;
  text-decoration: none;
  width: 100%;
}
.menu a:hover {
  text-decoration: underline;
}
</style>
