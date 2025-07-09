import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPropiedadComponent } from './alta-propiedad.component';

describe('AltaPropiedadComponent', () => {
  let component: AltaPropiedadComponent;
  let fixture: ComponentFixture<AltaPropiedadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaPropiedadComponent]
    });
    fixture = TestBed.createComponent(AltaPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
