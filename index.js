import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const state = req.query.state;
    
    try {
        const coordinates_result = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&limit=5&appid=xxxxxxxxxxxxxxx`);
        const location = coordinates_result.data[0];
        const lat = location.lat;
        const lon = location.lon;
        const weather_result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=xxxxxxxxxxxxxxxx&units=imperial`);
        const temp = weather_result.data.main.temp;
        const humidity = weather_result.data.main.humidity;
        
        res.render("weather.ejs", { 
            temp: temp, city: city, state: state, humidity: humidity
        });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});