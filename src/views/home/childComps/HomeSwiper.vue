<template>
    <swiper>
        <SwiperItem v-for="item in banners.list" :key="item.index" >
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoad"/>
          </a>
        </SwiperItem>
     </swiper>
</template>

<script>
   import {Swiper, SwiperItem} from '@/components/common/swiper'
    export default {
        name: "HomeSwiper",
        props:{
          banners:{
            type: Object,
            default(){
              return []
            }
          }
        },
       data(){
          return {
            imgLoaded: false
          }
       },
       components:{Swiper,SwiperItem},
       methods:{
          imageLoad(){
            if(!this.imgLoaded){
              this.$emit('swiperImageLoad')
              this.imgLoaded = true
            }

          }
       }
    }
</script>

<style scoped>

</style>
