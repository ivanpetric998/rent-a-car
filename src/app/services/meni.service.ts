import { JsonPaths } from './../helpers/json_paths';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeniService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(JsonPaths.meni);
  }
}
