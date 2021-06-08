import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DevicealertPage } from './devicealert.page';

describe('DevicealertPage', () => {
  let component: DevicealertPage;
  let fixture: ComponentFixture<DevicealertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicealertPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DevicealertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
