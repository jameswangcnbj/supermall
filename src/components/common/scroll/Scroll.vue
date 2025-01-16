<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
   import BScroll from '@better-scroll/core'
   import Pullup from '@better-scroll/pull-up'
   BScroll.use(Pullup)

    export default {
      name: "Scroll",
      data(){
        return {
          scroll: null
        }
      },
      props:{
        probeType:{
          type: Number,
          default: 0
        }
      },
      mounted() {
        this.scroll = new BScroll(this.$refs.wrapper,{
          click:true,
          probeType:this.probeType,
          pullUpLoad: true
        })
        this.listenMove()
      },
      methods:{
        moveTo(x, y, time=500){
          this.scroll.scrollTo(x, y, time)
        },
        listenMove(){
          this.scroll.on('scroll',(position)=>{
            this.$emit('scroll',position)
          })
        }
      }
    }
</script>

<style scoped>

</style>
