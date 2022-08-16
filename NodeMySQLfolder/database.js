var mysql = require('mysql');

const parpoint = document.getElementById("Mxscore");
const parspeed=document.getElementById("curSpeed");
const restar = document.getElementById("Rmenu");
const parMain = document.getElementById("MainR");

var con = mysql.createConnection({
  host: "localhost",
  user: "Baizho",
  password: "Ectothermic#123"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query('select * from mydata.people', (err,res) => {
    if (err) throw err;
    console.log(res);
  })
});