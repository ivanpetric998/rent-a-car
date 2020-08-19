import { IPeriodIzdavanja } from './../interfaces/IPeriodIzdavanja';
import { IRezervacija } from './../interfaces/IRezervacija';
import { RezervacijaService } from './../services/rezervacija.service';
import { datumValidator, vremeValidator, dateCompererValidator, patternValidator } from 'src/app/helpers/validators';
import { getPeriodIzdavanjaLS, removeLS } from 'src/app/helpers/localstorage';
import { Subscription } from 'rxjs/';
import { IAutomobil } from './../interfaces/IAutomobil';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AutomobilService } from './../services/automobil.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup,FormControl, Validators,} from '@angular/forms';

@Component({
  selector: 'app-rezervacija',
  templateUrl: './rezervacija.component.html',
  styleUrls: ['./rezervacija.component.css']
})
export class RezervacijaComponent implements OnInit, OnDestroy {

  auto: IAutomobil;

  paramsSubscription: Subscription
  rezervacijaForm: FormGroup;
  
  zauzetAuto: boolean = false;
  submitovano: boolean = false;

  suma: number = 0;
  brojDana: number = 0;

  constructor(private autoService: AutomobilService, private router: Router, private route: ActivatedRoute,
    private rezervacijaService: RezervacijaService) {
      this.rezervacijaForm = new FormGroup({
        vremenskiPeriod: new FormGroup({
          datumOd: new FormControl(getPeriodIzdavanjaLS() ? getPeriodIzdavanjaLS().datumOd : null),
          vremeOd: new FormControl(getPeriodIzdavanjaLS() ? getPeriodIzdavanjaLS().vremeOd : "10:00"),
          datumDo: new FormControl(getPeriodIzdavanjaLS() ? getPeriodIzdavanjaLS().datumDo : null),
          vremeDo: new FormControl(getPeriodIzdavanjaLS() ? getPeriodIzdavanjaLS().vremeDo : "10:00")
        }),
        korisnik: new FormGroup({
          ime: new FormControl(null),
          prezime: new FormControl(null),
          email: new FormControl(null),
          brojDozvole: new FormControl(null),
          napomena: new FormControl(null)
        })
      });

      this.setValidators();
    }
    
  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => this.loadData(params['id']));
  }

  change(){

    if(this.rezervacijaForm.get('vremenskiPeriod').valid){
      this.calculateSum();
    }
    else{
      this.brojDana = 0;
      this.suma = 0;
    }
    
  }

  private calculateSum(){

    let datumOd = new Date(this.rezervacijaForm.get('vremenskiPeriod.datumOd').value);
    let datumDo = new Date(this.rezervacijaForm.get('vremenskiPeriod.datumDo').value);

    this.brojDana = getRazlikuDana(datumOd,datumDo);
    this.suma = this.brojDana * this.auto.cena;

    function getRazlikuDana(datum1, datum2): number{
      let d1 = <number>datum1.getTime();
      let d2 = <number>datum2.getTime();

      return (d2-d1)/(24*3600*1000);
    }
  }

  onSubmit(){

    this.submitovano = true;

    if(!this.rezervacijaForm.valid) return;
      
      this.rezervacijaService.getAll().subscribe(
        (data: IRezervacija[]) => {
          let period: IPeriodIzdavanja = {
              datumOd: this.rezervacijaForm.get('vremenskiPeriod.datumOd').value,
              datumDo: this.rezervacijaForm.get('vremenskiPeriod.datumDo').value,
              vremeOd: this.rezervacijaForm.get('vremenskiPeriod.vremeOd').value,
              vremeDo: this.rezervacijaForm.get('vremenskiPeriod.vremeDo').value
          }
          let slobodan = this.rezervacijaService.daLiJeSlobodanAuto(data,period,this.auto.id);
          
          if(slobodan){
            removeLS();
            alert("Uspešno ste rezervisali vozilo");
            this.router.navigate(['/']);
          }
          else{
            this.zauzetAuto = true;
          }
        },
        error => alert("An error has occured. Please contact support team. Error: " + error)
      );

    
  }

  ngOnDestroy(): void{
    this.paramsSubscription.unsubscribe();
  }

  private loadData(id: number): void{

    this.autoService.getAll().subscribe(
      (data: IAutomobil[]) => {
        let autoTmp = this.autoService.getOneAuto(data,id);

        if(autoTmp == null) this.router.navigate(['/404']);

        this.auto = autoTmp;

        if(getPeriodIzdavanjaLS()){
          this.calculateSum();
        }
      },
      error => alert("An error has occured. Please contact support team. Error: " + error)
    );
    
  }

  private setValidators(): void{

    this.rezervacijaForm.get('vremenskiPeriod.datumOd').setValidators([Validators.required, datumValidator]);
    this.rezervacijaForm.get('vremenskiPeriod.datumOd').updateValueAndValidity();

    this.rezervacijaForm.get('vremenskiPeriod.vremeOd').setValidators([Validators.required, vremeValidator]);
    this.rezervacijaForm.get('vremenskiPeriod.vremeOd').updateValueAndValidity();

    this.rezervacijaForm.get('vremenskiPeriod.datumDo').setValidators([Validators.required, datumValidator]);
    this.rezervacijaForm.get('vremenskiPeriod.datumDo').updateValueAndValidity();

    this.rezervacijaForm.get('vremenskiPeriod.vremeDo').setValidators([Validators.required, vremeValidator]);
    this.rezervacijaForm.get('vremenskiPeriod.vremeDo').updateValueAndValidity();

    this.rezervacijaForm.get('vremenskiPeriod').setValidators([dateCompererValidator]);
    this.rezervacijaForm.get('vremenskiPeriod').updateValueAndValidity();

    this.rezervacijaForm.get('korisnik.ime').setValidators([Validators.required, 
      patternValidator(/^[A-Z][a-z]{2,14}(\s[A-Z][a-z]{2,14})*$/)]);
    this.rezervacijaForm.get('korisnik.ime').updateValueAndValidity();

    this.rezervacijaForm.get('korisnik.prezime').setValidators([Validators.required, 
      patternValidator(/^[A-Z][a-z]{2,14}(\s[A-Z][a-z]{2,14})*$/)]);
    this.rezervacijaForm.get('korisnik.prezime').updateValueAndValidity();

    this.rezervacijaForm.get('korisnik.email').setValidators([Validators.required, Validators.email]);
    this.rezervacijaForm.get('korisnik.email').updateValueAndValidity();

    this.rezervacijaForm.get('korisnik.brojDozvole').setValidators([Validators.required, 
      patternValidator(/^\d{6,30}$/)]);
    this.rezervacijaForm.get('korisnik.brojDozvole').updateValueAndValidity();


  }

}
