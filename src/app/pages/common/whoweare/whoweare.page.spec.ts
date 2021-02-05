import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WhowearePage } from './whoweare.page';

describe('WhowearePage', () => {
  let component: WhowearePage;
  let fixture: ComponentFixture<WhowearePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhowearePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WhowearePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
