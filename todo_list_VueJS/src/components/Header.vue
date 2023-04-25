<template>
  <div class="header">
      <div class="block-header">
          <span class="search"><img src="./list.png"></span>
          <h1 class="phrase">Each day I will accomplish one thing on my to do list</h1>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Header',
}
</script>

<style scoped >

.header {
    background: darkslategrey;
    color: white;
    padding: 30px;
    border-bottom: 2px solid #333333;
}
.block-header {
    display: flex;
    margin-bottom: 0;
    margin-top: 5px;
    margin-left: 10px;
}

.block-header img {
    margin-right: 10px;
    margin-bottom: -15px;
    margin-top: -5px;
    width: 50px;
    height: 50px;
}

.phrase{
    color: aliceblue;
    font-size: 30px;
    font-family: cursive;

}
</style>