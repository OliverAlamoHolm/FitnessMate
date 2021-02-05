import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoachMessagingPage } from './coach-messaging.page';

describe('CoachMessagingPage', () => {
  let component: CoachMessagingPage;
  let fixture: ComponentFixture<CoachMessagingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachMessagingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachMessagingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
