import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MacrosModalPage } from './macros-modal.page';

describe('MacrosModalPage', () => {
  let component: MacrosModalPage;
  let fixture: ComponentFixture<MacrosModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacrosModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MacrosModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
