Component({
  options: {
    styleIsolation: 'shared',
  },
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
    }
  },
  methods: {
    goRecordPage(e){
        wx.navigateTo({
          url: '../recordPage/index?id='+e.target.id,
        })
    }
  }
})
