import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlobodniAutomobiliComponent } from './slobodni-automobili.component';

describe('SlobodniAutomobiliComponent', () => {
  let component: SlobodniAutomobiliComponent;
  let fixture: ComponentFixture<SlobodniAutomobiliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlobodniAutomobiliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlobodniAutomobiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
