
//maps a range onto a new range (kinda like Processing's map() function)
//"Map the value in the first param from first range onto the second range"
// map_range(50, 0, 100, 0, 1000)
function map_range(value, low1, high1, low2, high2, options) {
	// valid "options"
	// restrictHigh (boolean)
	// restrictLow (boolean)

	if(arguments.length < 6) {
		var options = {};
	}

    var mapped = low2 + (high2 - low2) * (value - low1) / (high1 - low1);

    if(options.restrictLow) {
    	if(mapped < low2) {
    		mapped = low2;
    	}
    }

    if(options.restrictHigh) {
    	if(mapped > high2) {
    		mapped = high2;
    	}
    }

    return mapped;
}