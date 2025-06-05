import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WateringsNewComponent } from './waterings-new.component';

describe('WateringsNewComponent', () => {
  let component: WateringsNewComponent;
  let fixture: ComponentFixture<WateringsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WateringsNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WateringsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
