import { IServis } from './../../interfaces/IServis';
import { ServisiService } from './../../services/servisi.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servisi',
  templateUrl: './servisi.component.html',
  styleUrls: ['./servisi.component.css']
})
export class ServisiComponent implements OnInit {

  servisi: IServis[];

  constructor(private servisiService: ServisiService) { }

  ngOnInit(): void {
    this.servisiService.getAll().subscribe(
      (data: IServis[]) => this.servisi = data,
      error => alert("An error has occured. Please contact support team. Error: " + error)
    );    
  }

}
