import React from 'react';
import './HourlyForecast.css';
import axios from 'axios';
import { data } from 'autoprefixer';

const weatherTypeDescriptions = {
	"0":{
		"day":{
			"description":"Sunny",
			"image":"http://openweathermap.org/img/wn/01d@2x.png"
		},
		"night":{
			"description":"Clear",
			"image":"http://openweathermap.org/img/wn/01n@2x.png"
		}
	},
	"1":{
		"day":{
			"description":"Mainly Sunny",
			"image":"http://openweathermap.org/img/wn/01d@2x.png"
		},
		"night":{
			"description":"Mainly Clear",
			"image":"http://openweathermap.org/img/wn/01n@2x.png"
		}
	},
	"2":{
		"day":{
			"description":"Partly Cloudy",
			"image":"http://openweathermap.org/img/wn/02d@2x.png"
		},
		"night":{
			"description":"Partly Cloudy",
			"image":"http://openweathermap.org/img/wn/02n@2x.png"
		}
	},
	"3":{
		"day":{
			"description":"Cloudy",
			"image":"http://openweathermap.org/img/wn/03d@2x.png"
		},
		"night":{
			"description":"Cloudy",
			"image":"http://openweathermap.org/img/wn/03n@2x.png"
		}
	},
	"45":{
		"day":{
			"description":"Foggy",
			"image":"http://openweathermap.org/img/wn/50d@2x.png"
		},
		"night":{
			"description":"Foggy",
			"image":"http://openweathermap.org/img/wn/50n@2x.png"
		}
	},
	"48":{
		"day":{
			"description":"Rime Fog",
			"image":"http://openweathermap.org/img/wn/50d@2x.png"
		},
		"night":{
			"description":"Rime Fog",
			"image":"http://openweathermap.org/img/wn/50n@2x.png"
		}
	},
	"51":{
		"day":{
			"description":"Light Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Light Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"53":{
		"day":{
			"description":"Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"55":{
		"day":{
			"description":"Heavy Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Heavy Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"56":{
		"day":{
			"description":"Light Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Light Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"57":{
		"day":{
			"description":"Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"61":{
		"day":{
			"description":"Light Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Light Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"63":{
		"day":{
			"description":"Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"65":{
		"day":{
			"description":"Heavy Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Heavy Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"66":{
		"day":{
			"description":"Light Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Light Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"67":{
		"day":{
			"description":"Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"71":{
		"day":{
			"description":"Light Snow",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Light Snow",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"73":{
		"day":{
			"description":"Snow",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Snow",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"75":{
		"day":{
			"description":"Heavy Snow",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Heavy Snow",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"77":{
		"day":{
			"description":"Snow Grains",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Snow Grains",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"80":{
		"day":{
			"description":"Light Showers",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Light Showers",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"81":{
		"day":{
			"description":"Showers",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Showers",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"82":{
		"day":{
			"description":"Heavy Showers",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Heavy Showers",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"85":{
		"day":{
			"description":"Light Snow Showers",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Light Snow Showers",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"86":{
		"day":{
			"description":"Snow Showers",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Snow Showers",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"95":{
		"day":{
			"description":"Thunderstorm",
			"image":"http://openweathermap.org/img/wn/11d@2x.png"
		},
		"night":{
			"description":"Thunderstorm",
			"image":"http://openweathermap.org/img/wn/11n@2x.png"
		}
	},
	"96":{
		"day":{
			"description":"Light Thunderstorms With Hail",
			"image":"http://openweathermap.org/img/wn/11d@2x.png"
		},
		"night":{
			"description":"Light Thunderstorms With Hail",
			"image":"http://openweathermap.org/img/wn/11n@2x.png"
		}
	},
	"99":{
		"day":{
			"description":"Thunderstorm With Hail",
			"image":"http://openweathermap.org/img/wn/11d@2x.png"
		},
		"night":{
			"description":"Thunderstorm With Hail",
			"image":"http://openweathermap.org/img/wn/11n@2x.png"
		}
	}
};

function HourlyForecast({ latitude, longitude }) {
    const [forecastData, setForecastData] = React.useState({
        loaded: false,
        data: [
            { time: "Now", iconUrl: "", temp: 0 },
            { time: "2h", iconUrl: "", temp: 0 },
            { time: "4h", iconUrl: "", temp: 0 },
            { time: "6h", iconUrl: "", temp: 0 },
            { time: "8h", iconUrl: "", temp: 0 }
        ]
    });

    React.useEffect(() => {
        if (!forecastData.loaded && latitude !== null && longitude !== null) {
            const q = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code&temperature_unit=fahrenheit&forecast_days=3`;
            axios.get(q).then( (response) => {
                const currentHour = new Date().getHours() + 1;
                const indices = [currentHour, currentHour + 2, currentHour + 4, currentHour + 6, currentHour + 8];
                const fd = indices.map( (index) => ({
                    time: new Date(response.data.hourly.time[index]).toLocaleTimeString('en-US', {hour: 'numeric', hour12: true}),
                    iconUrl: weatherTypeDescriptions[String(response.data.hourly.weather_code[index])].day.image,
                    temp: Math.round(response.data.hourly.temperature_2m[index])
                }));
                setForecastData({ loaded: true, data: fd });
            });
        }
    }, [latitude, longitude]);

    return (
        <div className="hourly-forecast">
            <h3>Forecast</h3>
            <div className="hourly-grid">
                {forecastData.data.map((hour, index) => (
                <div className="hour" key={index}>
                    <p>{hour.time}</p>
                    <p><img src={hour.iconUrl} alt="ICON" style={{ height: "auto", width: "100%", objectFit: "contain" }}></img></p>
                    <p>{hour.temp}°F</p>
                </div>
                ))}
            </div>
        </div>
    );
}

export default HourlyForecast;