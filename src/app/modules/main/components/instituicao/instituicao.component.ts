import { UpdateInstituicaoComponent } from './update-instituicao/update-instituicao.component';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/services/nodejs/crud.service';
import { MatDialog } from '@angular/material';
import { DeleteConfirmComponent } from '../../../shared/components/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.css']
})
export class InstituicaoComponent implements OnInit {
  public instituicoes: any;

  constructor(private _crud: CrudService,
    public _dialog: MatDialog) {
    this._crud.read({
      route: 'instituicao'
    }
    ).then(res => {
      this.instituicoes = res;
    });
  }

  ngOnInit() {
  }

  addInstituicao = () => {
    const dialogRef = this._dialog.open(UpdateInstituicaoComponent, {
      height: 'auto',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.instituicoes.push(result);
    });
  }

  editInstituicao = (i) => {
    console.log(this.instituicoes, Object.assign({}, this.instituicoes[i]));
    const dialogRef = this._dialog.open(UpdateInstituicaoComponent, {
      height: 'auto',
      width: '600px',
      data: Object.assign({}, this.instituicoes[i])
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.instituicoes[i] = result;
    });
  }

  deleteInstituicao = (i) => {
    const dialogRef = this._dialog.open(DeleteConfirmComponent, {
      height: 'auto',
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._crud.delete({ route: 'instituicao', paramToDelete: [this.instituicoes[i].id] }).then(res => {
        });
        
        this.instituicoes.splice(i, 1);
      }
    });
  }
}
