import { getPeriodIzdavanjaLS } from 'src/app/helpers/localstorage';
import { IAutomobil } from './../interfaces/IAutomobil';
import { AutomobilService } from './../services/automobil.service';
import { IRezervacija } from './../interfaces/IRezervacija';
import { RezervacijaService } from './../services/rezervacija.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slobodni-automobili',
  templateUrl: './slobodni-automobili.component.html',
  styleUrls: ['./slobodni-automobili.component.css']
})
export class SlobodniAutomobiliComponent implements OnInit {

  automobili: IAutomobil[];

  constructor(private router: Router, private rezervacijaService: RezervacijaService, private autoService: AutomobilService) {
    if(getPeriodIzdavanjaLS() == null) this.router.navigate(['/404']);
   }

  ngOnInit(): void {
    this.rezervacijaService.getAll().subscribe(
      (data: IRezervacija[]) => 
      this.getAutomobile(this.autoService.getZauzeteAutomobile(data, getPeriodIzdavanjaLS())),
      error => alert("An error has occured. Please contact support team. Error: " + error)
    );    
  }

  private getAutomobile(ids: number[]): void{
    this.autoService.getAll().subscribe(
      (data: IAutomobil[]) => this.automobili = this.autoService.getSlobodneAutomobile(data, ids),
      error => alert("An error has occured. Please contact support team. Error: " + error)
    );    
  }

}
