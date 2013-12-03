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

                    // window.addEventListener('deviceorientation', function(ev) {

                    //     /*
                    //     alpha = the direction the device is facing according to the compass
                    //     beta = the angle in degrees the device is tilted front-to-back
                    //     gamma = the angle in degrees the device is tilted left-to-right.
                    //     */

                    //     // var orientation = ev;
                    //     // var orientHTML = "";
                    //     //orientHTML = "ORIENTATION<br />ALPHA: " + orientation.alpha + "<br />" + "BETA: " + orientation.beta + "<br />" + "GAMMA: " + orientation.gamma + "<br />";
                    //     //$(".panoram").html(orientHTML);

                    //     var lastRotation = $rootScope.rotation;
                    //     var lastTilt = $rootScope.tilt;
                    //     $rootScope.rotation = ev.alpha;
                    //     $rootScope.tilt = ev.beta;

                    //     if($rootScope.startRotation === null) {
                    //         $rootScope.startRotation = ev.alpha;
                    //     }

                    //     if($rootScope.startTilt === null) {
                    //         $rootScope.startTilt = ev.alpha;
                    //     }


                    //     //console.log($rootScope.rotation);

                    //     var translateX = 0;
                    //     var translateY = 0;
                    //     if($rootScope.rotation % lastRotation + 5 || $rootScope.rotation < lastRotation -5) {
                    //         translateX = Math.floor($rootScope.startRotation) + $rootScope.rotation;
                    //     }

                    //     var $image = $(".panoramImage");
                    //     $image.css("-webkit-transform", "translate("+translateX+"px, 0px)");
                    // }, false);

                    $rootScope.startHeading = Math.floor($rootScope.heading); 
                    MainService.looper(function() {
                        var startHeading = Math.floor($rootScope.startHeading);
                        var heading = Math.floor($rootScope.heading);
                        var $image = $(".panoramImage");

                        var imgWidth = $image.width();
                        var imgHeight = $image.height();
                        
                        //var degreesInPixels = Math.floor(imgWidth/360);
                        //console.log("degreesInPixels = " + degreesInPixels);
                        var rotation = 0;

                        // if(startHeading < heading) { 
                        //     rotation = heading - startHeading;
                        // } else {
                        //     rotation = startHeading - heading;
                        // }

                        rotation = heading - startHeading;

                        var pixelHeading = startHeading + rotation;
                        
                        if(pixelHeading > 360) {
                            pixelHeading = 360;
                        } else if (pixelHeading < 0) {
                            pixelHeading = 0;
                        }

                        //var pixelDist = pixelHeading * degreesInPixels;
                        var pixelDist = map_range(pixelHeading, 0, 360, 0, imgWidth) * -1;
                        console.log("startHeading = " + startHeading + "   heading = " + heading + "  pixelHeading = " + pixelHeading + "   pixelDist = " + pixelDist);
                        // if(pixelDist < imgWidth*-1) {
                        //     pixelDist = imgWidth * -1;
                        // } else if(pixelDist > imgWidth) {
                        //     pixelDist = imgWidth;
                        // }

                        //console.log("Sliding to " + pixelDist + "px (" + pixelHeading + "º)...");
                        $image.css("-webkit-transform", "translate(" + pixelDist + "px, 0px)");
                    }, 50);

                    $rootScope.$on("tap", function() {
                        console.log("Switching to Compass heading...");
                        $location.path("/compass");
                        $scope.$apply();
                    });

                    $(".timelineCard").on("click", function() {
                        console.log("Switching to Compass heading...");
                        $location.path("/compass");
                        $scope.$apply();
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