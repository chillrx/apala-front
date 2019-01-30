import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
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
        @Inject(MAT_DIALOG_DATA) public data: any,
        public snackbar: MatSnackBar
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
        this.dialogRef.close(true);
        if (!this.data)
            return this._crud.post('usuarios/registrar', this.usuarioForm.value).then(res => {
                this.snackbar.open('Dados registrados com sucesso!', '', {
                    duration: 2000,
                    panelClass: ['success']
                })
            }, rej => this.snackbar.open('Erro ao registrar dados!', '', {
                duration: 2000,
                panelClass: ['error']
            }));

        this._crud.put('usuarios' + '/' + this.data.id, this.usuarioForm.value).then(res => {

            this.snackbar.open('Dados alterados com sucesso!', '', {
                duration: 2000,
                panelClass: ['success']
            })
        }, rej => this.snackbar.open('Erro ao alterar dados!', '', {
            duration: 2000,
            panelClass: ['error']
        }));
    }

}
