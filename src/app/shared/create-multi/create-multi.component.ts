import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DeckService } from 'src/app/deck.service';
import { AuthService } from 'src/app/auth.service';

@Component({
    selector: 'app-create-multi',
    templateUrl: './create-multi.component.html',
    styleUrls: ['./create-multi.component.scss']
})
export class CreateMultiComponent implements OnInit {

    name: string;

    constructor(public dialogRef: MatDialogRef<CreateMultiComponent>,
        private deck: DeckService,
        private auth: AuthService) { }

    ngOnInit() { }

    createRemoteGame() : void {
        let success = (res: any) => {
            console.log(res);
            this.dialogRef.close(res.id);
        };

        this.auth.startRemoteGame(this.name).subscribe(
            (res) => success(res)
        );
    }

}
