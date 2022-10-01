Component({
  data: {
    selected: 0,
    color: "#8a8a8a",
    selectedColor: "#1296db",
    list: [{
      "pagePath": "/pages/list/index",
      "iconPath": "/images/global/accountNo.png",
      "selectedIconPath": "/images/global/account.png",
      "text": "收支明细"
    },
    {
      "pagePath": "/pages/record/index",
      "iconPath": "/images/global/add01.png",
      "selectedIconPath": "/images/global/add01.png",
      // "text": "记一笔"
    },
    {
      "pagePath": "/pages/statistical/index",
      "iconPath": "/images/global/chartNo.png",
      "selectedIconPath": "/images/global/chart02.png",
      "text": "账单统计"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})