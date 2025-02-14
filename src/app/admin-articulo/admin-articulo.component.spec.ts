import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticuloComponent } from './admin-articulo.component';

describe('AdminArticuloComponent', () => {
  let component: AdminArticuloComponent;
  let fixture: ComponentFixture<AdminArticuloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminArticuloComponent]
    });
    fixture = TestBed.createComponent(AdminArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
