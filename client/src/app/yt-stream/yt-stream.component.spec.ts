import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YtStreamComponent } from './yt-stream.component';

describe('YtStreamComponent', () => {
  let component: YtStreamComponent;
  let fixture: ComponentFixture<YtStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YtStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YtStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
