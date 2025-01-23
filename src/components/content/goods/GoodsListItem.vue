<template>
    <div class="goods-item" @click="itemClick">
      <img :src="showImage" alt="" @load="imageLoad">
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
      computed:{
        showImage() {
    		  return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
        }
      },
      methods:{
        imageLoad(){
          this.$bus.$emit('itemImageLoad')
          // if(this.$route.path.indexOf('/home')){
          //   this.$bus.$emit('homeItemImageLoad')
          // }else if (this.$route.path.indexOf('/detail')){
          //   this.$bus.$emit('detailItemImageLoad')
          // }
        },
        itemClick(){
          this.$router.push('/detail/' + this.goodsItem.id)
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
