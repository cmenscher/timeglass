var onDeviceReady = function() {
    console.log("Device ready!");
    checkConnection();
    var $rootScope = angular.element(document).scope();
    $rootScope.$broadcast("deviceReady");
    

    // Insert Compass function here
    // navigator.compass.watchHeading(onCompassSuccess, onError, {frequency:1000});
}

var setupAcceleration = function(success, fail) {
    var $rootScope = angular.element(document).scope();
    $rootScope.deviceReady = true;
    navigator.accelerometer.watchAcceleration(onAccelSuccess, onAccelError, {frequency:250});
}

// onAccelSuccess: Get a snapshot of the current acceleration
var onAccelSuccess = function(acceleration) {
    // Show results in document body
    document.getElementById('accel').innerHTML='X: ' + acceleration.x + '<br />' +
    'Y: ' + acceleration.y + '<br />' +
    'Z: ' + acceleration.z + '<br />';
}

var onAccelError = function() {
    console.error("Accelerometer error!");
}

var onResume = function() {
	console.log("Glass App resuming...");
}

var checkConnection = function() {
    var networkState = navigator.connection.type;
    var $rootScope = angular.element(document).scope();

    var states = {};
    states[Connection.UNKNOWN]  = "unknown";
    states[Connection.ETHERNET] = "ethernet";
    states[Connection.WIFI]     = "wifi";
    states[Connection.CELL_2G]  = "2G"
    states[Connection.CELL_3G]  = "3G"
    states[Connection.CELL_4G]  = "4G";
    states[Connection.CELL]     = "generic_cell";
    states[Connection.NONE]     = "none";

    $rootScope.connection = states[networkState];
    console.log('Connection type: ' + $rootScope.connection);
}


var initPhoneGap = function() {
    console.log("Setting up PhoneGap events...");
    document.addEventListener("deviceready", onDeviceReady, false);
    document.addEventListener("resume", onResume, false);
    console.log("PhoneGap ready!");
}
