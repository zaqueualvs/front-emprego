import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard, MatCardAvatar, MatCardImage, MatCardSmImage} from "@angular/material/card";
import {MatChip} from "@angular/material/chips";
import {PublicUser} from "../../../model/public-user";

@Component({
  selector: 'app-resume-card',
  standalone: true,
  imports: [
    MatCard,
    MatChip,
    MatCardImage,
    MatCardSmImage,
    MatCardAvatar
  ],
  templateUrl: './resume-card.component.html',
  styleUrl: './resume-card.component.scss'
})
export class ResumeCardComponent {

  @Input() publicUsers: PublicUser[] = []
  @Output() publicUserDetail = new EventEmitter<PublicUser>();

  onDetail(publicUser: PublicUser) {
    this.publicUserDetail.emit(publicUser);
  }
}
