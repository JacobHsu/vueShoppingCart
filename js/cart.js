Vue.use(VueMaterial);

new Vue({
	el: '#app',
	data: {
	    totalMoney: 0,
	    productList: [],
	    checkAllFlag: false,
	    curProduct: ''
	 },
	 filters: {
	    formatMoney: function(value) {
	      return "NT$" + value.toFixed(2);
	    }
	 },
	 mounted: function() {
	    this.$nextTick(function() {
	      this.cartView();
	    })
	 },
	 // 事件綁定
	 methods: {
	    cartView: function() {
	        var _this = this;
	        this.$http.get("data/cartData.json", {"id": 123}).then(function(res) {
	          _this.productList = res.body.result.list;
	          _this.totalMoney =  res.body.result.totalMoney;
	        });
	     },
	    changeMoney: function(product, way) {
	        if (way > 0) {
	          product.productQuantity++;
	        }
	        else {
	          product.productQuantity--;
	          if (product.productQuantity < 1) {
	            product.productQuantity = 1;
	          }
	        }
	        this.calcTotalPrice();
	    },
        selectedProduct: function(item) {
	        if (typeof item.checked == 'undefined') {
	          // Vue.set(item, "checked", true); //全局註冊
	          this.$set(item, "checked", true); //局部註冊
	        }
	        else {
	          item.checked = !item.checked;
	        }
	        this.calcTotalPrice();
        },
	    checkAll: function(flag) {
	        this.checkAllFlag = flag;
	        var _this = this;
	        this.productList.forEach(function (item, index) {
	          if (typeof item.checked == 'undefined', _this.checkAllFlag) {
	            _this.$set(item, "checked", _this.checkAllFlag); //都沒選需進行註冊
	          }
	          else {
	            item.checked = _this.checkAllFlag;
	          }
	        });
	        this.calcTotalPrice();
	    },      
	    calcTotalPrice: function() {
	        var _this = this;
	        this.totalMoney = 0;
	        this.productList.forEach(function(item, index) {
	          if (item.checked) {
	            _this.totalMoney += item.productPrice * item.productQuantity;
	          }
	        });
      	},
	    deleteProduct: function() {
	        var index = this.productList.indexOf(this.curProduct);
	        this.productList.splice(index, 1);
	        this.$refs['dialog1'].close();
	    },
	    openDialog(item) {
      		this.$refs['dialog1'].open();
      		this.curProduct = item;
	    },
	    closeDialog() {
	      	this.$refs['dialog1'].close();
	    },
	    onOpen() {
	      	console.log('Opened');
	    },
	    onClose(type) {
	      	console.log('Closed', type);
	    }
	 }
});

// 全局過濾器
Vue.filter('money', function(value, type) {
  return "¥" + value.toFixed(2) + type;
});