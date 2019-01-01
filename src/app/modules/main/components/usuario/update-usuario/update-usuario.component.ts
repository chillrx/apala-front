import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CrudService } from './../../../../shared/services/nodejs/crud.service';

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styleUrls: ['./update-usuario.component.css']
})
export class UpdateUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;

  constructor(
    private _crud: CrudService,
    public dialogRef: MatDialogRef<UpdateUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.usuarioForm = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),
      senha: new FormControl(null)
    });
  }

  ngOnInit() {
    if (this.data) this.usuarioForm.patchValue(this.data);
  }

  updateUsuario = () => {
    if (!this.data)
      return this._crud.create({
        route: 'usuarios/registrar',
        objectToCreate: this.usuarioForm.value
      }).then(res => {
        this.dialogRef.close(res);
      });
      
    this._crud.update({
      route: 'usuarios' + '/' + this.data.id, objectToUpdate: this.usuarioForm.value
    }).then(res => {
      this.dialogRef.close(res);
    });
  }

}
