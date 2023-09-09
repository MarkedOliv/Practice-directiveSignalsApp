import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
  }

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  private _color: string = 'red';
  private htmlElement?: ElementRef<HTMLElement>;
  private _errors?: ValidationErrors | null;

  setStyle(): void {
    if (!this.htmlElement) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = 'No hay errores';
      return;
    }

    const errors = Object.keys(this._errors);

    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido.';
      return;
    }

    if (errors.includes('minLength')) {
      const min = this._errors!['minLength']['requiredLength'];
      const current = this._errors!['minLength']['actualLength'];
      this.htmlElement.nativeElement.innerText = `Mínimo ${current}/${min} caracteres.`;
    }

    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerText = 'No es un email';
    }
  }

  ngOnInit(): void {
    this.setStyle();
  }
}
