<template>

        <div id="todo">
            <h1 class="capture">Список дел</h1>
            <p>Добавьте в список новые значения</p>
            <form @submit.prevent="addTask">
                <input type="text" v-model="newTask" placeholder="Введите задачу">
                <button type="submit">Добавить задачу</button>
            </form>
            <ul>
                <li v-for="(task, index) in tasks" :key="index">
                    {{ task }}
                    <div class="task">
                        <input type="checkbox" v-model="task.done">
                        <span :class="{done: task.done}">{{ task.name }}</span>
                        <button @click="deleteTask(index)">Удалить</button>
                    </div>


                </li>
            </ul>
        </div>

</template>

<script>
export default {
    name: "Todo",
    data() {
        return {
            title: 'Список дел',
            newTask: '',
            tasks: []
        }
    },
    methods: {
        addTask() {
            if (this.newTask) {
                this.tasks.push(this.newTask)
                this.newTask = ''
            }
        },
        deleteTask(index) {
            this.tasks.splice(index, 1)
        }
    }
}
</script>

<style scoped>
#todo {
    padding: 40px 600px;
}

#todo form {
    display: flex;
}

#todo .capture {
    font-weight: bold;
    font-size: 45px;
    font-family: Arial, sans-serif;
    text-align: center;
    margin-bottom: 10px;
}
#todo ul li .task {
    display: flex;
}

#todo ul li .task input {

    height: 25px;
    width: 25px;
    margin-top: 25px;
    margin-left: 10px;
    display: inline-block;
}

#todo ul li .task button{
    margin-top: 20px;
}

#todo p {
    text-align: center;
    font-size: 20px;
    margin-bottom: 10px;
}

#todo input {
    width: 150px;
    height: 40px;
    text-align: center;
    border-radius: 5px;
    border: 2px solid darkcyan;

}

#todo button {
    width: 105px;
    height: 40px;
    border-radius: 7px;
    background-color: cadetblue;
    color: aliceblue;
    border-bottom-color: darkslategrey;
    border: 2px solid darkslategray;
    cursor: pointer;
    border-bottom-width: 4px;
    transition: all 500ms ease;
    margin-left: 10px;
}

#todo button:hover {
    background: darkgray;
    color: honeydew;
    border: 2px solid darkslategrey;
    cursor: pointer;
    margin-top: 2px;
    border-bottom-width: 2px;
}

li {
    display: flex; /* задаем flex-контейнер для элемента списка */
    align-items: center; /* выравнивание по центру по вертикали */
    justify-content: space-between; /* выравнивание по горизонтали с расстоянием между элементами */
    list-style: none;
}
</style>