import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBusComponent } from './editar-bus.component';

describe('EditarBusComponent', () => {
  let component: EditarBusComponent;
  let fixture: ComponentFixture<EditarBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarBusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
