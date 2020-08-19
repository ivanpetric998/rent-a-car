import { IFilter } from './../interfaces/IFilter';
import { IAutomobil } from './../interfaces/IAutomobil';
import { AutomobilService } from './../services/automobil.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-cars',
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.css']
})
export class AllCarsComponent implements OnInit {

  automobili: IAutomobil[];
  filterObj: IFilter = {grupeIds:[],menjacIds:[],gorivoIds:[]};
  sortNumber: number = 0;  

  constructor(private automobilService: AutomobilService) {}

  ngOnInit(): void {
    this.getAutomobile();
  }

  private getAutomobile(): void{
    this.automobilService.getAll().subscribe(
      (data: IAutomobil[]) => this.filtriranjeSortiranje(data),
      error => alert("An error has occured. Please contact support team. Error: " + error)
    );    
  }

  onFilterEvent(data: IFilter){
    this.filterObj = data;
    this.getAutomobile();
  }

  onSortEvent(sort: number){
    this.sortNumber = sort;
    this.getAutomobile();
  }

  private filtriranjeSortiranje(data: IAutomobil[]): void{
   
    this.automobili = this.sortiraj(this.filtrirajGrupe(this.filtrirajMenjace(this.filtrirajGoriva(data))),this.sortNumber);
   
  }

  private filtrirajGoriva(data: IAutomobil[]): IAutomobil[]{

    let ids = this.filterObj.gorivoIds;
    if(ids.length == 0) return data;
    return data.filter(auto => ids.includes(auto.gorivo.id));
    
  }

  private filtrirajMenjace(data: IAutomobil[]): IAutomobil[]{

    let ids = this.filterObj.menjacIds;
    if(ids.length == 0) return data;
    return data.filter(auto => ids.includes(auto.menjac.id));
    
  }

  private filtrirajGrupe(data: IAutomobil[]): IAutomobil[]{

    let ids = this.filterObj.grupeIds;
    if(ids.length == 0) return data;
    return data.filter(auto => ids.includes(auto.grupa.id));
    
  }

  private sortiraj(data: IAutomobil[], sort: number): IAutomobil[]{

    return data.sort(function(a,b){

      if(a.cena == b.cena) return 0;

      switch (sort) {
        case 1: return a.cena < b.cena ? -1 : 1;
        case 2: return a.cena > b.cena ? -1 : 1;
        default: break;
      }

    });
 
  }

}
