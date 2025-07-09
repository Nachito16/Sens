import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaPropiedadComponent } from './baja-propiedad.component';

describe('BajaPropiedadComponent', () => {
  let component: BajaPropiedadComponent;
  let fixture: ComponentFixture<BajaPropiedadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BajaPropiedadComponent]
    });
    fixture = TestBed.createComponent(BajaPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
