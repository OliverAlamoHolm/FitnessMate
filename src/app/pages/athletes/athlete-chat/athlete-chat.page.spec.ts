import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AthleteChatPage } from './athlete-chat.page';

describe('AthleteChatPage', () => {
  let component: AthleteChatPage;
  let fixture: ComponentFixture<AthleteChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthleteChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AthleteChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
