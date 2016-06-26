angular.module("app", [])

.service("socket", function() {
  //var socket = io("http://172.18.150.182");
  var socket = io("http://192.168.4.1");
  return {
    emit: function(name) {
      console.log("Sending event " + name);
      socket.emit(name);
    }
  };
})

.controller("appController", function($scope, socket) {

  $scope.fire = function() {
    socket.emit("fire");
  };

  $scope.left = function(){
    socket.emit("left");
  };

  $scope.right = function(){
    socket.emit("right");
  };

  $scope.down = function(){
    socket.emit("down");
  };

  $scope.up = function(){
    socket.emit("up");
  };

  $scope.stop = function(){
    socket.emit("stop");
  };

})

.directive("ngTouchstart", function () {
    return {
        controller: ["$scope", "$element", function ($scope, $element) {

            $element.bind("touchstart", onTouchStart);
            function onTouchStart(event) {
                var method = $element.attr("ng-touchstart");
                $scope.$event = event;
                $scope.$apply(method);
            }

        }]
    }
})

.directive("ngTouchend", function () {
    return {
        controller: ["$scope", "$element", function ($scope, $element) {

            $element.bind("touchend", onTouchEnd);
            function onTouchEnd(event) {
                var method = $element.attr("ng-touchend");
                $scope.$event = event;
                $scope.$apply(method);
            }

        }]
    }
});
