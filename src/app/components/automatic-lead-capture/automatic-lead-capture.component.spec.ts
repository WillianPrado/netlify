import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticLeadCaptureComponent } from './automatic-lead-capture.component';

describe('AutomaticLeadCaptureComponent', () => {
  let component: AutomaticLeadCaptureComponent;
  let fixture: ComponentFixture<AutomaticLeadCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomaticLeadCaptureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomaticLeadCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
