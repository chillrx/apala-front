import { UpdateInstituicaoComponent } from './update-instituicao/update-instituicao.component';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/services/nodejs/crud.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteConfirmComponent } from '../../../shared/components/delete-confirm/delete-confirm.component';

@Component({
    selector: 'app-instituicao',
    templateUrl: './instituicao.component.html',
    styleUrls: ['./instituicao.component.css']
})
export class InstituicaoComponent implements OnInit {
    public instituicoes: any;

    constructor(
        private _crud: CrudService,
        public _dialog: MatDialog,
        public snackbar: MatSnackBar
    ) {
        this._crud.get('instituicao').then(res => this.instituicoes = res);
    }

    ngOnInit() {
    }

    getForm = () => this._crud.get('instituicao').then(res => this.instituicoes = res);

    addInstituicao = () => {
        const dialogRef = this._dialog.open(UpdateInstituicaoComponent, {
            height: 'auto',
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.getForm();
        });
    }

    editInstituicao = (i) => {
        const dialogRef = this._dialog.open(UpdateInstituicaoComponent, {
            height: 'auto',
            width: '600px',
            data: Object.assign({}, this.instituicoes[i])
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.getForm();
        });
    }

    deleteInstituicao = (i) => {
        const dialogRef = this._dialog.open(DeleteConfirmComponent, {
            height: 'auto',
            width: 'auto'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._crud.delete('instituicao/' + this.instituicoes[i].id).then(res =>
                    this.snackbar.open('Dados deletados com sucesso!', '', {
                        duration: 2000,
                        panelClass: ['success']
                    })
                    , rej => this.snackbar.open('Erro ao deletar os dados!', '', {
                        duration: 2000,
                        panelClass: ['error']
                    }));

                this.instituicoes.splice(i, 1);
            }
        });
    }
    
}
