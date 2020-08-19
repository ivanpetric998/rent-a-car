import { JsonPaths } from './../helpers/json_paths';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrupaService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(JsonPaths.grupa);
  }
}
