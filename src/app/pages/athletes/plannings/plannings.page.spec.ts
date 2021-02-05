import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanningsPage } from './plannings.page';

describe('PlanningsPage', () => {
  let component: PlanningsPage;
  let fixture: ComponentFixture<PlanningsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanningsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
