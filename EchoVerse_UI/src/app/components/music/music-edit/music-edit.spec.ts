import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicEdit } from './music-edit';

describe('MusicEdit', () => {
  let component: MusicEdit;
  let fixture: ComponentFixture<MusicEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
