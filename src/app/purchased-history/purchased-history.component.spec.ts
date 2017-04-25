import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedHistoryComponent } from './purchased-history.component';

describe('PurchasedHistoryComponent', () => {
  let component: PurchasedHistoryComponent;
  let fixture: ComponentFixture<PurchasedHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
