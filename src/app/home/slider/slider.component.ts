import { ISlajder } from './../../interfaces/ISlajder';
import { SlajderService } from './../../services/slajder.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('0ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SliderComponent implements OnInit {

  currentPosition: number = 0;
  images: ISlajder[];

  constructor(private slajderService: SlajderService) { }

  ngOnInit(): void {
    this.slajderService.getAll().subscribe(
      (data: ISlajder[]) => this.images = data,
      error => alert("An error has occured. Please contact support team. Error: " + error)
    );
  }

  next(): void{
    const next = this.currentPosition + 1;
    this.currentPosition = next === this.images.length ? 0 : next;
  }

  prev(): void{
    const previous = this.currentPosition - 1;
    this.currentPosition = previous < 0 ? this.images.length - 1 : previous;
  }

}
