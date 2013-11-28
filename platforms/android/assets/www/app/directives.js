"use strict";

angular.module("glassApp.directives", [])
    .directive("accelerometerdata", function() {
        return {
            controller: ["$rootScope", "$scope", "$element", "$attrs", "$location", "$timeout", function($rootScope, $scope, $element, $attrs, $location, $timeout) {
                var init = function() {
                    console.log("Creating app loop...");
                    $rootScope.looper = setInterval($scope.updateAcceleration, 500);   
                }

                $scope.updateAcceleration = function() {
                    var acceleration = $rootScope.acceleration;
                    var accelHTML = "X: " + acceleration.x + "<br />" + "Y: " + acceleration.y + "<br />" + "Z: " + acceleration.z + "<br />";
                    $(".accel").html(accelHTML);
                }

                init();
            }],
             restrict: "A",

             replace: false,
        }
    })

    //  .directive("mobileapp", function() {
    //     return {
    //         controller: ["$rootScope", "$scope", "$element", "$attrs", "$location", function($rootScope, $scope, $element, $attrs, $location) {
    //             var init = function() {
    //                 console.log("initializing panels...");
    //             }

    //             init();
    //         }],
    //          restrict: "A",

    //          replace: true
    //     }
    // })
