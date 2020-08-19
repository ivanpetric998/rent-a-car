import { IAutomobil } from './../interfaces/IAutomobil';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-one-car',
  templateUrl: './one-car.component.html',
  styleUrls: ['./one-car.component.css']
})
export class OneCarComponent implements OnInit {

  @Input() automobilData:IAutomobil;

  constructor() { }

  ngOnInit(): void {
  }

}
