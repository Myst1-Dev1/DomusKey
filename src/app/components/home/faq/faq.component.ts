import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { NgClass, NgFor, NgStyle } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [NgClass, NgFor, NgStyle, FontAwesomeModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faChevronDown = faChevronDown;

  questions = [
    { title: 'Como inicio o processo de compra de um imóvel com a DomusKey', text: 'Lorem Ipsum...' },
    { title: 'Que tipos de propriedade a DomusKey oferece?', text: 'Lorem Ipsum...' },
    { title: 'A DomusKey pode ajudar com o financiamento imobiliário ou hipotecas?', text: 'Lorem Ipsum...' }
  ];  

  activeIndex: number | null = null;

  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
