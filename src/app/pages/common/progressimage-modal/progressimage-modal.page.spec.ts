import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProgressimageModalPage } from './progressimage-modal.page';

describe('ProgressimageModalPage', () => {
  let component: ProgressimageModalPage;
  let fixture: ComponentFixture<ProgressimageModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressimageModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressimageModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
