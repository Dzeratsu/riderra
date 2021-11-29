<template>
    <div class="container margin">
      <div class="row">
        <h2 class="h2 site-section__title">{{$tc('main.utility.autopark.title')}}</h2>
        <p>{{$tc('main.utility.autopark.first')}}</p>
        <p>{{$tc('main.utility.autopark.secondary')}}</p>
        <div class="btn"><button class="button">{{$tc('main.utility.autopark.button')}}</button></div>

    </div>
    </div>
</template>

<script>
export default {
  name: "autopark"
}
</script>

<style scoped>
.btn {
display: flex;
  justify-content: right;
}
button {
  min-width: 300px;
  margin-top: 15px;
}
.margin {
  padding-bottom: 120px;
}

</style>
