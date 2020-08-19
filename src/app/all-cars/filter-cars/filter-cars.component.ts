import { IFilter } from './../../interfaces/IFilter';
import { GorivoService } from './../../services/gorivo.service';
import { MenjacService } from './../../services/menjac.service';
import { IGorivo } from './../../interfaces/IGorivo';
import { IMenjac } from './../../interfaces/IMenjac';
import { IGrupa } from './../../interfaces/IGrupa';
import { GrupaService } from './../../services/grupa.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormGroup,FormArray,FormControl,} from '@angular/forms';

@Component({
  selector: 'app-filter-cars',
  templateUrl: './filter-cars.component.html',
  styleUrls: ['./filter-cars.component.css']
})
export class FilterCarsComponent implements OnInit {

  @Output() filterEvent = new EventEmitter<IFilter>();

  filterForm: FormGroup;
  grupe: IGrupa[];
  menjac: IMenjac[];
  gorivo: IGorivo[];

  get grupaFormArray() {
    return this.filterForm.controls.grupe as FormArray;
  }

  get menjacFormArray() {
    return this.filterForm.controls.menjac as FormArray;
  }

  get gorivoFormArray() {
    return this.filterForm.controls.gorivo as FormArray;
  }

  constructor(private grupaService : GrupaService, private menjacService: MenjacService, private gorivoService: GorivoService) { 
    this.filterForm = new FormGroup({
      grupe: new FormArray([]),
      menjac: new FormArray([]),
      gorivo: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.getGrupeIzServisa();
    this.getMenjacIzServisa();
    this.getGorivoIzServisa();
  }

  onSubmit(){

      const grupeIds = this.filterForm.value.grupe
        .map((checked, i) => checked ? this.grupe[i].id : null)
        .filter(v => v !== null);

      const menjacIds = this.filterForm.value.menjac
        .map((checked, i) => checked ? this.menjac[i].id : null)
        .filter(v => v !== null);

      const gorivoIds = this.filterForm.value.gorivo
        .map((checked, i) => checked ? this.gorivo[i].id : null)
        .filter(v => v !== null);

      this.filterEvent.emit({
        grupeIds : grupeIds,
        menjacIds : menjacIds,
        gorivoIds : gorivoIds
      });

  }

  private getGrupeIzServisa(): void{
    this.grupaService.getAll().subscribe(
      (data: IGrupa[]) => {
        this.grupe = data;
        this.grupe.forEach(() => this.grupaFormArray.push(new FormControl(false)));
      },
      error => alert("An error has occured. Please contact support team. Error: " + error)
    );    
  }

  private getMenjacIzServisa(): void{
    this.menjacService.getAll().subscribe(
      (data: IMenjac[]) => {
        this.menjac = data;
        this.menjac.forEach(() => this.menjacFormArray.push(new FormControl(false)));
      },
      error => alert("An error has occured. Please contact support team. Error: " + error)
    );    
  }

  private getGorivoIzServisa(): void{
    this.gorivoService.getAll().subscribe(
      (data: IGorivo[]) => {
        this.gorivo = data;
        this.gorivo.forEach(() => this.gorivoFormArray.push(new FormControl(false)));
      },
      error => alert("An error has occured. Please contact support team. Error: " + error)
    );    
  }

}
