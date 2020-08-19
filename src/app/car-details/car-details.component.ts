import { IAutomobil } from './../interfaces/IAutomobil';
import { AutomobilService } from './../services/automobil.service';
import { Subscription } from 'rxjs/';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit, OnDestroy {

  paramsSubscription: Subscription
  auto: IAutomobil;

  constructor(private autoService: AutomobilService, private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => this.loadData(params['id']));
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
      },
      error => alert("An error has occured. Please contact support team. Error: " + error)
    );
    
  }

  rezervacija(): void{
    this.router.navigate([`/rezervacija/${this.auto.id}`]);
  }
}
