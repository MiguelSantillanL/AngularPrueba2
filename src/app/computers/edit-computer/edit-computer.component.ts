import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Computer } from 'src/app/model/computer.model';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit-computer.component.html',
  styleUrls: ['./edit-computer.component.css'],
})
export class EditComputerComponent {
  computerId: number = 0;
  formComputer?: FormGroup;
  computer?: Computer;

  constructor(
    private fb: FormBuilder,
    private computerSvc: ComputerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe({
      next: (params) => {
        this.computerId = params['id'];
        this.loadData();
      },
    });

    this.formComputer = this.fb.group({
      id: [this.computerId],
      brand: ['', [Validators.required]],
      model: ['', Validators.required],
    });
  }
  loadData() {
    this.computerSvc.getComputer(this.computerId).subscribe({
      next: (data) => {
        this.formComputer?.patchValue(data);
        this.computer = data;
      },
      error: () => {
        console.log('no fue posible obtener la información del computador');
      },
    });
  }

  updateComputer() {
    let data = this.formComputer?.value as Computer;
    this.computerSvc.updateComputer(data).subscribe({
      next: () => {
        this.router.navigate(['/computers']);
      },
      error: (err) => {
        alert('Lo sentimos ocurrió un error');
      },
    });
  }
}
