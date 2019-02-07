import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CrudService } from '../../../shared/services/nodejs/crud.service';
import { DeleteConfirmComponent } from '../../../shared/components/delete-confirm/delete-confirm.component';
import { UpdateParceiroComponent } from './update-parceiro/update-parceiro.component';

@Component({
    selector: 'app-parceiro',
    templateUrl: './parceiro.component.html',
    styleUrls: ['./parceiro.component.css']
})
export class ParceiroComponent implements OnInit {
    public parceiros: any;

    constructor(
        private _crud: CrudService,
        public _dialog: MatDialog,
        public snackbar: MatSnackBar
        ) {
        this._crud.get('parceiro').then(res => this.parceiros = res);
    }

    ngOnInit() {
    }

    addParceiro = () => {
        const dialogRef = this._dialog.open(UpdateParceiroComponent, {
            height: 'auto',
            width: 'auto'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) this._crud.get('parceiro').then(res => this.parceiros = res);
        });
    }

    editParceiro = (i) => {
        const dialogRef = this._dialog.open(UpdateParceiroComponent, {
            height: 'auto',
            width: 'auto',
            data: Object.assign({}, this.parceiros[i])
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) this._crud.get('parceiro').then(res => this.parceiros = res);
        });
    }

    deleteParceiro = (i) => {
        const dialogRef = this._dialog.open(DeleteConfirmComponent, {
            height: 'auto',
            width: 'auto'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._crud.delete('parceiro/' + this.parceiros[i].id).then(res =>
                    this.snackbar.open('Dados deletados com sucesso!', '', {
                        duration: 2000,
                        panelClass: ['success']
                    })
                    , rej => this.snackbar.open('Erro ao deletar os dados!', '', {
                        duration: 2000,
                        panelClass: ['error']
                    }));

                this.parceiros.splice(i, 1);
            }
        });
    }

}
