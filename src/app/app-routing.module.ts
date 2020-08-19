import { ONamaComponent } from './o-nama/o-nama.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { RezervacijaComponent } from './rezervacija/rezervacija.component';
import { SlobodniAutomobiliComponent } from './slobodni-automobili/slobodni-automobili.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AllCarsComponent } from './all-cars/all-cars.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path : "",
    component : HomeComponent
  },
  {
    path : "cars",
    component : AllCarsComponent
  },
  {
    path : "cars/:id",
    component : CarDetailsComponent
  },
  {
    path : "slobodni-automobili",
    component : SlobodniAutomobiliComponent
  },
  {
    path : "rezervacija/:id",
    component : RezervacijaComponent
  },
  {
    path : "kontakt",
    component : KontaktComponent
  },
  {
    path : "o-nama",
    component : ONamaComponent
  },
  {
    path : "404",
    component : NotFoundComponent
  },
  {
    path : "**",
    redirectTo : "/404"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
