import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MikroblogComponent } from './mikroblog.component';

describe('HomepageComponent', () => {
  let component: MikroblogComponent;
  let fixture: ComponentFixture<MikroblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MikroblogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MikroblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
