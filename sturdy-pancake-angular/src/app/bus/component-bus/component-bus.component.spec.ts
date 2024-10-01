import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COMPONENTBUSComponent } from './component-bus.component';

describe('COMPONENTBUSComponent', () => {
  let component: COMPONENTBUSComponent;
  let fixture: ComponentFixture<COMPONENTBUSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [COMPONENTBUSComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(COMPONENTBUSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
