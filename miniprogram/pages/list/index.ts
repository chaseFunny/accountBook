interface demoType {
  name: string
  tag: string[]
  lover: string
  skill: string
}
Component({
  data: {
    iconName: 't-icon .t-icon-yinhangka1'
  },
  methods: {
    fn(a: demoType){
      console.log(a)
    }
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  }
})
