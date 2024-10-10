import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearBusComponent } from './crear-bus.component';

describe('CrearBusComponent', () => {
  let component: CrearBusComponent;
  let fixture: ComponentFixture<CrearBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearBusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
