import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/services/nodejs/crud.service';
import { MatDialog } from '@angular/material';
import { UpdateCampanhaComponent } from '../update-campanha/update-campanha.component';
import { DeleteConfirmComponent } from '../../../shared/components/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-campanha',
  templateUrl: './campanha.component.html',
  styleUrls: ['./campanha.component.css']
})
export class CampanhaComponent implements OnInit {
  public campanhas: any;

  constructor(private _crud: CrudService,
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
        this._crud.delete({ route: 'campanha', paramToDelete: [this.campanhas[i].id] }).then(res => {});

        this.campanhas.splice(i, 1);
      }
    });
  }

}
