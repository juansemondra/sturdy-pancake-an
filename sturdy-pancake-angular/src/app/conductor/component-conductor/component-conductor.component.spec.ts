import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COMPONENTCONDUCTORComponent } from './component-conductor.component';

describe('COMPONENTCONDUCTORComponent', () => {
  let component: COMPONENTCONDUCTORComponent;
  let fixture: ComponentFixture<COMPONENTCONDUCTORComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [COMPONENTCONDUCTORComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(COMPONENTCONDUCTORComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
