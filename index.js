

require('dotenv').config();
var express=require('express');
var request=require('request');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var apikey=process.env.weatherapi;
var app=express();
app.set('view engine','ejs');

app.use(express.json());
app.use(express.static('./public'));


app.get('/weather',function(req,res){
	
	res.render('weather',{data:false});
});
app.post('/weather',urlencodedParser,function(req,res){
	var city=req.body.city;
	var country=req.body.country;
	console.log(city);
	console.log(country);
	var url=`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apikey}`;
	request(url,function(error,response,body){
		weather_json=JSON.parse(body);
		console.log(weather_json);
		var desc=weather_json.weather[0].description;
		var icon=weather_json.weather[0].icon;
		var name=weather_json.name;
		var temperature=weather_json.main.temp / 10;
		var temp=Math.round(temperature);
		var data={desc:desc,icon:icon,name:name,temp:temp};
		res.render('weather',{data:data});
});
	});
	
app.listen(3000);