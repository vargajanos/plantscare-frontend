import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsNewComponent } from './plants-new.component';

describe('PlantsNewComponent', () => {
  let component: PlantsNewComponent;
  let fixture: ComponentFixture<PlantsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantsNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
