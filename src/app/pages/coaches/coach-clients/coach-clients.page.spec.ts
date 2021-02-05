import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoachClientsPage } from './coach-clients.page';

describe('CoachClientsPage', () => {
  let component: CoachClientsPage;
  let fixture: ComponentFixture<CoachClientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachClientsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachClientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
