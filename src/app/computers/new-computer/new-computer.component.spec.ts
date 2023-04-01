import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComputerComponent } from './new-computer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComputerService } from 'src/app/services/computer.service';
import { of, throwError } from 'rxjs';
import { Computer } from 'src/app/model/computer.model';
import { Router } from '@angular/router';

describe('NewComputerComponent', () => {
  let component: NewComputerComponent;
  let fixture: ComponentFixture<NewComputerComponent>;

  let computerSvcSpy = jasmine.createSpyObj<ComputerService>(
    'ComputerService',
    ['saveComputer']
  );

  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewComputerComponent],
      imports: [
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ComputerService, useValue: computerSvcSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save computer', () => {
    const mockComputer: Computer = {
      id: 1,
      brand: 'HP',
      model: 'Pavilion',
    };

    computerSvcSpy.saveComputer.and.returnValue(of(mockComputer));

    component.saveComputer();

    expect(computerSvcSpy.saveComputer).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/computers']);
  });

  it('should save computer with error', () => {
    const mockComputer: Computer = {
      id: 1,
      brand: 'HP',
      model: 'Pavilion',
    };

    computerSvcSpy.saveComputer.and.returnValue(
      throwError(() => 'error to save computer')
    );

    component.saveComputer();

    expect(computerSvcSpy.saveComputer).toHaveBeenCalled();
  });
});
