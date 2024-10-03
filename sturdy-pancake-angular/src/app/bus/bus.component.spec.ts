import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusComponent } from './bus.component';
import { BusService } from './bus.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BusComponent', () => {
  let component: BusComponent;
  let fixture: ComponentFixture<BusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BusComponent],
      providers: [BusService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch buses', () => {
    const service = TestBed.inject(BusService);
    spyOn(service, 'getBuses').and.callThrough();
    component.getBuses();
    expect(service.getBuses).toHaveBeenCalled();
  });
});