"use strict";

angular.module("glassApp.directives", [])
    .directive("accelerometerdata", function() {
        return {
            controller: ["$rootScope", "$scope", "$element", "$attrs", "$location", "$timeout", function($rootScope, $scope, $element, $attrs, $location, $timeout) {
                var init = function() {
                    console.log("Creating app loop...");

                    $rootScope.$on("tap", function() {
                        $scope.switchView();
                    });

                    $rootScope.looper = setInterval($scope.updateAcceleration, 500);
                }

                $scope.updateAccelerationData = function() {
                    var acceleration = $rootScope.acceleration;
                    var accelHTML = "X: " + acceleration.x + "<br />" + "Y: " + acceleration.y + "<br />" + "Z: " + acceleration.z + "<br />";
                    $(".accel").html(accelHTML);
                }

                $scope.movePanoram = function() {
                    var acceleration = $rootScope.acceleration;
                    // Need to do a CSS transform to move the image based on the
                    // current acceleration data (X and Y anyway)                    
                }

                $scope.switchView = function() {
                    if($(".accel").hasClass("visible")) {
                        $(".accel").removeClass("visible");
                        $(".panoram").addClass("visible");
                        clearInterval($rootScope.looper);
                        $rootScope.looper = setInterval($scope.movePanoram, 100);

                } else {
                        $(".accel").addClass("visible");
                        $(".panoram").removeClass("visible");
                        clearInterval($rootScope.looper);
                        $rootScope.looper = setInterval($scope.updateAccelerationData, 500);
                    }
                }

                init();
            }],
             restrict: "A",

             replace: false,
        }
    })
