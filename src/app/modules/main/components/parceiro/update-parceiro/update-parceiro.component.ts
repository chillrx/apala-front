import { CrudService } from './../../../../shared/services/nodejs/crud.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-parceiro',
  templateUrl: './update-parceiro.component.html',
  styleUrls: ['./update-parceiro.component.css']
})
export class UpdateParceiroComponent implements OnInit {
  public parceiroForm: FormGroup;

  constructor(
    private _crud: CrudService,
    public dialogRef: MatDialogRef<UpdateParceiroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.parceiroForm = new FormGroup({
      nome: new FormControl(null),
      posicao: new FormControl(null),
      site: new FormControl(null),
      foto: new FormControl(null)
    });
  }

  ngOnInit() {
    if (this.data) this.parceiroForm.patchValue(this.data);
  }

  addParceiro = () => {
    if (!this.data)
      return this._crud.create({
        route: 'parceiro',
        objectToCreate: this.parceiroForm.value
      })
        .then(res => {
          this.dialogRef.close(res);
        }, rej => {
          this.dialogRef.close(rej);
        });

    this._crud.update({
      route: 'parceiro' + '/' + this.data.id, objectToUpdate: this.parceiroForm.value
    }).then(res => {
      this.dialogRef.close(res);
    });
  }

}
