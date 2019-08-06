<template>
  <div id="login">
    <h1>Task Manager Login</h1>
    <input type="text" name="username" v-model="user.username" placeholder="Username" />
    <input type="password" name="password" v-model="user.password" placeholder="Password" />
    <button type="button" v-on:click="login()">Login</button>
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
      }
    };
  },
  methods: {
    login() {
      if (this.user.username != "" && this.user.password != "") {
        this.$http
          .post("http://localhost:3000/api/login", this.user, {
            headers: { "content-type": "application/json" }
          })
          .then(
            result => {
              console.log("result.data:", result.data);
              if (result.data) {
                this.$emit("authenticated", result.data);
                this.$router.replace({ name: "secure" });
              } else {
                console.log("The username and / or password is incorrect");
              }
            },
            error => {
              console.error(error);
            }
          );
      } else {
        console.log("A username and password must be provided");
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
</style>
