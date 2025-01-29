import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularLanceComponent } from './calcular-lance.component';

describe('CalcularLanceComponent', () => {
  let component: CalcularLanceComponent;
  let fixture: ComponentFixture<CalcularLanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcularLanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcularLanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
