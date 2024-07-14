const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // getMonth() returns month from 0-11, so we add 1
const date = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();

// Format date as "date/month/year"
const formattedDate = `${date}/${month}/${year}`;

// Format time as "hours:minutes AM/PM"
let formattedHours = hours % 12;
formattedHours = formattedHours ? formattedHours : 12; // the hour '0' should be '12'
const ampm = hours >= 12 ? 'PM' : 'AM';
const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

console.log(formattedDate);
console.log(formattedTime);
