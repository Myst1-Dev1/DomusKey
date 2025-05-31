import { Component ,ElementRef, ViewChildren, Inject, PLATFORM_ID, QueryList, AfterViewInit  } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { isPlatformBrowser, NgClass, NgFor, NgStyle } from '@angular/common';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [NgClass, NgFor, NgStyle, FontAwesomeModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent implements AfterViewInit {
  faChevronDown = faChevronDown;

  questions = [
    {
      title: 'Como inicio o processo de compra de um imóvel com a DomusKey',
      text: 'Para iniciar o processo de compra, basta entrar em contato com um dos nossos consultores através do nosso site ou pelo telefone. Agendaremos uma visita ao imóvel de interesse e acompanharemos você em todas as etapas da negociação até a assinatura do contrato.'
    },
    {
      title: 'Que tipos de propriedade a DomusKey oferece?',
      text: 'A DomusKey trabalha com uma ampla variedade de imóveis, incluindo apartamentos, casas, coberturas, terrenos e imóveis comerciais. Atendemos desde o público que busca o primeiro imóvel até investidores em busca de oportunidades de alta valorização.'
    },
    {
      title: 'A DomusKey pode ajudar com o financiamento imobiliário ou hipotecas?',
      text: 'Sim, oferecemos suporte completo para financiamento imobiliário. Trabalhamos em parceria com os principais bancos e instituições financeiras para facilitar a aprovação do seu crédito, com as melhores taxas e condições do mercado.'
    }
  ];

  activeIndex: number | null = null;

  @ViewChildren('paragraphRef') paragraphs!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  toggleAccordion(index: number): void {
    const elements = this.paragraphs.toArray();

    if (this.activeIndex !== null && this.activeIndex !== index) {
      const prevEl = elements[this.activeIndex].nativeElement;
      gsap.to(prevEl, {
        height: 0,
        duration: 0.4,
        ease: 'sine'
      });
    }

    if (this.activeIndex === index) {
      const el = elements[index].nativeElement;
      gsap.to(el, {
        height: 0,
        duration: 0.4,
        ease: 'sine'
      });
      this.activeIndex = null;
    } else {
      const el = elements[index].nativeElement;

      el.style.height = 'auto';
      const fullHeight = el.offsetHeight;
      el.style.height = '0px';

      gsap.to(el, {
        height: fullHeight,
        duration: 0.4,
        ease: 'sine',
        onComplete: () => {
          el.style.height = 'auto';
        }
      });

      this.activeIndex = index;
    }
  }

  ngAfterViewInit() {
     if (isPlatformBrowser(this.platformId)) {
      ScrollTrigger.create({
        trigger:'#faq',
        start:'top 90%',
        once:true,
        onEnter:() => {
          const tl = gsap.timeline({ defaults: { ease: 'sine', duration: 0.5, stagger: 0.4 } });

          tl.fromTo('.box-text', { opacity:0, y:-50 }, { opacity:1, y:0 });
          tl.fromTo('.question-box', { opacity:0, x:-30 }, { opacity:1, x:0 });
        }
      });
    }
  }
}
