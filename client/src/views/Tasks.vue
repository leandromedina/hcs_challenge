<template>
  <div class="tasks">
    <h1>Tasks</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <div class="task" v-bind:class="{'completed':task.completed}">
          <label>
            <input
              type="checkbox"
              v-on:change="toggleCompleted(task)"
              v-bind:checked="task.completed"
            />
            {{task.title}} | due: {{task.due_date}}
          </label>
          <button v-on:click="deleteTask(task.id)" class="delete">x</button>
        </div>
      </li>
      <li class="newTask">
        <input
          type="text"
          name="title"
          v-model="newTask.title"
          placeholder="Task Title"
          v-on:keyup.enter="addTask()"
        />
        <input
          type="date"
          name="due_date"
          v-model="newTask.due_date"
          placeholder="yyyy-mm-dd"
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
          v-on:keyup.enter="addTask()"
        />
        <button v-on:click="addTask()" class="add">+</button>
      </li>
    </ul>
  </div>
</template>

<script>
const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
  .toISOString()
  .substring(0, 10);

export default {
  name: "tasks",
  data() {
    return {
      newTask: {
        title: "",
        due_date: tomorrow,
        completed: false
      },
      tasks: [],
      errors: ""
    };
  },
  methods: {
    addTask() {
      if (this.newTask.title && this.newTask.due_date) {
        this.$http
          .post("http://localhost:3000/api/tasks", this.newTask, {
            headers: { "content-type": "application/json" }
          })
          .then(
            result => {
              this.tasks = [...this.tasks, result.data];
            },
            error => {
              this.errors = "* An unexpected error ocurred *";
              console.error(error);
            }
          );
      } else {
        this.errors = "* A Title and a Date are needed *";
      }
    },
    toggleCompleted(task) {
      const modifiedTask = { ...task, completed: !task.completed };
      this.$http
        .put(`http://localhost:3000/api/tasks/${task.id}`, modifiedTask, {
          headers: { "content-type": "application/json" }
        })
        .then(
          result => {
            console.log("toggleCompleted result:", result);

            this.tasks = [
              ...this.tasks.filter(t => t.id != modifiedTask.id),
              modifiedTask
            ];
          },
          error => {
            this.errors = "* An unexpected error ocurred *";
            console.error(error);
          }
        );
    },
    deleteTask(id) {
      this.$http.delete(`http://localhost:3000/api/tasks/${id}`).then(
        result => {
          console.log("deleteTask result:", result);

          this.tasks = this.tasks.filter(t => t.id != id);
        },
        error => {
          this.errors = "* An unexpected error ocurred *";
          console.error(error);
        }
      );
    }
  },
  mounted() {
    this.$http.get("http://localhost:3000/api/tasks").then(
      result => {
        this.tasks = result.data;
      },
      error => {
        this.errors = "* An unexpected error ocurred *";
        console.error(error);
      }
    );
  }
};
</script>
