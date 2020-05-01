import { Directive, ElementRef, Renderer2, Input } from "@angular/core";

@Directive({
  selector: '[appHover]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  }
})
export class HoverDirective {
  private defaultColor = '#4f5f6f';
  @Input('appHover') selectedColor = 'blue';

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {}

  onMouseEnter() {
    this.setColor(this.selectedColor);
  }

  onMouseLeave() {
    this.setColor(this.defaultColor);
  }

  private setColor(color: string) {
    this.renderer.setStyle(this.elRef.nativeElement, 'color', color);
  }
}