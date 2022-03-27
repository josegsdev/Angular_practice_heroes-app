import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styles: [
  ]
})
export class ModalEliminarComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public heroeProEliminar:Heroe,
              public modalRef:MatDialogRef<ModalEliminarComponent>) { }

  ngOnInit(): void {
  }

  cancelar(){
    this.modalRef.close(false);
  }
  eliminar(){
    this.modalRef.close(true);
  }
}
