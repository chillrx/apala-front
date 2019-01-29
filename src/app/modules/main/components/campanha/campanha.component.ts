import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/services/nodejs/crud.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteConfirmComponent } from '../../../shared/components/delete-confirm/delete-confirm.component';
import { UpdateCampanhaComponent } from './update-campanha/update-campanha.component';

@Component({
    selector: 'app-campanha',
    templateUrl: './campanha.component.html',
    styleUrls: ['./campanha.component.css']
})
export class CampanhaComponent implements OnInit {
    public campanhas: any;

    constructor(
        private _crud: CrudService,
        public _dialog: MatDialog,
        public snackbar: MatSnackBar
    ) {
        this.getForm();
    }

    ngOnInit() {
    }

    getForm = () => this._crud.get('campanha').then(res => this.campanhas = res);

    addCampanha = () => {
        const dialogRef = this._dialog.open(UpdateCampanhaComponent, {
            height: 'auto',
            width: 'auto'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.getForm();
        });
    }

    editCampanha = (i) => {
        const dialogRef = this._dialog.open(UpdateCampanhaComponent, {
            height: 'auto',
            width: 'auto',
            data: Object.assign({}, this.campanhas[i])
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.getForm();
        });
    }

    deleteCampanha = (i) => {
        const dialogRef = this._dialog.open(DeleteConfirmComponent, {
            height: 'auto',
            width: 'auto'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._crud.delete('campanha/' + this.campanhas[i].id).then(res =>
                    this.snackbar.open('Dados deletados com sucesso!', '', {
                        duration: 2000,
                        panelClass: ['success']
                    })
                    , rej => this.snackbar.open('Erro ao deletar os dados!', '', {
                        duration: 2000,
                        panelClass: ['error']
                    }));

                this.getForm();
            }
        });
    }

}
