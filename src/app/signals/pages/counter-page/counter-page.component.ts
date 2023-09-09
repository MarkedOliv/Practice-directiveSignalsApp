import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css'],
})
export class CounterPageComponent {
  public counter = signal<number>(10);
  public squareCounter = computed(() => this.counter() * this.counter());

  public increase(value: number) {
    this.counter.update((current) => current + value);
  }
}
