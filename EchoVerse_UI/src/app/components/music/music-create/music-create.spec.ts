import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicCreate } from './music-create';

describe('MusicCreate', () => {
  let component: MusicCreate;
  let fixture: ComponentFixture<MusicCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
