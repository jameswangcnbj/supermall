<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-control"
                  @tabClick="tabClick"
                 ref="tabControlTop"
                 v-show="isTabFixed" />
    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMore"
            @scroll="contentScroll">
      <home-swiper :banners="topdata['banner']"  @swiperImageLoad="swiperImageLoad" />
      <home-recommend-view :recommends="topdata['recommend']"/>
      <feature-view />
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick" ref="tabControl"
      />
      <goods-list :goods="showGoods"/>
      <div style="height: 370px;">&nbsp;</div>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBacktop"/>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'
  import Scroll from '@/components/common/scroll/Scroll'
  import TabControl from '@/components/content/tabcontrol/TabControl'
  import GoodsList from '@/components/content/goods/GoodsList'
  import BackTop from '@/components/content/backtop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import FeatureView from './childComps/FeatureView'


  import { getHomeMultiData,getHomeGoods } from "@/network/home"
  import { debounce } from "@/common/utils"

  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      TabControl,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      GoodsList,
      BackTop
    },
    data(){
      return {
        // banners:[],
        // recommends:[],
        topdata:{
          'banner':{list:[]},
          'recommend':{list:[]}
        },
        goods:{
          'pop':{page:0,list:[]},//流行
          'new':{page:0,list:[]}, //新款
          'sell':{page:0,list:[]} //精选
        },
        currentType: 'pop',
        isShowBacktop: false,
        tabOffSetTop: 0,
        isTabFixed: false
      }
    },

    created() {
      //1.请求top数据
      this.getHomeFirstData('banner')
      this.getHomeFirstData('recommend')
      //2.请求商品数据
      this.getHomeSecondData('pop')
      this.getHomeSecondData('new')
      this.getHomeSecondData('sell')
    },
    mounted(){
      //1.监听GoodsListItem的图片加载的事件总线
      const refresh = debounce(this.$refs.scroll.refresh,500)
      this.$bus.$on('itemImageLoad',()=>{
        refresh()
      })
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods:{
      /*
      * 事件监听相关方法
      * */

      tabClick(index){
          switch (index) {
            case 0:
              this.currentType = 'pop'
              break
            case 1:
              this.currentType = 'new'
              break
            case 2:
              this.currentType = 'sell'
              break
          }
          this.$refs.tabControlTop.currentIndex = index
          this.$refs.tabControl.currentIndex = index
      },
      backClick(){
        this.$refs.scroll.moveTo(0,0)
      },
      contentScroll(position){
        // console.log(position);
        //1.决定backtop的按钮是否显示
        this.isShowBacktop = -position.y > 200
        //2.决定tabcontrol是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffSetTop
      },
      loadMore(){
        this.getHomeSecondData(this.currentType)
      },
      swiperImageLoad(){
        // console.log(this.$refs.tabControl.$el.offsetTop)
        this.tabOffSetTop = this.$refs.tabControl.$el.offsetTop
      },
      /*
      * 网络请求相关的方法
      * */
      getHomeFirstData(type){
        getHomeMultiData(type)
        .then(res =>{
          console.log("头部数据",res)
          this.topdata[type].list.push(...res._data._rows)
          this.$refs.scroll.finishPullUp()
        })
      },
      getHomeSecondData(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page)
          .then(res=>{
            // console.log("商品数据",res)
            this.goods[type].list.push(...res._data._rows)
            this.goods[type].page += 1
            this.$refs.scroll.finishPullUp()
          })
      }
    }
  }

</script>

<style scoped>
  #home {
    /*height: 100vh;*/
    position: relative;
    /*padding-top: 44px;*/
    height: 100vh;
  }
 .home-nav{
   background-color: var(--color-tint);
   color: #fff;
   /*position: fixed;*/
   /*left: 0px;*/
   /*right: 0px;*/
   /*top: 0px;*/
   /*z-index: 9;*/

 }

  /*.content{*/
  /*  height: calc(100% - 193px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>
