import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeeModalPage } from './fee-modal.page';

describe('FeeModalPage', () => {
  let component: FeeModalPage;
  let fixture: ComponentFixture<FeeModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
