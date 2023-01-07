import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { HttpResponse } from '@angular/common/http';
import { WeatherData } from './models/weather.model';
import { GeocodeData } from './models/geocode.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  weatherData: WeatherData;
  city: string = "Berlin";
  latitude: number = 52.52;
  longitude: number = 13.41;
  cityPhotoUrl: string
  currentHourIndex: number;
  currentHour: number;
  constructor(private weatherService: WeatherService) { }
  ngOnInit(): void {
    this.getWeather()
    this.getCityPicture()
  }
  getWeather() {
    this.weatherService.getWeather(this.latitude, this.longitude, 10, 'temperature_2m,relativehumidity_2m,windspeed_10m')
      .subscribe((data: WeatherData) => {
        this.weatherData = data;
        this.currentHourIndex = this.weatherData.hourly.time.findIndex(time => {
          this.currentHour = new Date().getHours();
          return new Date(Date.parse(time)).getHours() === this.currentHour;
        });
      });
  }

  getLatLng() {
    this.weatherService.getLatLng(this.city).subscribe((response: GeocodeData) => {
      this.latitude = response.results[0].geometry.location.lat;
      this.longitude = response.results[0].geometry.location.lng;
    });
  }
  getCityPicture() {
    this.weatherService.getCityPhoto(this.city).subscribe(photoUrl => {
      this.cityPhotoUrl = photoUrl;
    });
  }
}
