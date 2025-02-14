import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraNagevationComponent } from './barra-nagevation.component';

describe('BarraNagevationComponent', () => {
  let component: BarraNagevationComponent;
  let fixture: ComponentFixture<BarraNagevationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraNagevationComponent]
    });
    fixture = TestBed.createComponent(BarraNagevationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
