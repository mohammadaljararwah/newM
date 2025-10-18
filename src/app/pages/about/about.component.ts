import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  // --- King's Visit Carousel Properties ---
  currentKingSlideIndex = 0;
  private kingCarouselInterval: any;

  // Using placeholder images for the carousel
  kingImages = [
    'assets/images/king-abdullah-visit.jpg',
    'https://picsum.photos/800/600?grayscale&random=2',
    'https://picsum.photos/800/600?grayscale&random=3'
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initializeKingCarousel();
        this.startKingCarousel();
      }, 100);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.kingCarouselInterval) {
        clearInterval(this.kingCarouselInterval);
      }
    }
  }

  // --- King's Visit Carousel Logic ---
  initializeKingCarousel(): void {
    this.showKingSlide(this.currentKingSlideIndex);
  }

  startKingCarousel(): void {
    if (this.kingCarouselInterval) {
      clearInterval(this.kingCarouselInterval);
    }
    this.kingCarouselInterval = setInterval(() => {
      this.currentKingSlideIndex = (this.currentKingSlideIndex + 1) % this.kingImages.length;
      this.showKingSlide(this.currentKingSlideIndex);
    }, 4000);
  }

  showKingSlide(index: number): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const slides = document.querySelectorAll('.carousel-img-about');
    const dots = document.querySelectorAll('.carousel-dots-about .dot-about');

    if (slides.length === 0 || dots.length === 0) return;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  goToSlideKing(index: number): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.currentKingSlideIndex = index;
    this.showKingSlide(this.currentKingSlideIndex);
    this.startKingCarousel();
  }
}