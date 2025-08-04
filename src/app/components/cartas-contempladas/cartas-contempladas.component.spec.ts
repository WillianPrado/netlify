import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartasContempladasComponent } from './cartas-contempladas.component';

describe('CartasContempladasComponent', () => {
  let component: CartasContempladasComponent;
  let fixture: ComponentFixture<CartasContempladasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartasContempladasComponent]
    });
    fixture = TestBed.createComponent(CartasContempladasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
