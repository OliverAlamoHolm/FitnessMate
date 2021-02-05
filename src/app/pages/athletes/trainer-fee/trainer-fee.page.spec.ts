import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrainerFeePage } from './trainer-fee.page';

describe('TrainerFeePage', () => {
  let component: TrainerFeePage;
  let fixture: ComponentFixture<TrainerFeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerFeePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainerFeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
