import { MeniService } from './../services/meni.service';
import { Component, OnInit } from '@angular/core';
import { IMeni } from '../interfaces/IMeni';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  meni: IMeni[];

  constructor(private meniService:MeniService) { }

  ngOnInit(): void {
    this.meniService.getAll().subscribe(
      (data: IMeni[]) => this.meni = data,
      error => alert("An error has occured. Please contact support team. Error: " + error)
    );
  }

}
