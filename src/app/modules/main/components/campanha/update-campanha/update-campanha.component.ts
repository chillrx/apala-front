import { CrudService } from './../../../../shared/services/nodejs/crud.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { TransformService } from 'src/app/modules/shared/services/transform.service';

@Component({
    selector: 'app-update-campanha',
    templateUrl: './update-campanha.component.html',
    styleUrls: ['./update-campanha.component.css']
})
export class UpdateCampanhaComponent implements OnInit {
    public campanhaForm: FormGroup;
    public dateAndHour = [/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];

    constructor(
        private _crud: CrudService,
        public transform: TransformService,
        public dialogRef: MatDialogRef<UpdateCampanhaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public snackbar: MatSnackBar
    ) {
        this.campanhaForm = new FormGroup({
            titulo: new FormControl(null),
            inicio: new FormControl(null),
            fim: new FormControl(null),
            descricao: new FormControl(null),
            imagem: new FormControl(null)
        });
    }

    ngOnInit() {
        if (this.data) {
            this.data.inicio = this.transform.dateConversion(this.data.inicio);
            this.data.fim = this.transform.dateConversion(this.data.fim);
            this.campanhaForm.patchValue(this.data);
        }
    }

    addCampanha = () => {
        this.campanhaForm.value.inicio = this.campanhaForm.value.inicio.split('/')[1] + '/' + this.campanhaForm.value.inicio.split('/')[0] +
            '/' + this.campanhaForm.value.inicio.split('/')[2];

        this.campanhaForm.value.fim = this.campanhaForm.value.fim.split('/')[1] + '/' + this.campanhaForm.value.fim.split('/')[0] +
            '/' + this.campanhaForm.value.fim.split('/')[2];

        this.dialogRef.close(true);

        if (!this.data)
            return this._crud.post('campanha', this.campanhaForm.value).then(res => {
                this.snackbar.open('Dados registrados com sucesso!', '', {
                    duration: 2000,
                    panelClass: ['success']
                })
            }, rej => this.snackbar.open('Erro ao registrar dados!', '', {
                duration: 2000,
                panelClass: ['error']
            }));

        this._crud.put('campanha' + '/' + this.data.id, this.campanhaForm.value).then(res => {
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

