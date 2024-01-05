import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';

@Component({
  template: ''
})
export class DialogEntryComponent implements OnDestroy, OnInit {

  private dialogRef: MatDialogRef<unknown, any>;

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.dialogRef = this.dialog.open(this.route.snapshot.data['component'], {
      width: this.route.snapshot.data?.['width'] ? this.route.snapshot.data?.['width'] : '800px',
      closeOnNavigation: true,
      disableClose: true
    });

    const component = this.dialogRef.componentInstance as any;
    for (const key in component) {
      if (component[key] && component[key] instanceof ActivatedRoute) {
        component[key] = this.route;
      }
    }
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
