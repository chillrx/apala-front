import { UpdateUsuarioComponent } from './../usuario/update-usuario/update-usuario.component';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/services/nodejs/crud.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteConfirmComponent } from '../../../shared/components/delete-confirm/delete-confirm.component';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
    public data = [];
    public users: any;

    constructor(
        private _crud: CrudService,
        public _dialog: MatDialog,
        public snackbar: MatSnackBar
    ) {
        this.getForm();
    }

    ngOnInit() { }

    getForm = () => this._crud.get('usuario').then(res => {
        const users = JSON.stringify(res);
        this.users = JSON.parse(users);
    });

    updateUsuario: any = (i) => {
        if (i != undefined) {
            const dialogRef = this._dialog.open(UpdateUsuarioComponent, {
                height: 'auto',
                width: 'auto',
                data: this.users[i]
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) this.getForm();
            });
        } else {
            const dialogRef = this._dialog.open(UpdateUsuarioComponent, {
                height: 'auto',
                width: 'auto'
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result) this.getForm();
            });
        }
    }

    deleteUsuario(i) {
        const dialogRef = this._dialog.open(DeleteConfirmComponent, {
            height: 'auto',
            width: 'auto'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this._crud.delete('usuario/' + this.users[i].id).then(res =>
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
