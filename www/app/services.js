"use strict";

/****************************************************************
            MAIN APP SERVICE
****************************************************************/
glassApp.service("MainService", ["$rootScope", "DeviceService", function($rootScope, DeviceService) {

	this.looper = function(loopFunction, interval) {
		if(arguments.length < 2) {
			var interval = 500; //millis
		}
		//console.log("Creating app loop...");
		// console.log(loopFunction);
		clearInterval($rootScope.looper);
		$rootScope.looper = setInterval(loopFunction, interval);
	}

}]);


/****************************************************************
            DEVICE/HARDWARE SERVICE
****************************************************************/
glassApp.service("DeviceService", ["$rootScope", function($rootScope) {
	this.getLocation = function(callback) {
		if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(callback);
		}
	};

	this.getAcceleration = function(success, fail) {
		if(navigator.accelerometer) {
			navigator.accelerometer.getCurrentAcceleration(success, fail);
		}
	}

	this.watchAcceleration = function(frequency) {
		if(navigator.accelerometer) {
			if(arguments.length === 0) {
				var frequency = {frequency:250}; //millis
			}

			var accelerationSuccess = function(data) {
				$rootScope.acceleration = data;
			}

			var accelerationFail = function() {
				console.log("Accelerometer reading FAIL!");
			}

			navigator.accelerometer.watchAcceleration(accelerationSuccess, accelerationFail, frequency);
		}
	}

	this.getCurrentHeading = function(success, fail) {
		if(navigator.compass) {
			navigator.compass.getCurrentHeading(compassSuccess, compassFail);
		}

		var compassSuccess = function(data) {
			$rootScope.heading = data.magenticHeading;
		}

		var compassFail = function() {
			console.log("Compass reading FAIL!");
		}
	}

	this.watchHeading = function(frequency) {
		if(navigator.compass) {
			navigator.compass.clearWatch();
			
			if(arguments.length === 0) {
				var frequency = {frequency:250}; //millis
			}

			var compassSuccess = function(data) {
				$rootScope.heading = data.magneticHeading;
			}

			var compassFail = function() {
				console.log("Compass reading FAIL!");
			}

			navigator.compass.watchHeading(compassSuccess, compassFail, frequency);
		}
	}

	this.setupTouchpad = function() {
		var TAP = 13;
		var SWIPE = 9
		var $rootScope = angular.element(document).scope();

		var tapCallback = function() {
			console.log("Tap!");
    		$rootScope.$broadcast("tap");
    	}

		var swipeCallback = function() {
			console.log("Swipe!");
    		$rootScope.$broadcast("swipe");
		}

        document.addEventListener('keydown',function(e) {
			switch(e.keyCode) {
				case TAP:
					tapCallback();
					break;
				case SWIPE:
					swipeCallback();
					break;
			}
        });
	}

}]);