import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionBusRutaConductorComponent } from './relacion-bus-ruta-conductor.component';

describe('RelacionBusRutaConductorComponent', () => {
  let component: RelacionBusRutaConductorComponent;
  let fixture: ComponentFixture<RelacionBusRutaConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelacionBusRutaConductorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelacionBusRutaConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
