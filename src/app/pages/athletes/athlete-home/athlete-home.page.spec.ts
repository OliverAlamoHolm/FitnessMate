import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AthleteHomePage } from './athlete-home.page';

describe('AthleteHomePage', () => {
  let component: AthleteHomePage;
  let fixture: ComponentFixture<AthleteHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthleteHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AthleteHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
