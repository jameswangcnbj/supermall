import {debounce} from "@/common/utils";

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener: null,
      refresh:null
    }
  },
  mounted(){
    //1.监听GoodsListItem的图片加载的事件总线
      this.refresh = debounce(this.$refs.scroll.refresh,500)
      this.itemImgListener = ()=>{
        this.refresh()
      }
      this.$bus.$on('itemImageLoad',this.itemImgListener)
  },
  deactivated(){
    //取消全局事件监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  }
}
