import { CrudService } from './../../../../shared/services/nodejs/crud.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { TransformService } from 'src/app/modules/shared/services/transform.service';

@Component({
    selector: 'app-update-instituicao',
    templateUrl: './update-instituicao.component.html',
    styleUrls: ['./update-instituicao.component.css']
})
export class UpdateInstituicaoComponent implements OnInit {
    public instituicaoForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _crud: CrudService,
        public transform: TransformService,
        public dialogRef: MatDialogRef<UpdateInstituicaoComponent>,
        public snackbar: MatSnackBar
    ) {
        this.instituicaoForm = new FormGroup({
            titulo: new FormControl(null),
            descricao: new FormControl(null)
        });
    }

    ngOnInit() {
        if (this.data) this.instituicaoForm.patchValue(this.data);
    }

    addInstituicao = () => {
        this.dialogRef.close(true);

        if (!this.data)
            return this._crud.post('instituicao', this.instituicaoForm.value).then(res => {
                this.dialogRef.close(res);
                this.snackbar.open('Dados registrados com sucesso!', '', {
                    duration: 2000,
                    panelClass: ['success']
                })
            }, rej => this.snackbar.open('Erro ao registrar dados!', '', {
                duration: 2000,
                panelClass: ['error']
            }));

        this._crud.put('instituicao' + '/' + this.data.id, this.instituicaoForm.value).then(res => {
            this.dialogRef.close(res);
            this.snackbar.open('Dados alterados com sucesso!', '', {
                duration: 2000,
                panelClass: ['success']
            });
        }, rej => this.snackbar.open('Erro ao alterar dados!', '', {
            duration: 2000,
            panelClass: ['error']
        }));
    }

}
