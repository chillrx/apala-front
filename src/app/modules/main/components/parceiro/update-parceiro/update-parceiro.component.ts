import { CrudService } from './../../../../shared/services/nodejs/crud.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-update-parceiro',
    templateUrl: './update-parceiro.component.html',
    styleUrls: ['./update-parceiro.component.css']
})
export class UpdateParceiroComponent implements OnInit {
    public parceiroForm: FormGroup;

    constructor(
        private _crud: CrudService,
        public dialogRef: MatDialogRef<UpdateParceiroComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public snackbar: MatSnackBar
    ) {
        this.parceiroForm = new FormGroup({
            nome: new FormControl(null),
            posicao: new FormControl(null),
            site: new FormControl(null),
            foto: new FormControl(null)
        });
    }

    ngOnInit() {
        if (this.data) this.parceiroForm.patchValue(this.data);
    }

    addParceiro = () => {
        if (!this.data)
            return this._crud.post('parceiro', this.parceiroForm.value)
                .then(res => {
                    this.dialogRef.close(res);
                    this.snackbar.open('Dados registrados com sucesso!', '', {
                        duration: 2000,
                        panelClass: ['success']
                    })
                }, rej => this.snackbar.open('Erro ao registrar dados!', '', {
                    duration: 2000,
                    panelClass: ['error']
                }));

        this._crud.put('parceiro' + '/' + this.data.id, this.parceiroForm.value)
            .then(res => {
                this.dialogRef.close(res);
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
