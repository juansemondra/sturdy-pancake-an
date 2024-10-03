import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RutaComponent } from './ruta.component';
import { RutaService } from './ruta.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RutaComponent', () => {
  let component: RutaComponent;
  let fixture: ComponentFixture<RutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RutaComponent],
      providers: [RutaService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch rutas', () => {
    const service = TestBed.inject(RutaService);
    spyOn(service, 'getRutas').and.callThrough();
    component.getRutas();
    expect(service.getRutas).toHaveBeenCalled();
  });
});