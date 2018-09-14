import { TransformService } from './../../../shared/services/transform.service';
import { Component, OnInit, Inject } from '@angular/core';
import { CrudService } from '../../../shared/services/nodejs/crud.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

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
    @Inject(MAT_DIALOG_DATA) public data: any) {
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

    if (!this.data)
      return this._crud.create({
        route: 'campanha',
        objectToCreate: this.campanhaForm.value
      })
        .then(res => {
          this.dialogRef.close(res);
        });

    this._crud.update({
      route: 'campanha' + '/' + this.data.id, objectToUpdate: this.campanhaForm.value
    }).then(res => {
      this.dialogRef.close(res);
    });
  }
  
}

