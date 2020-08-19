import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './home/slider/slider.component';
import { AdvanceSearchComponent } from './home/advance-search/advance-search.component';
import { BackgroundHeaderComponent } from './background-header/background-header.component';
import { AllCarsComponent } from './all-cars/all-cars.component';
import { SortCarsComponent } from './all-cars/sort-cars/sort-cars.component';
import { FilterCarsComponent } from './all-cars/filter-cars/filter-cars.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { OneCarComponent } from './one-car/one-car.component';
import { ServisiComponent } from './home/servisi/servisi.component';
import { SlobodniAutomobiliComponent } from './slobodni-automobili/slobodni-automobili.component';
import { RezervacijaComponent } from './rezervacija/rezervacija.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { ONamaComponent } from './o-nama/o-nama.component';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    SliderComponent,
    AdvanceSearchComponent,
    BackgroundHeaderComponent,
    AllCarsComponent,
    SortCarsComponent,
    FilterCarsComponent,
    NotFoundComponent,
    CarDetailsComponent,
    OneCarComponent,
    ServisiComponent,
    SlobodniAutomobiliComponent,
    RezervacijaComponent,
    KontaktComponent,
    ONamaComponent,
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
