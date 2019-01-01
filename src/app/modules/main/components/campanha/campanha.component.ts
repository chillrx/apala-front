import { Http, RequestOptions, Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/services/nodejs/crud.service';
import { MatDialog } from '@angular/material';
import { DeleteConfirmComponent } from '../../../shared/components/delete-confirm/delete-confirm.component';
import { UpdateCampanhaComponent } from './update-campanha/update-campanha.component';

@Component({
  selector: 'app-campanha',
  templateUrl: './campanha.component.html',
  styleUrls: ['./campanha.component.css']
})
export class CampanhaComponent implements OnInit {
  public campanhas: any;
  public optionsToAuth = new RequestOptions({
    'headers': new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*'
    })
  });

  constructor(private _crud: CrudService,
    private http: Http,
    public _dialog: MatDialog) {
    this._crud.read({
      route: 'campanha'
    }
    ).then(res => {
      this.campanhas = res;
    });
  }

  ngOnInit() {
  }

  addCampanha = () => {
    const dialogRef = this._dialog.open(UpdateCampanhaComponent, {
      height: 'auto',
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.campanhas.push(result);
    });
  }

  editCampanha = (i) => {
    const dialogRef = this._dialog.open(UpdateCampanhaComponent, {
      height: 'auto',
      width: 'auto',
      data: Object.assign({}, this.campanhas[i])
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.campanhas[i] = result;
    });
  }

  deleteCampanha = (i) => {
    const dialogRef = this._dialog.open(DeleteConfirmComponent, {
      height: 'auto',
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._crud.delete({ route: 'campanha', paramToDelete: [this.campanhas[i].id] }).then(res => { });

        this.campanhas.splice(i, 1);
      }
    });
  }

}
