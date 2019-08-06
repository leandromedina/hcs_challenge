<template>
  <div id="login">
    <h1>Task Manager Login</h1>
    <input
      type="text"
      name="username"
      v-model="user.username"
      placeholder="Username"
      v-on:keyup.enter="login()"
    />
    <input
      type="password"
      name="password"
      v-model="user.password"
      placeholder="Password"
      v-on:keyup.enter="login()"
    />
    <button type="button" v-on:click="login()">Login</button>
    <span class="errors" v-if="errors">{{ this.errors }}</span>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      errors: ""
    };
  },
  methods: {
    login() {
      this.errors = "";
      if (this.user.username != "" && this.user.password != "") {
        this.$http
          .post("http://localhost:3000/api/login", this.user, {
            headers: { "content-type": "application/json" }
          })
          .then(
            result => {
              if (result.data) {
                this.$emit("authenticated", result.data);
                this.$router.replace({ name: "tasks" });
              } else {
                this.errors =
                  "* The username / password combination is not valid *";
              }
            },
            error => {
              this.errors = "* An unexpected error ocurred *";
              console.error(error);
            }
          );
      } else {
        this.errors = "* A username and password must be provided *";
      }
    }
  }
};
</script>

<style scoped>
#login {
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #cccccc;
  height: 150px;
  margin: auto;
  padding: 20px;
  width: 500px;
}
h1 {
  padding: 0;
  margin-top: 0;
}
input {
  margin: 5px;
}
.errors {
  color: #f55;
  font-size: 12px;
  display: block;
}
</style>
