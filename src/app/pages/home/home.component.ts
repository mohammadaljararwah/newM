import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common'; // Import isPlatformBrowser
import { NgxPageScrollModule } from 'ngx-page-scroll';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NgxPageScrollModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  // --- Carousel Properties ---
  currentSlideIndex = 0;
  slides: NodeListOf<Element> | undefined;
  dots: NodeListOf<Element> | undefined;
  private carouselInterval: any;

  // Inject PLATFORM_ID to check if we are in a browser
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // --- Lifecycle Hooks ---
  ngOnInit(): void {
    // THE FIX IS HERE: Only run carousel logic if we are in a browser
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initializeCarousel();
        this.startCarousel();
      }, 100);
    }

  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.carouselInterval) {
        clearInterval(this.carouselInterval);
      }
    }
  }

  // --- Carousel Logic ---
  initializeCarousel(): void {
    this.slides = document.querySelectorAll('.carousel-img');
    this.dots = document.querySelectorAll('.carousel-dots .dot');
    this.showSlide(this.currentSlideIndex);
  }

  startCarousel(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }

    this.carouselInterval = setInterval(() => {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % (this.slides?.length || 1);
      this.showSlide(this.currentSlideIndex);
    }, 3000);
  }

  showSlide(index: number): void {
    if (!this.slides || !this.dots) return;

    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  goToSlide(index: number): void {
    this.currentSlideIndex = index;
    this.showSlide(this.currentSlideIndex);
    this.startCarousel();
  }
}