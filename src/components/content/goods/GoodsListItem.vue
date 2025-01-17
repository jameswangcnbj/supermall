<template>
    <div class="goods-item">
      <img :src="goodsItem.image" alt="" @load="imageLoad">
      <div class="goods-info">{{ goodsItem.title }}</div>
    </div>
</template>

<script>
    export default {
      name: "GoodsListItem",
      props:{
        goodsItem:{
          type: Object,
          default(){
            return {}
          }
        }
      },
      methods:{
        imageLoad(){
          this.$bus.$emit('itemImageLoad')
        }
      }
    }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 20px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }
    .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

</style>
