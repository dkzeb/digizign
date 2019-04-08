import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesScreenComponent } from './slides-screen.component';

describe('SlidesScreenComponent', () => {
  let component: SlidesScreenComponent;
  let fixture: ComponentFixture<SlidesScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidesScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
