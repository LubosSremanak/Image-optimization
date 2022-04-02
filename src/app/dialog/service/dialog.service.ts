import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../model/dialog';
import { DialogComponent } from '../dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openDialog(dialog: Dialog): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: dialog,
    });
    dialogRef.afterClosed().subscribe(dialog.resultHandler);
  }
}
