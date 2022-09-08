
const path = require('path');
const csvFilePath=path.resolve(__dirname, 'csv/nodejs-hw1-ex1.csv');

const csv = require('csvtojson')
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
	console.log(jsonObj)
})
.catch((err)=>{
	console.log(err)
})