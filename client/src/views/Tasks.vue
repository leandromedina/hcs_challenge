<template>
  <div class="tasks">
    <h1 class="title">Tasks</h1>
    <ul>
      <li class="empty" v-if="!tasks.length">No tasks here, add one!</li>
      <li
        v-for="task in tasks"
        :key="task.id"
        class="task"
        :class="{ completed: task.completed }"
      >
        <input
          type="checkbox"
          :id="`task-${task._id}`"
          v-on:change="toggleCompleted(task)"
          :checked="task.completed"
        />
        <label :for="`task-${task._id}`"
          >{{ task.title }} | due:
          {{ new Date(task.due_date).toISOString().substring(0, 10) }}</label
        >
        <button v-on:click="deleteTask(task._id)" class="delete">+</button>
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
        <span class="errors" v-if="errors">{{ this.errors }}</span>
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
              console.log("this.tasks:", this.tasks);
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
        .put(`http://localhost:3000/api/tasks/${task._id}`, modifiedTask, {
          headers: { "content-type": "application/json" }
        })
        .then(
          () => {
            this.tasks = [
              ...this.tasks.filter(t => t._id != modifiedTask._id),
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
      if (confirm("Are you sure you want to delete?")) {
        this.$http.delete(`http://localhost:3000/api/tasks/${id}`).then(
          () => {
            this.tasks = this.tasks.filter(t => t._id != id);
          },
          error => {
            this.errors = "* An unexpected error ocurred *";
            console.error(error);
          }
        );
      }
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

<style scoped>
.tasks {
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #cccccc;
  height: auto;
  margin: auto;
  padding: 0;
  width: 400px;
}

.title {
  height: 60px;
  line-height: 60px;
  margin: 0;
  padding: 0;
}

.tasks ul {
  border-top: 1px solid #cccccc;
  list-style: none;
  margin: 0;
  padding: 0;
}

.empty {
  align-items: center;
  display: flex;
  height: 60px;
  justify-content: center;
}

.task {
  align-items: center;
  display: flex;
  height: 40px;
  justify-content: space-between;
  padding: 10px;
}

.task:nth-child(even) {
  background: #f0f0f0;
}

.task.completed label {
  text-decoration: line-through;
}
.task input {
  margin-right: 5px;
}

.task label {
  margin-right: auto;
}

.newTask {
  align-items: center;
  border-top: 1px solid #cccccc;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 0;
  min-height: 60px;
  padding: 10px;
}

input {
  height: 25px;
}

input + input {
  margin: 0 auto;
}

.delete,
.add {
  border-radius: 50%;
  border: 0;
  outline: 0;
  padding: 0;
  width: 25px;
  height: 25px;
  line-height: 25px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  color: #f0f0f0;
  cursor: pointer;
}
.add {
  background: #088;
  padding: 1px 1px 0 0;
}
.delete {
  background: #f55;
  transform: rotate(45deg);
}
.errors {
  color: #f55;
  flex-basis: 100%;
  font-size: 12px;
  margin-top: 5px;
}
</style>
