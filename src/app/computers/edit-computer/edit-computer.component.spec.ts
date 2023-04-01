import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';

import { EditComputerComponent } from './edit-computer.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComputerService } from 'src/app/services/computer.service';
import { ActivatedRoute } from '@angular/router';
import { NEVER, of, throwError } from 'rxjs';
import { Computer } from 'src/app/model/computer.model';
import { Router } from '@angular/router';

describe('EditComputerComponent', () => {
  let component: EditComputerComponent;
  let fixture: ComponentFixture<EditComputerComponent>;

  let computerSvcSpy = jasmine.createSpyObj<ComputerService>(
    'ComputerService',
    ['getComputer', 'updateComputer']
  );

  let activatedRouteSpy = jasmine.createSpyObj<ActivatedRoute>(
    'ActivatedRoute',
    ['params']
  );

  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

  activatedRouteSpy.params = NEVER;

  beforeEach(async () => {
    activatedRouteSpy.params = of({ id: 1 });
    await TestBed.configureTestingModule({
      declarations: [EditComputerComponent],
      imports: [
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ComputerService, useValue: computerSvcSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    const mockComputer: Computer = {
      id: 1,
      brand: 'HP',
      model: 'Pavilion',
    };

    computerSvcSpy.getComputer.and.returnValue(of(mockComputer));

    component.loadData();

    expect(component.computer).toEqual(mockComputer);
  });

  it('should load data with error', () => {
    computerSvcSpy.getComputer.and.returnValue(
      throwError(() => {
        'error to load data';
      })
    );

    component.loadData();

    expect(component.computer).toBeUndefined();
  });

  it('should update computer', () => {
    const mockComputer: Computer = {
      id: 1,
      brand: 'HP',
      model: 'Pavilion',
    };

    computerSvcSpy.updateComputer.and.returnValue(of(mockComputer));
    component.updateComputer();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/computers']);
  });

  it('should update computer with error', () => {
    const mockComputer: Computer = {
      id: 1,
      brand: 'HP',
      model: 'Pavilion',
    };

    computerSvcSpy.updateComputer.and.returnValue(
      throwError(() => {
        'error to update computer';
      })
    );

    component.updateComputer();
    expect(routerSpy.navigate).not.toHaveBeenCalledWith(['/computers']);
  });
});
