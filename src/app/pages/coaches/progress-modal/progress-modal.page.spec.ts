import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProgressModalPage } from './progress-modal.page';

describe('ProgressModalPage', () => {
  let component: ProgressModalPage;
  let fixture: ComponentFixture<ProgressModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
