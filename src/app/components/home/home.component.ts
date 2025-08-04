import { Component,ViewEncapsulation  } from '@angular/core';
import Swiper from 'swiper';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  isMenuOpen = false;
  activeTestimonial = 0;
  
  testimonials = [
    {
      quote: "A assessoria transformou minha perspectiva sobre consórcios. Adquiri meu Porsche com condições exclusivas.",
      author: "Carlos Eduardo M.",
      role: "Empresário"
    },
    {
      quote: "Profissionalismo e conhecimento técnico excepcionais. Recomendo para quem busca excelência.",
      author: "Mariana Fonseca",
      role: "Advogada"
    }
  ];

  services = [
    {
      icon: "🏦",
      title: "Consórcios de Luxo",
      description: "Aquisição de bens de alto padrão com planejamento estratégico"
    },
    {
      icon: "✈️",
      title: "Experiências Exclusivas",
      description: "Pacotes de viagens e vivências diferenciadas através de consórcios"
    },
    {
      icon: "🏡",
      title: "Patrimônio Imobiliário",
      description: "Construção de portfólio imobiliário com metodologia proprietária"
    }
  ];

  ngAfterViewInit() {
    const swiper = new Swiper('.testimonials-carousel', {
      // ... outras configurações que você já tem
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className}"></span>`;
        },
      },
    });
  }

  abrirWhatsApp() {
    const texto = encodeURIComponent('Olá! Gostaria de mais informações sobre os consórcios premium.');
    window.open(`https://wa.me/5534991126384?text=${texto}`, '_blank');
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  nextTestimonial() {
    this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length;
  }

  prevTestimonial() {
    this.activeTestimonial = (this.activeTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
  }
}