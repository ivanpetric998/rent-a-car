import { IDrustveneMreze } from './../interfaces/IDrustveneMreze';
import { IMeni } from './../interfaces/IMeni';
import { MeniService } from './../services/meni.service';
import { DrustveneMrezeService } from './../services/drustvene-mreze.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  meni: IMeni[];
  drustveneMreze: IDrustveneMreze[];

  constructor(private drustvemeMrezeService: DrustveneMrezeService, private meniService: MeniService) { }

  ngOnInit(): void {
    this.loadMeni();
    this.loadDrustveneMreze();
  }

  private loadMeni(): void{
    this.meniService.getAll().subscribe(
      (data: IMeni[]) => this.meni = data,
      error => alert("An error has occured. Please contact support team. Error: " + error)
    );
  }

  private loadDrustveneMreze(): void{
    this.drustvemeMrezeService.getAll().subscribe(
      (data: IDrustveneMreze[]) => this.drustveneMreze = data,
      error => alert("An error has occured. Please contact support team. Error: " + error)
    );
  }
}
