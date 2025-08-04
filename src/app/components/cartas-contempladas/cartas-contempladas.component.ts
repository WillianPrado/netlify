import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import html2canvas from 'html2canvas';

interface Carta {
  id: number;
  categoria: string;
  valor_credito: number;
  valor_credito_fmt: string;
  entrada: number;
  entrada_fmt: string;
  parcelas: number;
  valor_parcela_fmt: string;
  administradora: string;
  administradora_img: string;
  reserva: string;
}

@Component({
  selector: 'app-cartas-contempladas',
  templateUrl: './cartas-contempladas.component.html',
  styleUrls: ['./cartas-contempladas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CartasContempladasComponent implements OnInit {
  cartas: Carta[] = [];
  cartasFiltradas: Carta[] = [];
  categoriaSelecionada = 'Todos';
  valorCredito = 1000000;
  mostrarDisponivel = true;
  mostrarReservado = true;
  administradoraSelecionada = 'Todas';
  campoOrdenacao = 'valor_credito';
  ordemAscendente = true;
  modalAberta = false;
  cartaSelecionada: Carta | null = null;
  showScrollIndicator = true;

  @ViewChild('modalContent', { static: false }) modalContent!: ElementRef;

  administradoras = [
    'Outras Adm.', 'HS Consórcios', 'Sinosserra', 'Banrisul', 
    'Porto Seguro', 'Itaú', 'Rodobens', 'Bradesco', 'Magalu',
    'Sponchiado', 'BSB Disbrave', 'Colombo', 'Randon',
    'Embracon', 'Santander', 'Unifisa', 'Sicredi', 'Ademicon',
    'Mycon', 'Canopus', 'Servopa', 'CNP', 'Serello', 'MAGGI',
    'RCI', 'SCANIA', 'Zema', 'XS5 Consórcios', 'Gazin',
    'União Catarinense', 'Banco do Brasil', 'Kasinski Consórcios',
    'Âncora Consórcios', 'Sicoob', 'Cresol', 'SULCREDI', 'Itaú Moto'
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarCartas();
  }

  ngAfterViewInit() {
    this.checkScroll();
  }

  carregarCartas(): void {
    this.http.get<Carta[]>('https://fragaebitelloconsorcios.com.br/api/json/contemplados')
      .subscribe({
        next: (data) => {
          this.cartas = data;
          this.filtrarCartas();
        },
        error: (err) => {
          console.error('Erro ao carregar cartas:', err);
        }
      });
  }

  checkScroll() {
    if (this.modalContent) {
      const element = this.modalContent.nativeElement;
      element.addEventListener('scroll', () => {
        const isBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 5;
        this.showScrollIndicator = !isBottom;
      });
    }
  }

  filtrarCartas(): void {
    this.cartasFiltradas = this.cartas.filter(item => {
      const categoriaOk = this.categoriaSelecionada === 'Todos' || 
                         item.categoria.toLowerCase() === this.categoriaSelecionada.toLowerCase();
      const creditoOk = item.valor_credito <= this.valorCredito;
      const situacaoOk = (this.mostrarDisponivel && item.reserva !== 'Reservado') ||
                        (this.mostrarReservado && item.reserva === 'Reservado');
      const admOk = this.administradoraSelecionada === 'Todas' || 
                   item.administradora === this.administradoraSelecionada;

      return categoriaOk && creditoOk && situacaoOk && admOk;
    });

    this.ordenarCartas();
  }

  ordenarCartas(): void {
    if (this.campoOrdenacao) {
      this.cartasFiltradas.sort((a, b) => {
        let valA = a[this.campoOrdenacao as keyof Carta];
        let valB = b[this.campoOrdenacao as keyof Carta];
        
        if (typeof valA === 'string') valA = parseFloat(valA.toString().replace(/[^\d,]/g, '').replace(',', '.'));
        if (typeof valB === 'string') valB = parseFloat(valB.toString().replace(/[^\d,]/g, '').replace(',', '.'));
        
        if (typeof valA === 'number' && typeof valB === 'number') {
          return this.ordemAscendente ? valA - valB : valB - valA;
        }
        return 0;
      });
    }
  }

  ordenarPor(campo: string): void {
    if (this.campoOrdenacao === campo) {
      this.ordemAscendente = !this.ordemAscendente;
    } else {
      this.campoOrdenacao = campo;
      this.ordemAscendente = true;
    }
    this.filtrarCartas();
  }

  atualizarValorCredito(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.valorCredito = parseFloat(input.value);
    this.filtrarCartas();
  }

  selecionarCategoria(categoria: string): void {
    this.categoriaSelecionada = categoria;
    this.filtrarCartas();
  }

  abrirModal(carta: Carta): void {
    this.cartaSelecionada = carta;
    this.modalAberta = true;
    document.body.style.overflow = 'hidden';
    setTimeout(() => this.checkScroll(), 100); // Garante que o scroll seja verificado após a abertura
  }

  fecharModal(): void {
    this.modalAberta = false;
    this.cartaSelecionada = null;
    document.body.style.overflow = 'auto';
  }

  async baixarImagem(): Promise<void> {
    if (!this.cartaSelecionada) return;
    
    try {
      const modalContent = document.querySelector('.modal-card') as HTMLElement;
      
      const canvas = await html2canvas(modalContent, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scrollY: -window.scrollY
      });
  
      const link = document.createElement('a');
      link.download = `carta-contemplada-${this.cartaSelecionada.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
    } catch (error) {
      console.error('Erro ao gerar imagem:', error);
    }
  }

  async baixarApenasImagem(): Promise<void> {
    if (!this.cartaSelecionada) return;
    
    try {
      const modalCard = document.querySelector('.modal-card') as HTMLElement;
      const clone = modalCard.cloneNode(true) as HTMLElement;
      
      // Remove elementos que não devem aparecer na imagem
      const elementsToRemove = clone.querySelectorAll('.action-buttons, .scroll-indicator');
      elementsToRemove.forEach(el => el.remove());
      
      // Aplica estilos temporários para a imagem
      clone.style.width = modalCard.offsetWidth + 'px';
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      document.body.appendChild(clone);
      
      const canvas = await html2canvas(clone, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#000'
      });
      
      const link = document.createElement('a');
      link.download = `carta-contemplada-${this.cartaSelecionada.id}-simples.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      document.body.removeChild(clone);
      
    } catch (error) {
      console.error('Erro ao gerar imagem simplificada:', error);
    }
  }

  compartilharWhatsApp(): void {
    if (!this.cartaSelecionada) return;
    
    const texto = `Olá! Tenho interesse na carta ${this.cartaSelecionada.id} de ${this.cartaSelecionada.categoria}`;
    const url = `https://wa.me/5534988608090?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  }

  getIconeCategoria(categoria: string): string {
    return categoria.toLowerCase().includes("veí") ? "car" :
           categoria.toLowerCase().includes("imó") ? "home" : "file";
  }
}