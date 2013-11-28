//require HammerJS directives via hmTouchEvents
var glassApp = angular.module("glassApp", ["glassApp.directives", "ngSanitize"]);

glassApp.config(function($httpProvider) {
    $httpProvider.responseInterceptors.push(httpInterceptor);
});

var httpInterceptor = function($q) {
	var resolve = function(response) {
		//console.log("HTTP response: " + response.status);
		return response;
	}

    var reject = function (response) {
        console.error("OH NOES! HTTP response: " + response.status);
        console.log(response);
        return $q.reject(response);
    }

    return function (promise) {
        return promise.then(resolve, reject);
    }
};


glassApp.run(["$rootScope", "$location", "$http", "DeviceService", function($rootScope, $location, $http, DeviceService) {

    /****************************************************************
                            CONFIGURATION
    ****************************************************************/            
    $rootScope.isNativeApp = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1; //in a PhoneGap app or a browser?
    $rootScope.loading = false;
    $rootScope.readyForResize = false; //when this is true a $watch callback will resize all panels to the device height
    $rootScope.connection = "unknown";

    $rootScope.apiUrl = "http://localhost:5000?callback=?",

    // When false, this sends all console.log()'s to /dev/null
    // *** This should be changed to false when deploying to production! ***
    $rootScope.debugMode = true;

    $rootScope.loopTimer = {};


    /****************************************************************
                USER DATA & METHODS
    ****************************************************************/

    $rootScope.Device = {};

    $rootScope.getDevice = function(callback) {
        console.log("Getting Device info...");
        if(arguments.length == 0) {
            var callback = function(Device) { console.log(JSON.stringify(Device)); };
        }

        if(typeof(localStorage.Device) === "undefined" || localStorage.Device == "" || localStorage.Device === null) { //initial run of the app
            localStorage.Device = '{"ownerName": ""}';
        }

        $rootScope.Device = JSON.parse(localStorage.Device);
        callback($rootScope.Device);
    }

    $rootScope.saveDevice = function() {
        console.log("Saving Device to localStorage...");
        var DeviceJSONString = JSON.stringify($rootScope.Device);
        localStorage.Device = DeviceJSONString;
        return localStorage.Device;
    };



    /**************************************************
                    APP DATA
    **************************************************/
    $rootScope.acceleration = {}; // holds current acceleration data (as an object)

    /****************************************************************
                GLOBAL METHODS (non-utility)
    ****************************************************************/
    $rootScope.ctrlAltDelete = function(homePath) {
        if(arguments.length === 0) {
            var homePath = "/login";
        }
        console.log("Resetting user data...")

        localStorage.Bin = "[]";

        console.log('Returning to "' + homePath + '"...');

        $rootScope.loading = false;

        $location.path(homePath);

        if($rootScope.isNativeApp) {
            //for some reason this is needed in the app but not when testing via Chrome
            if(!$rootScope.$$phase) { //only do apply if we're not in $digest cycle
                $rootScope.$apply();
            }
        }
    }



    /****************************************************************
                    PHONEGAP/CORDOVA INIT
    ****************************************************************/
    // Dynamically appending the Cordova js stuff because it breaks the console in a normal browser
    $rootScope.phoneGap = {
        init: function() {
            if($rootScope.isNativeApp) {
                console.log("***** PHONEGAP SETUP *****");
                var phoneGapSrc = "";
                phoneGapSrc += "<script type=\"text/javascript\" src=\"cordova.js\"></script>";
                phoneGapSrc += "<script type=\"text/javascript\" src=\"app/phonegap_events.js\"></script>";
                phoneGapSrc += "<script type=\"text/javascript\">initPhoneGap();</script>";
                $("body").append(phoneGapSrc);
            } else {
                console.log("Not a native app...skipping PhoneGap initialization...");
            }
        }    
    }



    /****************************************************************
                    INITIALIZE THE APP...            
    ****************************************************************/
    $rootScope.init = function() {

        //If $rootScope.debugMode is false, DO NOT LOG TO CONSOLE
        (function(console) {
            if(!$rootScope.debugMode) {
                // send console.log()'s to /dev/null
                console.log = function() {};
            }
        })(console);

    
        // Proceed with rest of app bootstrap...
        console.log("Initializing application...");

        $rootScope.getDevice();        

        console.log("$rootScope initialization complete.");

        $rootScope.phoneGap.init();

        $rootScope.$on("deviceReady", function() {
            DeviceService.setupTouchpad();
            DeviceService.watchAcceleration();
        });

        console.log("\n\nReady...............FIGHT!\n\n"); //app initializing complete
    }

    $rootScope.init();

}]);
