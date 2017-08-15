
new Vue({
  el: '.container',
  data: {
    limitNum: 5,
    addressList: [],
    currentIndex: 0,
    shippingMethod: 1,
    curAddress: '',
    delFlag: false,
    editFlag: false,
    userName: '',
    streetName: '',
    tel: '',
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getAddressList();
    });
  },
  computed: {
    filterAddress: function() {
      return this.addressList.slice(0, this.limitNum); //默認顯示3筆
    }
  },
  methods: {
    getAddressList: function() {
      var _this = this;
      this.$http.get("data/address.json").then(function(response) {
        var res = response.data;

        if (res.status = "0") {
          _this.addressList = res.result;
        }
      });
    },
    loadMore: function() {
      this.limitNum = this.addressList.length;
    },
    setDefault: function(addressId) {
      this.addressList.forEach(function (address, index) {
          address.isDefault = (address.addressId == addressId) ? true : false;
      });
    },
    delConfirm: function(item) {
      this.delFlag = true;
      this.curAddress = item;
    },
    editConfirm: function(item) {
      this.editFlag = true;
      this.curAddress = item;
    },
    delProduct: function() {
      var index = this.addressList.indexOf(this.curAddress);
      this.addressList.splice(index, 1);
      this.delFlag = false;
    },
    editProduct: function(editAddress) {
      this.curAddress['userName'] = editAddress['userName'];
      this.curAddress['streetName'] = editAddress['streetName'];
      this.curAddress['tel'] = editAddress['tel'];
      this.editFlag = false;
    }
  }
});
