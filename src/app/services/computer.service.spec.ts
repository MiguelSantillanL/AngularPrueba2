import { TestBed, inject } from '@angular/core/testing';

import { ComputerService } from './computer.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { Computer } from '../model/computer.model';

describe('ComputerService', () => {
  let service: ComputerService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ComputerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should http get ok computers', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.getComputers();

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next: (val) => {
          expect(val).toBeDefined();
          expect(val.length).toBe(1);
          const first = val[0];
          expect(first.id).toBe(1);
          expect(first.brand).toBe('HP');
          expect(first.model).toBe('Pavilion');
        },
      });

      const request = httpMock.expectOne('http://localhost:3000/computers');
      expect(request.request.method).toBe('GET');

      request.flush([
        {
          id: 1,
          brand: 'HP',
          model: 'Pavilion',
        },
      ]);
    }
  ));

  it('should http get error computers', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.getComputers();

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('computers not found');
        },
      });

      const request = httpMock.expectOne('http://localhost:3000/computers');
      expect(request.request.method).toBe('GET');

      request.error(new ErrorEvent('computers not found'));
    }
  ));

  it('should http save ok', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp: Computer = {
        brand: 'HP',
        model: 'Pavilion',
      } as Computer;
      const obs = service.saveComputer(comp);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next: (val) => {
          expect(val).toBeDefined();
        },
      });

      const request = httpMock.expectOne('http://localhost:3000/computers');
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(comp);

      request.flush({});
    }
  ));

  it('should http save with error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp = {
        id: 1,
        brand: 'HP',
        model: 'Pavilion',
      } as Computer;

      const obs = service.saveComputer(comp);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('error saving computer');
        },
      });

      const request = httpMock.expectOne('http://localhost:3000/computers');
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(comp);

      request.error(new ErrorEvent('error saving computer'));
    }
  ));

  it('should http patch ok', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp = {
        id: 1,
        brand: 'apple',
        model: 'macbook',
      } as Computer;

      const obs = service.updateComputer(comp);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next: (val) => {
          expect(val).toBeDefined();
        },
      });

      const request = httpMock.expectOne(
        'http://localhost:3000/computers/' + comp.id
      );

      expect(request.request.method).toBe('PATCH');
      expect(request.request.body).toEqual(comp);

      request.flush({});
    }
  ));

  it('hould http patch error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp = {
        id: 1,
        brand: 'apple',
        model: 'macbook',
      } as Computer;
      const obs = service.updateComputer(comp);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('error updating computer');
        },
      });

      const request = httpMock.expectOne(
        'http://localhost:3000/computers/' + comp.id
      );
      expect(request.request.method).toBe('PATCH');
      expect(request.request.body).toEqual(comp);

      request.error(new ErrorEvent('error updating computer'));
    }
  ));

  it('should http get using id ok', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp: Computer = {
        id: 1,
        brand: 'HP',
        model: 'Pavilion',
      };

      const obs = service.getComputer(comp.id);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next: (val) => {
          expect(val).toBeDefined();
          expect(val.id).toBe(comp.id);
          expect(val.brand).toBe('HP');
          expect(val.model).toBe('Pavilion');
        },
      });

      const request = httpMock.expectOne(
        'http://localhost:3000/computers/' + comp.id
      );
      expect(request.request.method).toBe('GET');

      request.flush(comp);
    }
  ));

  it('should http get using id error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp: Computer = {
        id: 1,
        brand: '',
        model: '',
      };
      const obs = service.getComputer(comp.id);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('computer not found');
        },
      });

      const request = httpMock.expectOne(
        'http://localhost:3000/computers/' + comp.id
      );
      expect(request.request.method).toBe('GET');

      request.error(new ErrorEvent('computer not found'));
    }
  ));

  it('should http delete ok', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp: Computer = {
        id: 1,
        brand: '',
        model: '',
      };
      const obs = service.deleteComputer(comp.id);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next: (val) => {
          expect(val).toBeDefined();
        },
      });

      const request = httpMock.expectOne(
        'http://localhost:3000/computers/' + comp.id
      );
      expect(request.request.method).toBe('DELETE');

      request.flush({});
    }
  ));

  it('should http delete error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp: Computer = {
        id: 1,
        brand: '',
        model: '',
      };
      const obs = service.deleteComputer(comp.id);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('error deleting computer');
        },
      });

      const request = httpMock.expectOne(
        'http://localhost:3000/computers/' + comp.id
      );
      expect(request.request.method).toBe('DELETE');

      request.error(new ErrorEvent('error deleting computer'));
    }
  ));
});
