<template>
    <div class="recommend">
      <div v-for="item in recommends.list" class="recommend-item">
        <a :href="item.link" target="_blank">
          <img :src="item.image" >
          <div>{{ item.title }}</div>
        </a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "HomeRecommendView",
        props:{
          recommends:{
            type: Object,
            default(){
              return []
            }
          }
        }
    }
</script>

<style scoped>
.recommend {
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    padding-bottom: 15px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
    text-align: center;
  }

  .recommend img {
    width: 80px;
    height: 80px;
    margin-bottom: 5px;
  }
</style>
