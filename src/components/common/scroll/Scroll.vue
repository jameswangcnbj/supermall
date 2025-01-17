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
   // import ObserveImage from '@better-scroll/observe-image'
   BScroll.use(Pullup)
   // BScroll.use(ObserveImage)

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
        },
        pullUpLoad:{
          type: Boolean,
          default: false
        }
      },
      mounted() {
        this.scroll = new BScroll(this.$refs.wrapper,{
          click:true,
          // observeImage: false,
          probeType:this.probeType,
          pullUpLoad: this.pullUpLoad
        })
        this.listenMove()
        //查看scrollerHeight的数据
        // console.log(this.scroll);
      },
      methods:{
        moveTo(x, y, time=500){
           this.scroll && this.scroll.scrollTo(x, y, time)
        },
        listenMove(){
          if(this.probeType === 2 || this.probeType === 3){
              this.scroll.on('scroll',(position)=>{
              this.$emit('scroll',position)
            })
          }

          if(this.pullUpLoad){
            this.scroll.on('pullingUp',()=>{
            // console.log('上拉加载更多');
            this.$emit('pullingUp')
           })
          }

        },
        finishPullUp(){
          this.scroll && this.scroll.finishPullUp()
        },
        refresh(){
          // console.log('--------');
          this.scroll && this.scroll.refresh()
        }
      }
    }
</script>

<style scoped>

</style>
