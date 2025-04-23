import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmobilesComponent } from './immobiles.component';

describe('ImmobilesComponent', () => {
  let component: ImmobilesComponent;
  let fixture: ComponentFixture<ImmobilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImmobilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmobilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
