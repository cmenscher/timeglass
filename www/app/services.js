"use strict";

/****************************************************************
            CITIBIKE STATION SERVICE
****************************************************************/
glassApp.service("MainService", ["$rootScope", "DeviceService", function($rootScope, DeviceService) {

	this.init  = function(callback) {
		if(arguments.length < 1) {
			var callback = function() {
				console.log("Hunt complete");
			}
		}
		DeviceService.getLocation(function(loc) {

			var params = {
				lat: loc.coords.latitude,
				lon: loc.coords.longitude,
			}

			$.getJSON($rootScope.apiUrl, params)
			.done(function(data) {

			});
		});
	};
}]);

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

	this.setupTouchpad = function() {
		var TAP = 13;
		var SWIPE = 9

		var tapCallback = function() {
			console.log("Tap!");
		}

		var swipeCallback = function() {
			console.log("Swipe!");
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