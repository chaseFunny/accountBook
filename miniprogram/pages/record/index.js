Component({
  lifetimes: {
    attached: function(){
      console.log(1);
    }
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
      // 跳转到实际的页面
      
    }
  }
})
