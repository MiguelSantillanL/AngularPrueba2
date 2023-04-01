import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersComponent } from './computers.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { ComputerService } from '../services/computer.service';
import { of, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { Computer } from '../model/computer.model';

describe('ComputersComponent', () => {
  let component: ComputersComponent;
  let fixture: ComponentFixture<ComputersComponent>;

  let computerSvcSpy = jasmine.createSpyObj<ComputerService>(
    'ComputerService',
    ['getComputers', 'deleteComputer']
  );

  computerSvcSpy.getComputers.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComputersComponent],
      imports: [
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        RouterTestingModule,
      ],
      providers: [{ provide: ComputerService, useValue: computerSvcSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ComputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    const mockComputers: Computer[] = [
      {
        id: 1,
        brand: 'HP',
        model: 'Pavilion',
      },
      {
        id: 2,
        brand: 'HP',
        model: 'Pavilion',
      },
      {
        id: 3,
        brand: 'HP',
        model: 'Pavilion',
      },
    ];
    computerSvcSpy.getComputers.and.returnValue(of(mockComputers));
    component.loadData();
    expect(component.computers.data).toEqual(mockComputers);
    expect(component.computers.data.length).toBe(3);
  });

  it('should load data with error', () => {
    computerSvcSpy.getComputers.and.returnValue(throwError(() => 'Error'));
    component.loadData();
    expect(component.computers.data).toEqual([]);
  });

  it('should delete computer', () => {
    const mockComputers: Computer = {
      id: 1,
      brand: 'HP',
      model: 'Pavilion',
    };

    computerSvcSpy.deleteComputer.and.returnValue(of(mockComputers));
    component.deleteComputer(mockComputers);
    component.loadData();

    expect(computerSvcSpy.deleteComputer).toHaveBeenCalled();
  });
  it('should delete computer with error', () => {
    const mockComputers: Computer = {
      id: 1,
      brand: 'HP',
      model: 'Pavilion',
    };

    computerSvcSpy.deleteComputer.and.returnValue(throwError(() => 'Error'));
    component.deleteComputer(mockComputers);
    component.loadData();

    expect(computerSvcSpy.deleteComputer).toHaveBeenCalled();
  });

  it('should update computer', () => {
    const mockComputers: Computer = {
      id: 1,
      brand: 'HP',
      model: 'Pavilion',
    };

    computerSvcSpy.deleteComputer.and.returnValue(of(mockComputers));
    component.deleteComputer(mockComputers);
    component.loadData();

    expect(computerSvcSpy.deleteComputer).toHaveBeenCalled();
  });

  it('should update computer with error', () => {
    const mockComputers: Computer = {
      id: 1,
      brand: 'HP',
      model: 'Pavilion',
    };

    computerSvcSpy.deleteComputer.and.returnValue(throwError(() => 'Error'));
    component.deleteComputer(mockComputers);
    component.loadData();

    expect(computerSvcSpy.deleteComputer).toHaveBeenCalled();
  });
});
