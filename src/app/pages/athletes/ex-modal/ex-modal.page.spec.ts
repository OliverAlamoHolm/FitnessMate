import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExModalPage } from './ex-modal.page';

describe('ExModalPage', () => {
  let component: ExModalPage;
  let fixture: ComponentFixture<ExModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
