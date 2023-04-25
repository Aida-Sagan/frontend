<template>
    <Header title="TO DO List" />
    <Todo />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Todo from './components/Todo.vue'

</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    background: gainsboro;
}
</style>
