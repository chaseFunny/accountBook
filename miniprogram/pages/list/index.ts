interface demoType {
  name: string
  tag: string[]
  lover: string
  skill: string
}
Component({
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
