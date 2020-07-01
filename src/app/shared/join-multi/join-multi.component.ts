import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-join-multi',
  templateUrl: './join-multi.component.html',
  styleUrls: ['./join-multi.component.scss']
})
export class JoinMultiComponent implements OnInit {

    gameId: string;
    error: string;

    constructor(public dialogRef: MatDialogRef<JoinMultiComponent>,
        private auth: AuthService) { }

    ngOnInit() { }

    joinRemoteGame() : void {
        if (!this.gameId) {
            this.error = "Please enter a valid game ID.";
            return;
        }

        if (this.gameId.trim().length != 6) {
            this.error = "Game IDs must be 6 characters in length.";
            return;
        }

        this.gameId = this.gameId.toUpperCase();

        const success = (res: any) => {
            console.log(res);
            this.dialogRef.close({id: this.gameId});
        };
        const error = (err: any) => {
            this.error = err.error;
        };

        this.auth.joinRemoteGame(this.gameId).subscribe(
            (res) => success(res),
            (err) => error(err)
        );
    }

}
