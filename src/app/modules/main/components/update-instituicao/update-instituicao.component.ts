import { TransformService } from './../../../shared/services/transform.service';
import { Component, OnInit, Inject } from '@angular/core';
import { CrudService } from '../../../shared/services/nodejs/crud.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-instituicao',
  templateUrl: './update-instituicao.component.html',
  styleUrls: ['./update-instituicao.component.css']
})
export class UpdateInstituicaoComponent implements OnInit {
  public instituicaoForm: FormGroup;

  constructor(
    private _crud: CrudService,
    public transform: TransformService,
    public dialogRef: MatDialogRef<UpdateInstituicaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.instituicaoForm = new FormGroup({
      titulo: new FormControl(null),
      descricao: new FormControl(null)
    });
  }

  ngOnInit() {
    if (this.data) this.instituicaoForm.patchValue(this.data);
  }

  addInstituicao = () => {
    if (!this.data)
      return this._crud.create({
        route: 'instituicao',
        objectToCreate: this.instituicaoForm.value
      })
        .then(res => {
          this.dialogRef.close(res);
        });

    this._crud.update({
      route: 'instituicao' + '/' + this.data.id, objectToUpdate: this.instituicaoForm.value
    }).then(res => {
      this.dialogRef.close(res);
    });
  }

}
