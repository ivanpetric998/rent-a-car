import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormGroup,FormControl,} from '@angular/forms';

@Component({
  selector: 'app-sort-cars',
  templateUrl: './sort-cars.component.html',
  styleUrls: ['./sort-cars.component.css']
})
export class SortCarsComponent implements OnInit {

  @Output() sortEvent = new EventEmitter<number>();

  sortForm: FormGroup;

  constructor() {
    this.sortForm = new FormGroup({
      sort: new FormControl(0)
    });
   }

  ngOnInit(): void {
  }

  onChange(event: any): void{
    this.sortEvent.emit(+event.target.value);
  }

}
