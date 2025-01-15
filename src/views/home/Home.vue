<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <home-recommend-view :recommends="recommends"/>
    <feature-view />
    <tab-control :titles="['流行','新款','精选']"
                 class="tab-control"
                 @tabClick="tabClick" />
    <goods-list :goods="showGoods"/>
    <ul><li>列表1</li><li>列表2</li><li>列表3</li><li>列表4</li><li>列表5</li>
      <li>列表6</li><li>列表7</li><li>列表8</li><li>列表9</li><li>列表10</li>
      <li>列表11</li><li>列表12</li><li>列表13</li><li>列表14</li><li>列表15</li>
      <li>列表16</li><li>列表17</li><li>列表18</li><li>列表19</li><li>列表20</li>
      <li>列表21</li><li>列表22</li><li>列表23</li><li>列表24</li><li>列表25</li>
      <li>列表26</li><li>列表27</li><li>列表28</li><li>列表29</li><li>列表30</li>
      <li>列表31</li><li>列表32</li><li>列表33</li><li>列表34</li><li>列表35</li>
    </ul>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'
  import TabControl from '@/components/content/tabcontrol/TabControl'
  import GoodsList from '@/components/content/goods/GoodsList'

  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import FeatureView from './childComps/FeatureView'

  import {getHomeMultiData,getHomeGoods} from "@/network/home";


  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      GoodsList
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
        currentType: 'pop'
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
    /*position: relative;*/
    padding-top: 44px;
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
</style>
