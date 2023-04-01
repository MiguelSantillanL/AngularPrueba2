import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Computer } from '../model/computer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComputerService {
  constructor(private http: HttpClient) {}

  getComputers() {
    return this.http.get<Computer[]>('http://localhost:3000/computers');
  }

  getComputer(id: number) {
    return this.http.get<Computer>('http://localhost:3000/computers/' + id);
  }

  saveComputer(data: Computer) {
    return this.http.post('http://localhost:3000/computers', data);
  }

  deleteComputer(id: number) {
    return this.http.delete('http://localhost:3000/computers/' + id);
  }

  updateComputer(data: Computer) {
    return this.http.patch('http://localhost:3000/computers/' + data.id, data);
  }
}
