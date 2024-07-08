const currentDate = new Date().toISOString();
const formattedDate = currentDate.split('T')[0]; // Extract date part
console.log(formattedDate);