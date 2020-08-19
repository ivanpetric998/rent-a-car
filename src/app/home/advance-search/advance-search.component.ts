import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { getPeriodIzdavanjaLS, setPeriodIzdavanjaLS } from 'src/app/helpers/localstorage';
import { datumValidator, vremeValidator, dateCompererValidator } from 'src/app/helpers/validators';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css']
})
export class AdvanceSearchComponent implements OnInit {

  advanceSearchForm: FormGroup;

  constructor(private router: Router) { 
    this.advanceSearchForm = new FormGroup({
      "datumOd" : new FormControl(getPeriodIzdavanjaLS() ? getPeriodIzdavanjaLS().datumOd : null, []),
      "vremeOd" : new FormControl(getPeriodIzdavanjaLS() ? getPeriodIzdavanjaLS().vremeOd : "10:00", []),
      "datumDo" : new FormControl(getPeriodIzdavanjaLS() ? getPeriodIzdavanjaLS().datumDo : null, []),
      "vremeDo" : new FormControl(getPeriodIzdavanjaLS() ? getPeriodIzdavanjaLS().vremeDo : "10:00", [])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){

    this.setValidators();

    if(this.advanceSearchForm.valid){
      
      setPeriodIzdavanjaLS({
        datumOd: this.advanceSearchForm.value.datumOd,
        vremeOd: this.advanceSearchForm.value.vremeOd,
        datumDo: this.advanceSearchForm.value.datumDo,
        vremeDo: this.advanceSearchForm.value.vremeDo
      });

      this.router.navigate(['/slobodni-automobili']);

    }

  }

  private setValidators(): void{
    this.advanceSearchForm.get('datumOd').setValidators([Validators.required, datumValidator]);
    this.advanceSearchForm.get('datumOd').updateValueAndValidity();

    this.advanceSearchForm.get('vremeOd').setValidators([Validators.required, vremeValidator]);
    this.advanceSearchForm.get('vremeOd').updateValueAndValidity();

    this.advanceSearchForm.get('datumDo').setValidators([Validators.required, datumValidator]);
    this.advanceSearchForm.get('datumDo').updateValueAndValidity();

    this.advanceSearchForm.get('vremeDo').setValidators([Validators.required, vremeValidator]);
    this.advanceSearchForm.get('vremeDo').updateValueAndValidity();

    this.advanceSearchForm.setValidators([dateCompererValidator]);
    this.advanceSearchForm.updateValueAndValidity();
    
  }

}