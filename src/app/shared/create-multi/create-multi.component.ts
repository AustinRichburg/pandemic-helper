import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';

@Component({
    selector: 'app-create-multi',
    templateUrl: './create-multi.component.html',
    styleUrls: ['./create-multi.component.scss']
})
export class CreateMultiComponent implements OnInit {

    name: string = "test";
    error: string;

    constructor(public dialogRef: MatDialogRef<CreateMultiComponent>,
        private auth: AuthService) { }

    ngOnInit() { }

    createRemoteGame() : void {
        if (this.name.trim() == "") {
            this.error = "Please enter a valid name.";
            return;
        }

        let success = (res: any) => {
            console.log(res);
            this.dialogRef.close(res.id);
        };

        this.auth.startRemoteGame(this.name).subscribe(
            (res) => success(res)
        );
    }

}
