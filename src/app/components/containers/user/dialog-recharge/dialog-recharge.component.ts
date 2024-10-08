import { Component } from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatDialogTitle} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-recharge',
  standalone: true,
  imports: [
    MatCard,
    MatDialogTitle
  ],
  templateUrl: './dialog-recharge.component.html',
  styleUrl: './dialog-recharge.component.scss'
})
export class DialogRechargeComponent {

}
