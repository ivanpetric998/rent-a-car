import { IAutomobil } from './../interfaces/IAutomobil';
import { AutomobilService } from './../services/automobil.service';
import { IRezervacija } from './../interfaces/IRezervacija';
import { RezervacijaService } from './../services/rezervacija.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  najTrazenijaVozila: IAutomobil[];

  constructor(private rezervacijaService: RezervacijaService, private autoService: AutomobilService) { }

  ngOnInit(): void {
    this.rezervacijaService.getAll().subscribe(
      (data: IRezervacija[]) => {
        
        let carIds = sortAndGetIds(groupAndCount(data));

        function groupAndCount(data: IRezervacija[]): {carId: number, value: number}[]{

          var map = data.reduce(function(sum, val) {
            sum[val.idAuto] = (sum[val.idAuto] || 0) + 1;
            return sum;
          },{});
  
          let ids = Object.keys(map);
          let values = Object.values(map);
  
          let obj: {carId: number, value: number}[] = [];
  
          for(let i = 0; i < ids.length; i++){
            obj.push({
              carId: +ids[i],
              value: +values[i]
            });
          }

          return obj;
        }

        function sortAndGetIds(obj: {carId: number, value: number}[]): number[]{
          obj.sort(function(x,y){
            if(x.value == y.value) return 0;
            return x.value > y.value ? -1 : 1;
          });
  
          let obj2 = [];
  
          for(let j = 0; j < 6; j++){
            obj2.push(obj[j]);
          }
  
          let finalyIds = [];
  
          obj2.forEach(x => finalyIds.push(x.carId));

          return finalyIds;
        }
        
        this.autoService.getAll().subscribe(
          (data: IAutomobil[]) => this.najTrazenijaVozila = this.autoService.getAutomobile(data,carIds),
          error => alert("An error has occured. Please contact support team. Error: " + error)
        );
        
      },
      error => alert("An error has occured. Please contact support team. Error: " + error)
    );
  }

}