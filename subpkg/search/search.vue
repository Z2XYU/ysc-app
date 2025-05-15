<template>
  <view>
    <view class="serach-box">
      <uni-search-bar class="search-text" :radius="100" @input="input" cancel-button="none"></uni-search-bar>
      <button class="search-btn" @click="gotoGoodsList(kw)">搜索</button>
    </view>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length!==0">
      <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item)">
        <view class="left">
          <uni-icons type="search" size="16"></uni-icons>
          <view class="goods_name">{{item.name}}</view>
        </view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clean"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag :text="item" v-for="(item,i) in histories" :key="i" @click="gotoGoodsList(item)">
        </uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer:null,
        kw:'',
        //搜索结果的列表
        searchResults:[],
        //搜索历史的列表
        historyList:[]
      };
    },
    onLoad() {
      this.historyList=JSON.parse(uni.getStorageSync('kw')||'[]')
      // console.log(this.historyList)
    },
    methods:{
      input(e){
        // clearTimeout(this.timer)
        // this.timer=setTimeout(()=>{
          this.kw=e
        //   console.log(this.kw)
          this.getSearchList()
        // },500)
      },
      async getSearchList(){
        if(this.kw===''){
          this.searchResults=[]
          return
        }
        const {data:res} = await uni.$http.get('/home/search',{info:this.kw})
        if (res.msg !== 'success') return uni.$showMsg()
        this.searchResults=res.data
        
      },
      gotoDetail(item){
        uni.navigateTo({
          url:'/subpkg/hanfu_detail/hanfu_detail?hanfu_id='+item.hanFuId
        })
      },
      saveSearchHistory(){
        // this.historyList.push(this.kw)
        const set =new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList=Array.from(set)
        // 进行持久化存储
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      clean(){
        this.historyList=[],
        // uni.setStorageSync('kw','[]')
        uni.removeStorageSync('kw')
      },
      gotoGoodsList(kw){
        this.saveSearchHistory()
        uni.navigateTo({
          url:'/subpkg/hanfu_list/hanfu_list?query='+kw
        })
      }
      
    },
    computed:{
      histories(){
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
.serach-box{
  display: flex;
  position: sticky;
  top: 0;
  z-index: 999;
  align-items: center;
  justify-items: center;
  background-color: #ffffff; 
  .search-text{
    width: 600rpx;
  }
  .search-btn{
  	background-color: #efefef;
  	color: black;
  	text-align: center;
  	display: inline-block;
  	font-size: 30rpx;
  	width: 150rpx;
  	height: 70rpx;
  	line-height: 65rpx;
  	border-radius: 30rpx;
  	letter-spacing: 3rpx;
  }
}
.sugg-list{
  padding: 0 5px;
  .sugg-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 3px solid #ffffff;
    .left{
      display: flex;
      .goods_name{
        white-space:nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
    
  }
}
.history-box{
  padding: 0 5px;
  .history-title{
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    font-size: 13px;
    border-bottom: 3px solid #efefef;
  }
  .history-list{
    display: flex;
    flex-wrap: wrap;
    .uni-tag{
      margin-top: 5px;
      margin-right: 5px;
      background-color: #efefef;
      color: black;
      border-radius: 5px;
    }
  }
}
</style>
