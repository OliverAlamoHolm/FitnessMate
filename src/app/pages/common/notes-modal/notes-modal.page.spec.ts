import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotesModalPage } from './notes-modal.page';

describe('NotesModalPage', () => {
  let component: NotesModalPage;
  let fixture: ComponentFixture<NotesModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
