import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrainingplanModalPage } from './trainingplan-modal.page';

describe('TrainingplanModalPage', () => {
  let component: TrainingplanModalPage;
  let fixture: ComponentFixture<TrainingplanModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingplanModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingplanModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
