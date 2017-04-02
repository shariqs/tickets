import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedMenuComponent } from './purchased-menu.component';

describe('PurchasedMenuComponent', () => {
  let component: PurchasedMenuComponent;
  let fixture: ComponentFixture<PurchasedMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
