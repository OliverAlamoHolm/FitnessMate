import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyCoachPage } from './my-coach.page';

describe('MyCoachPage', () => {
  let component: MyCoachPage;
  let fixture: ComponentFixture<MyCoachPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCoachPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyCoachPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
