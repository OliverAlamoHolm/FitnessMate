import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DietplanModalPage } from './dietplan-modal.page';

describe('DietplanModalPage', () => {
  let component: DietplanModalPage;
  let fixture: ComponentFixture<DietplanModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietplanModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DietplanModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
