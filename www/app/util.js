
//maps a range onto a new range (kinda like Processing's map() function)
//"Map the value in the first param from first range onto the second range"
// map_range(50, 0, 100, 0, 1000)
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}