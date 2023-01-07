import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weather.model';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiUrl = 'https://api.open-meteo.com/v1/forecast';
  apiUrlLl = 'https://maps.googleapis.com/maps/api/geocode/json';
 
  constructor(private http: HttpClient) { }

  getWeather(latitude: number, longitude: number, nextDays: number, hourly: string) {
    return this.http.get(`${this.apiUrl}?latitude=${latitude}&longitude=${longitude}&next_days=${nextDays}&hourly=${hourly}`);

  }
  getLatLng(city: string) {
    const params = {
      address: city,
      key: environment.apiKeyGoecode
    };
    return this.http.get(this.apiUrlLl, { params });
  }
  getCityPhoto(city: string):Observable<string> {
    return this.http.get(`https://api.unsplash.com/search/photos/?client_id=`+environment.apiKeyUsplash +`&query=${city}`)
      .pipe(
        map((response: any) => response.results[0].urls.full),
        catchError(error => {
          console.error(error);
          return of(null);
        })
      );
  }

}