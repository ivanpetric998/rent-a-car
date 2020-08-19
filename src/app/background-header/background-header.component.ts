import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-background-header',
  templateUrl: './background-header.component.html',
  styleUrls: ['./background-header.component.css']
})
export class BackgroundHeaderComponent implements OnInit {

  title: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    const vozniPark = new RegExp(`^\/cars$`);
    const detaljiOAutomobilu = new RegExp(`^\/cars\/[0-9]*$`);
    const slobodniAutomobili = new RegExp(`^\/slobodni-automobili$`);
    const rezervacija = new RegExp(`^\/rezervacija\/[0-9]*$`);
    const kontakt = new RegExp(`^\/kontakt$`);
    const oNama = new RegExp(`^\/o\-nama$`);
    const notFound = new RegExp(`^\/404$`);

    if(vozniPark.test(this.router.url)) this.title = "Vozni park";
    if(detaljiOAutomobilu.test(this.router.url)) this.title = "Detalji o automobilu";
    if(slobodniAutomobili.test(this.router.url)) this.title = "Slobodni automobili";
    if(rezervacija.test(this.router.url)) this.title = "Rezervacija automobila";
    if(kontakt.test(this.router.url)) this.title = "Kontakt";
    if(oNama.test(this.router.url)) this.title = "O nama";
    if(notFound.test(this.router.url)) this.title = "404";
    
  }

}
