import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.css']
})
export class KontaktComponent implements OnInit {

  contactForm: FormGroup;
  poslato: boolean = false;

  constructor() {
    this.contactForm = new FormGroup({
      "email" : new FormControl(null),
      "subject" : new FormControl(null),
      "message" : new FormControl(null)
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){

    this.setValidators();

    if(this.contactForm.valid){
      this.poslato = true;
    }

  }

  private setValidators(): void{

    this.contactForm.get('email').setValidators([Validators.required, Validators.email]);
    this.contactForm.get('email').updateValueAndValidity();

    this.contactForm.get('subject').setValidators([Validators.required]);
    this.contactForm.get('subject').updateValueAndValidity();

    this.contactForm.get('message').setValidators([Validators.required]);
    this.contactForm.get('message').updateValueAndValidity();

  }

}
