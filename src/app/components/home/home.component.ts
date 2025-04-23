import { Component } from '@angular/core';

import { FilterComponent } from "./filter/filter.component";
import { VideoComponent } from "./video/video.component";
import { ImmobilesComponent } from "./immobiles/immobiles.component";
import { ContactComponent } from "./contact/contact.component";
import { FaqComponent } from "./faq/faq.component";

@Component({
  selector: 'app-home',
  imports: [
    FilterComponent,
    VideoComponent,
    ImmobilesComponent,
    ContactComponent,
    FaqComponent
],
  standalone:true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
