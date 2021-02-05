import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientMessagingPage } from './client-messaging.page';

describe('ClientMessagingPage', () => {
  let component: ClientMessagingPage;
  let fixture: ComponentFixture<ClientMessagingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMessagingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientMessagingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
