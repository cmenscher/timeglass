"use strict";

angular.module("glassApp.directives", [])
    .directive("compassheading", function() {
        return {
            controller: ["$rootScope", "$scope", "$element", "$attrs", "$location", "$timeout", "MainService", function($rootScope, $scope, $element, $attrs, $location, $timeout, MainService) {
                var init = function() {
                    //console.log("Setting app loop for compass heading...");

                    // Note: I tried to pass a $scope scoped function to looper and
                    // it's "undefined" in MainService.  This makes sense now, but
                    // just wanted to remember it.
                    MainService.looper(function() {
                        var heading = $rootScope.heading;
                        var headingHTML = "";

                        if(heading !== null) {
                            headingHTML = "HEADING: " + heading;
                        } else {
                            headingHTML = "NO HEADING DATA";
                        }
                        $(".compass").html(headingHTML);
                    });

                    $rootScope.$on("tap", function() {
                        console.log("Switching to Accelerometer...");
                        $location.path("/accel");
                        $scope.$apply();
                    });

                    $(".timelineCard").on("click", function() {
                        console.log("Switching to Accelerometer...");
                        $location.path("/accel");
                        $scope.$apply();
                    });

                }

                init();
            }],
            restrict: "A",
            replace: true
        }
    })

    .directive("accelerometerdata", function() {
        return {
            controller: ["$rootScope", "$scope", "$element", "$attrs", "$location", "$timeout", "MainService", function($rootScope, $scope, $element, $attrs, $location, $timeout, MainService) {
                var init = function() {
                    //console.log("Setting app loop for accelerometer data...");

                    // Note: I tried to pass a $scope scoped function to looper and
                    // it's "undefined" in MainService.  This makes sense now, but
                    // just wanted to remember it.
                    MainService.looper(function() {
                        var acceleration = $rootScope.acceleration;
                        var accelHTML = "";

                        if(acceleration.hasOwnProperty("x")) {
                            accelHTML = "ACCELERATION<br />X: " + acceleration.x + "<br />" + "Y: " + acceleration.y + "<br />" + "Z: " + acceleration.z + "<br />";
                        } else {
                            accelHTML = "NO ACCELERATION DATA";
                        }
                        $(".accel").html(accelHTML);
                    });

                    $rootScope.$on("tap", function() {
                        console.log("Switching to Panoram...");
                        $location.path("/panoram");
                        $scope.$apply();
                    });

                    $(".timelineCard").on("click", function() {
                        console.log("Switching to Panoram...");
                        $location.path("/panoram");
                        $scope.$apply();
                    });

                }

                init();
            }],
            restrict: "A",
            replace: true
        }
    })

    .directive("panoram", function() {
        return {
            controller: ["$rootScope", "$scope", "$element", "$attrs", "$location", "$timeout", "MainService", function($rootScope, $scope, $element, $attrs, $location, $timeout, MainService) {
                var init = function() {
                    // clear any existing app loop
                    clearInterval($rootScope.looper);

                    var $image = $(".panoramImage");
                    //$image.height(window.innerHeight);

                    var imgWidth = $image.width();
                    var imgHeight = $image.height();

                    var centeredImage = 0;

                    // don't ask me why we need a timeout, but it's probably due to jquery
                    // maybe we should just do this with native js calls? I'm lazy.
                    $timeout(function() {
                        centeredImage = (($image.width()/2)*-1) + (window.innerWidth/2);
                        //console.log("centeredImage = " + centeredImage);
                        $image.css("left",  centeredImage + "px");
                    }, 250);
                    //$image.height(window.innerHeight);

                    //$rootScope.startHeading = Math.floor($rootScope.heading); 
                    MainService.looper(function() {
                        // exit the function until the compass is returning data
                        if($rootScope.startHeading === null) {
                            console.log("No heading data...returning false");
                            return false;
                        }

                        var startHeading = $rootScope.startHeading;
                        var heading = $rootScope.heading;
                        var $image = $(".panoramImage");

                        var imgWidth = $image.width();
                        var imgHeight = $image.height();
                        var centeredImage = (($image.width()/2)) + (window.innerWidth/2);
                        
                        //var degreesInPixels = Math.floor(imgWidth/360);
                        //console.log("degreesInPixels = " + degreesInPixels);
                        var rotation = 0;

                        // if(startHeading < heading) { 
                        //     rotation = heading - startHeading;
                        // } else {
                        //     rotation = startHeading - heading;
                        // }

                        // rotation = heading - startHeading;

                        // var pixelHeading = startHeading + rotation;
                        
                        // if(pixelHeading > 360) {
                        //     pixelHeading = 360;
                        // } else if (pixelHeading < 0) {
                        //     pixelHeading = 0;
                        // }

                        var pixelHeading = heading - startHeading;

                        var pixelDist = map_range(pixelHeading, 0, 360, 0, centeredImage) * -1;
                        console.log("centeredImage = " + centeredImage + "   startHeading = " + startHeading + "   heading = " + heading + "  pixelHeading = " + pixelHeading + "   pixelDist = " + pixelDist);

                        //console.log("Sliding to " + pixelDist + "px (" + pixelHeading + "º)...");
                        $image.css("-webkit-transform", "translate3d(" + pixelDist + "px, 0px, 0px)");
                        $(".headingHUD").html(Math.floor(heading) + "&deg;");
                    }, 50);

                    $rootScope.$on("tap", function() {
                        console.log("Switching to Compass heading...");
                        //$location.path("/compass");
                        // $scope.$apply();
                    });

                    $(".timelineCard").on("click", function() {
                        console.log("Switching to Compass heading...");
                        //$location.path("/compass");
                        // $scope.$apply();
                    })

                }

                $rootScope.$on("swipe", function() {
                    if(!$rootScope.inhibitSwipe) {
                        $rootScope.inhibitSwipe = true;
                        console.log("SWIPE!");
                        // TODO:
                        // This should cycle through panorm images
                        $rootScope.debugMode = !$rootScope.debugMode;
                        // $scope.$apply();
                        $timeout(function() {
                            $rootScope.inhibitSwipe = false;
                        }, 250)
                    }
                });

                init();
            }],
            restrict: "A",
            replace: true
        }
    })