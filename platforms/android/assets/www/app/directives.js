"use strict";

angular.module("glassApp.directives", [])
    .directive("accelerometerdata", function() {
        return {
            controller: ["$rootScope", "$scope", "$element", "$attrs", "$location", "$timeout", function($rootScope, $scope, $element, $attrs, $location, $timeout) {
                var init = function() {
                    console.log("Creating app loop...");

                    $rootScope.$on("tap", function() {
                        if($(".accel").hasClass("visible")) {
                            $(".accel").removeClass("visible");
                            $(".panoram").addClass("visible");
                        } else {
                            $(".accel").addClass("visible");
                            $(".panoram").removeClass("visible");
                        }
                    });

                    $rootScope.looper = setInterval($scope.updateAcceleration, 500);   
                }

                $scope.updateAcceleration = function() {
                    var acceleration = $rootScope.acceleration;
                    var accelHTML = "X: " + acceleration.x + "<br />" + "Y: " + acceleration.y + "<br />" + "Z: " + acceleration.z + "<br />";
                    $(".accel").html(accelHTML);
                }

                $scope.switchView = function() {

                }

                init();
            }],
             restrict: "A",

             replace: false,
        }
    })
