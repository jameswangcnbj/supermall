<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navbar"/>
    <scroll class="content" ref="scroll"  :probe-type="3" @scroll="contentScroll">
       <detail-swiper :top-images="topImages"></detail-swiper>
       <detail-base-info :goods="goods"></detail-base-info>
       <div>
         <ul>
           <li ref="params">参数数据开始</li>
           <li>分类列表2</li>
           <li>分类列表3</li>
           <li>分类列表4</li>
           <li>分类列表5</li>
           <li>分类列表6</li>
           <li>分类列表7</li>
           <li>分类列表8</li>
           <li>分类列表9</li>
           <li>分类列表10</li>
           <li>分类列表11</li>
           <li>分类列表12</li>
           <li>分类列表13</li>
           <li>分类列表14</li>
           <li>分类列表15</li>
           <li>分类列表16</li>
           <li>分类列表17</li>
           <li>分类列表18</li>
           <li>分类列表19</li>
           <li>分类列表20</li>
           <li>分类列表21</li>
           <li>分类列表22</li>
           <li>分类列表23</li>
           <li>分类列表24</li>
           <li ref="comment">=========评论列表开始===========</li>
           <li>评论列表26</li>
           <li>评论列表27</li>
           <li>评论列表28</li>
           <li>评论列表29</li>
           <li>评论列表30</li>
           <li>分类列表31</li>
           <li>分类列表32</li>
           <li>分类列表33</li>
           <li>分类列表34</li>
           <li>分类列表35</li>
           <li>分类列表36</li>
           <li>分类列表37</li>
           <li>分类列表38</li>
           <li>分类列表39</li>
           <li>分类列表40</li>
           <li>分类列表41</li>
           <li>分类列表42</li>
           <li>分类列表43</li>
           <li>分类列表44</li>
           <li>分类列表45</li>
           <li>分类列表46</li>
           <li>分类列表47</li>
           <li>分类列表48</li>
           <li>分类列表49</li>
           <li>分类列表50</li>
         </ul>
       </div>
      <goods-list :goods="recommends" ref="recommend" @itemImageLoad="itemImageLoad"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBacktop"/>
     <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailBottomBar from './childComps/DetailBottomBar'
    import {getDetail,Goods, getDtailRecommend} from "@/network/detail";
    import Scroll from '@/components/common/scroll/Scroll'
    import GoodsList from "@/components/content/goods/GoodsList";
    import {itemListenerMixin,backTopMixin} from "@/common/mixin";
    import {debounce} from "@/common/utils";

    export default {
      name: "Detail",
      components:{
        GoodsList,
        Scroll,
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailBottomBar,
        Scroll
      },
      mixins:[itemListenerMixin,backTopMixin],
      data(){
       return {
         id: null,
         topImages: [],
         goods: {},
         recommends:[],
         themeTopYs:[],
         getThemeY: null,
         currentIndex: 0
        }
      },
      created() {
        //1.获取传入的id
        this.id = this.$route.params.id
        //2.请求数据
        getDetail(this.id).then(res =>{
          const data = res._data[0].data
          console.log(data);
          this.topImages =data[0]["topimages"]
          this.goods = new Goods(data[1]["baseinfo"][0])
        })
        //3.推荐数据
        getDtailRecommend().then(res =>{
          this.recommends = res._data._rows
          // console.log('推荐数据',this.recommends);
        })

        //这不是正确的方式，需要在其他组件的imageload完成后里面去执行
        this.$nextTick(()=>{
            this.themeTopYs = []
            this.themeTopYs.push(0)
            //模拟:应获取真是offsetTop,这里模拟参数和评论的值
            // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(300)
            this.themeTopYs.push(700)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)
            console.log(this.themeTopYs);
          },500)

      },
      mounted(){

      },
      methods:{
        itemImageLoad(){
          this.getThemeY()
        },
        titleClick(index){
          this.$refs.scroll.moveTo(0,-this.themeTopYs[index],500)
        },
        contentScroll(position){
          // console.log(position);
           //1.决定backtop的按钮是否显示
        this.isShowBacktop = -position.y > 500

          const positionY = - position.y
          const length = this.themeTopYs.length
          for(let i=0;i<length - 1;i++){
            if(this.currentIndex !== i  && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
                this.currentIndex = i;
                console.log("====",i);
                this.$refs.navbar.currentIndex = this.currentIndex
              }

          }
        }
      }
    }
</script>

<style scoped>
#detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }
 .content {
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
