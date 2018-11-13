(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ShoppingListAddController', ShoppingListAddController)
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .constant('FunnyKitConst', [{ name: "cookies", quantity: 10 },
                         { name: "pepsi", quantity: 3 },
                         { name: "cheeseburgers", quantity: 15 },
                         { name: "candys", quantity: 20 },
                         { name: "donuts", quantity: 8 }]);


    ShoppingListAddController.$inject = ['ShoppingListCheckOffService','FunnyKitConst'];
    function ShoppingListAddController(ShoppingListCheckOffService, FunnyKitConst){
        var itemAdder = this;

        itemAdder.itemName = "";
        itemAdder.itemQuantity = "";
      
        itemAdder.addItem = function () {
          ShoppingListCheckOffService.addToBuyItem(itemAdder.itemName, itemAdder.itemQuantity);
          itemAdder.itemName = "";
          itemAdder.itemQuantity = "";
        }

        itemAdder.useStandartKit = function (){
            FunnyKitConst.forEach(el => {
            ShoppingListCheckOffService.addToBuyItem(el.name, el.quantity);
          });
        }
    }

    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var list = this;
      
        list.items = ShoppingListCheckOffService.getToBuyItems();
      
        list.itemName = "";
        list.itemQuantity = "";

        list.moveToBoughtList = function(itemIndex){
            ShoppingListCheckOffService.moveToAlreadyBoughtList(itemIndex);
        }; 
      }

      AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
      function AlreadyBoughtController(ShoppingListCheckOffService) {
        var list = this;

        list.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
      }

      function ShoppingListCheckOffService() {
        var service = this;
      
        // Lists of items to buy
        var toBuyItems = [];
        
        // Lists of already bought items 
        var alreadyBoughtItems = [];
      
        service.addToBuyItem = function (itemName, quantity) {
          var item = {
            name: itemName,
            quantity: quantity
          };
          toBuyItems.push(item);
        };
     
        service.getToBuyItems = function () {
          return toBuyItems;
        };

        service.moveToAlreadyBoughtList = function (itemIndex) {
            alreadyBoughtItems.push(toBuyItems[itemIndex]);
            toBuyItems.splice(itemIndex,1);
        };

        service.getAlreadyBoughtItems = function () {
            return alreadyBoughtItems;
        };

      };     

})()