import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/services/nodejs/crud.service';
import { UpdateUsuarioComponent } from '../update-usuario/update-usuario.component';
import { MatDialog } from '@angular/material';
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
    public _dialog: MatDialog) {
    this._crud.read({
      route: 'usuario'
    }
    ).then(res => {
      const users = JSON.stringify(res);
      this.users = JSON.parse(users);
    });
  }

  ngOnInit() {
  }

  updateUsuario: any = (i) => {
    if (i !== true) {
      // const dialogRef = this._dialog.open(UpdateUsuarioComponent, {
      //   height: 'auto',
      //   width: '600px',
      //   data: this.users[i]
      // });
      // dialogRef.afterClosed().subscribe(result => {
      // });
    } else {
      const dialogRef = this._dialog.open(UpdateUsuarioComponent, {
        height: 'auto',
        width: 'auto'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) this.users.push(result.usuario);
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
        this._crud.delete({ route: 'usuario', paramToDelete: [this.users[i].id] });

        this.users.splice(i, 1);
      }
    });
  }
}
