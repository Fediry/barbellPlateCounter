/* barbellPlateCalculator.js - A web app to calculate how many plates should go on each
 * side of a barbell. It takes user input from the form after validating it's
 * a number in range of 1 to 2000, and outputs how many plates of various sizes 
 * should be added per side to equal the goal weight.
 * Created to assist in prepping for barbell exercises.
 * Author: John Nolan
 * Version: 0.5
 * Date: 3/25/2024
*/
function calculatePlates(e) {

    // Percentages for warmups
    const PERCENT_45 = 0.45;
    const PERCENT_65 = 0.65;
    const PERCENT_85 = 0.85;
    // Get user input
    const workingWeight_input = document.getElementById("weightInput");
    // Get output objects
    const warmup45Weight_output = document.getElementById("fortyfiveWeight");
    const warmup45Plate_output = document.getElementById("fortyfivePlates");
    const warmup65Weight_output = document.getElementById("sixtyfiveWeight");
    const warmup65Plate_output = document.getElementById("sixtyfivePlates");
    const warmup85Weight_output = document.getElementById("eightyfiveWeight");
    const warmup85Plate_output = document.getElementById("eightyfivePlates");
    const workingWeight_output = document.getElementById("workingWeight");
    const working_output = document.getElementById("workingPlates");

    // Validate input
    if (workingWeight_input.validity.valueMissing) {
        workingWeight_input.reportValidity();
        workingWeight_input.focus();
        return false;
    }
    else if (workingWeight_input.value < 1 || workingWeight_input.value > 2000) {
        workingWeight_input.setCustomValidity("Weight should be between 1 and 2000");
        workingWeight_input.reportValidity();
        workingWeight_input.setCustomValidity("");   // reset validity message
        workingWeight_input.focus();
        return false;
    }

    // Define process variables
    let working_weight = workingWeight_input.value;

    // Process the plates for the warmups
    let warmup45 = roundWarmupsToNearestFive(working_weight * PERCENT_45);
    let warmup45_plates = formatPlatesString(getPlatesPerSide(warmup45));
    let warmup65 = roundWarmupsToNearestFive(working_weight * PERCENT_65);
    let warmup65_plates = formatPlatesString(getPlatesPerSide(warmup65));
    let warmup85 = roundWarmupsToNearestFive(working_weight * PERCENT_85);
    let warmup85_plates = formatPlatesString(getPlatesPerSide(warmup85));
    
    // Process the plates for the working weight
    let working_plates = formatPlatesString(getPlatesPerSide(working_weight));

    // Output
    warmup45Weight_output.innerText = warmup45.toString();
    warmup45Plate_output.innerText = warmup45_plates;
    warmup65Weight_output.innerText = warmup65.toString();
    warmup65Plate_output.innerText = warmup65_plates;
    warmup85Weight_output.innerText = warmup85.toString();
    warmup85Plate_output.innerText = warmup85_plates;
    workingWeight_output.innerText = working_weight.toString();
    working_output.innerText = working_plates;

    return false;  // Don't actually submit form
}

// getPlatesPerSide(workingWeight_input) takes an int as workingWeight_input and
// returns an array of int's representing the number of plates per side
function getPlatesPerSide(working_weight_with_bar) {
    const BAR_WEIGHT = 45;
    // Weights with one plate on each side of the barbell
    const TWO_POINT_FIVE = 5;
    const FIVE_PLATES = 10;
    const TEN_PLATES = 20;
    const TWENTYFIVE_PLATES = 50;
    const FORTYFIVE_PLATES = 90;

    let working_weight = working_weight_with_bar - BAR_WEIGHT; // subtract the weight of the bar

    let plate_counter = [];  // holds the count of each plate per side
    let plates_to_add = 0;          // number of plates to add to the counter

    plates_to_add = working_weight / FORTYFIVE_PLATES; // how many 45's per side?
    plates_to_add = Math.floor(plates_to_add); // convert float back to int
    if (plates_to_add >= 1) { 
        plate_counter.push(plates_to_add);  // add to counter
        working_weight -= plates_to_add * FORTYFIVE_PLATES; // decrease total
    }
    else plate_counter.push(0); // Zero 45 plates

    plates_to_add = working_weight / TWENTYFIVE_PLATES; // how many 25's per side?
    plates_to_add = Math.floor(plates_to_add); // convert float back to int
    if (plates_to_add >= 0) { 
        plate_counter.push(plates_to_add);  // add to counter
        working_weight -= plates_to_add * TWENTYFIVE_PLATES; // decrease total
    }
    else plate_counter.push(0); // Zero 25 plates

    plates_to_add = working_weight / TEN_PLATES; // how many 10's per side?
    plates_to_add = Math.floor(plates_to_add); // convert float back to int
    if (plates_to_add >= 0) {
        plate_counter.push(plates_to_add);  // add to counter
        working_weight -= plates_to_add * TEN_PLATES; // decrease total
    }
    else plate_counter.push(0); // Zero 10 plates

    plates_to_add = working_weight / FIVE_PLATES; // how many 5's per side?
    plates_to_add = Math.floor(plates_to_add); // convert float back to int
    if (plates_to_add >= 0) {
        plate_counter.push(plates_to_add);  // add to counter
        working_weight -= plates_to_add * FIVE_PLATES; // decrease total
    }
    else plate_counter.push(0); // Zero 5 plates

    plates_to_add = working_weight / TWO_POINT_FIVE; // how many 2.5's per side?
    plates_to_add = Math.floor(plates_to_add); // convert float back to int
    if (plates_to_add >= 0) {
        plate_counter.push(plates_to_add); // add to counter
        working_weight -= plates_to_add * TWO_POINT_FIVE; // decrease total
    }
    else plate_counter.push(0); // Zero 2.5 plates
    return plate_counter;
}

// formatPlatesString(plate_counter) - takes an array of int's representing
// the number of plates per side of a barbell, and returns a descriptive
// string.
function formatPlatesString(plate_counter) {
    let formatted_string = new String("");

    // Add each plate count to the string
    if (plate_counter[0] != 0) {
        formatted_string += ` ${plate_counter[0]}x45 +`;
    }
    if (plate_counter[1] != 0) {
        formatted_string += ` ${plate_counter[1]}x25 +`;
    }
    if (plate_counter[2] != 0) {
        formatted_string += ` ${plate_counter[2]}x10 +`;
    }
    if (plate_counter[3] != 0) {
        formatted_string += ` ${plate_counter[3]}x5 +`;
    }
    if (plate_counter[4] != 0) {
        formatted_string += ` ${plate_counter[4]}x2.5`;
    }

    // Clean up the string if it ends early, dropping the last character
    string_length = formatted_string.length;
    if (formatted_string.charAt(string_length-1) == '+') {
        formatted_string = formatted_string.substring(0, string_length-1);
    }

    return formatted_string;
}

// roundWarmupsToNearestFive(warmupWeight) - takes an int representing a weight
// and rounds it to the nearest 5, (e.g. 126 becomes 125, 129 becomes 130) and
// returns the result
function roundWarmupsToNearestFive(warmup_weight) {
    rounded_weight = Math.round(warmup_weight/5)*5;
    return rounded_weight;
}