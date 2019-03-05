
module.exports.uptime = zeit;

// From 
// https://community.openhab.org/t/javascript-transform-example-with-system-uptime/40063

function zeit(i) {
    let val = parseInt(i); // The value sent by OH is a string, so we parse into an integer
    let days = 0; // Initialise variables
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    days = Math.floor(val / 86400); // Number of days
    val = val - (days * 86400); // Remove days from val
    
    hours = Math.floor(val / 3600); // Number of hours
    val = val - (hours * 3600); // Remove hours from val
    
    minutes = Math.floor(val / 60); // Number of minutes
    val = val - (minutes * 60); // Remove hours from val
    
    seconds = Math.floor(val / 1); // Number of seconds

    let stringDays = ''; // Initialse string variables
    let stringHours = '';
    let stringMinutes = '';
    let stringSeconds = '';
    if (days === 1) {
        stringDays = '1 day '; // Only 1 day so no 's'
    } else if (days > 1) {
        stringDays = days + ' days '; // More than 1 day so 's'
    } // If days = 0 then stringDays remains ''

    if (hours === 1) {
        stringHours = '1 hour '; // Only 1 hour so no 's'
    } else if (hours > 1) {
        stringHours = hours + ' hours '; // More than 1 hour so 's'
    } // If hours = 0 then stringHours remains ''

    if (minutes === 1) {
        stringMinutes = '1 min '; // Only 1 minute so no 's'
    } else 
        stringMinutes = minutes + ' min '; // More than 1 minute or 0 minutes, so 's'

    if (seconds === 1) {
        stringSeconds = '1 sec'; // Only 1 second so no 's'
    } else 
        stringSeconds = seconds + ' sec'; // More than 1 second or 0 seconds, so 's'
     // If minutes = 0 then stringSeconds remains ''


    var returnString = stringDays + stringHours + stringMinutes + stringSeconds
    return returnString.trim(); // Removes the extraneous space at the end

}
