import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AthleteProfilePage } from './athlete-profile.page';

describe('AthleteProfilePage', () => {
  let component: AthleteProfilePage;
  let fixture: ComponentFixture<AthleteProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthleteProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AthleteProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
