'use strict';
angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
	var outMsgs = [{text:"Please enter data first",style:"text-warning"},
					{text:"Too much!",style:"text-danger"},
					{text:"Enjoy!",style:"text-success"}];
	$scope.myLunch="";
	$scope.resultMsg = "";
	// styling messages
	$scope.msgStyle="";
	
	// main function
	$scope.check = function (){
		$scope.resultMsg = "";
		var msgNum = 0;
		var str = $scope.myLunch;
		if(str.length != 0) {
			var items=delBlanks(str.split(","));
			if(items.length != 0)
				msgNum = items.length > 3 ? 1: 2;
		}
		$scope.resultMsg = outMsgs[msgNum].text;
		$scope.msgStyle = outMsgs[msgNum].style;
	};
}

// helper function to clear array from empty/undefined elements
var delBlanks = function(arr){
	var outArr = [];
	console.log('Initial array',arr);
	arr.forEach( function(item, index) {		
			if( item && item.trim().length > 0){
				outArr.push(item);
			}
		}
		);
	console.log('Resulting array',outArr);
	return outArr;
};
