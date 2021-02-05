import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeCoachPage } from './home-coach.page';

describe('HomeCoachPage', () => {
  let component: HomeCoachPage;
  let fixture: ComponentFixture<HomeCoachPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCoachPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeCoachPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
