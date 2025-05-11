import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmobilesPageComponent } from './immobiles-page.component';

describe('ImmobilesPageComponent', () => {
  let component: ImmobilesPageComponent;
  let fixture: ComponentFixture<ImmobilesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImmobilesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmobilesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
