import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-delete-confirm',
    templateUrl: './delete-confirm.component.html',
    styleUrls: ['./delete-confirm.component.css']
})

export class DeleteConfirmComponent implements OnInit {
    @Output()
    change: EventEmitter<string> = new EventEmitter<string>();

    dataToDelete: any;
    dialogMessage: string;

    constructor(
        public dialogRef: MatDialogRef<DeleteConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
        this.dialogMessage = !this.data ? 'Tem certeza que deseja apagar?' : this.data.dialogMessage;
    }

    delete() {
        this.dialogRef.close(true);
    }

}
