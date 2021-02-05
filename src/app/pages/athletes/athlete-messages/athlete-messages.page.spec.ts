import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AthleteMessagesPage } from './athlete-messages.page';

describe('AthleteMessagesPage', () => {
  let component: AthleteMessagesPage;
  let fixture: ComponentFixture<AthleteMessagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthleteMessagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AthleteMessagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
