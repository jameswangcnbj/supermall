<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <home-swiper :banners="banners"/>
      <home-recommend-view :recommends="recommends"/>
      <feature-view />
      <tab-control :titles="['流行','新款','精选']"
                       class="tab-control"
                       @tabClick="tabClick" />
      <goods-list :goods="showGoods"/>
<!--      <div style="height: 800px;">&nbsp;</div>-->
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


  import {getHomeMultiData,getHomeGoods} from "@/network/home";

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
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},//流行
          'new':{page:0,list:[]}, //新款
          'sell':{page:0,list:[]} //精选
        },
        currentType: 'pop',
        isShowBacktop: false
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeFirstData()
      //2.请求商品数据
      this.getHomeSecondData('pop')
      this.getHomeSecondData('new')
      this.getHomeSecondData('sell')
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
      },
      backClick(){
        this.$refs.scroll.moveTo(0,0)
      },
      contentScroll(position){
        console.log(position);
        this.isShowBacktop = -position.y > 200
      },
      /*
      * 网络请求相关的方法
      * */
      getHomeFirstData(){
        getHomeMultiData()
        .then(res =>{
          console.log(res)
          // this.banners = res._data._rows
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeSecondData(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page)
          .then(res=>{
            console.log("商品数据",res)
            this.goods[type].list.push(...res._data._rows)
            this.goods[type].page += 1
          })
      }
    }
  }

</script>

<style scoped>
  #home {
    /*height: 100vh;*/
    position: relative;
    padding-top: 44px;
    height: 100vh;
  }
 .home-nav{
   background-color: var(--color-tint);
   color: #fff;
   position: fixed;
   left: 0px;
   right: 0px;
   top: 0px;
   z-index: 9;
 }
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
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
</style>
