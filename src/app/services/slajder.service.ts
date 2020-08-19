import { JsonPaths } from './../helpers/json_paths';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlajderService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(JsonPaths.slajder);
  }
}
