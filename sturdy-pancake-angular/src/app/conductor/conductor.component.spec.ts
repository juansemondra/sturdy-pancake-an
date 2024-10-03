import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConductorComponent } from './conductor.component';
import { ConductorService } from './conductor.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConductorComponent', () => {
  let component: ConductorComponent;
  let fixture: ComponentFixture<ConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ConductorComponent],
      providers: [ConductorService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch conductores', () => {
    const service = TestBed.inject(ConductorService);
    spyOn(service, 'getConductores').and.callThrough();
    component.getConductores();
    expect(service.getConductores).toHaveBeenCalled();
  });
});