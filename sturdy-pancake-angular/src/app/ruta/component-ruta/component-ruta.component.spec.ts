import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COMPONENTRUTAComponent } from './component-ruta.component';

describe('COMPONENTRUTAComponent', () => {
  let component: COMPONENTRUTAComponent;
  let fixture: ComponentFixture<COMPONENTRUTAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [COMPONENTRUTAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(COMPONENTRUTAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
