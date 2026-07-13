import { Component, input, ViewEncapsulation, computed } from "@angular/core";

@Component({
    selector: 'button[wuiButton], a[wuiButton], input[type="button"][wuiButton], input[type="submit"][wuiButton], div[wuiButton]',
    template: `
        <div class="wui-button-bg"></div>
        <div class="wui-button-label"><ng-content></ng-content></div>
    `,
    styleUrl: './button.component.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'wui-button',
        'role': 'button',
        '[class]': 'hostClasses()'
    }
})
export class WuiButtonComponent {
    size = input<'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'>();
    shape = input<'round' | 'square'>();
    variant = input<'default' | 'primary' | 'danger'>();
    
    hostClasses = computed(() => {
        const classes = ['wui-button'];
        
        // Add size class
        if (this.size()) {
            classes.push(`wui-button--${this.size()}`);
        }

        // Add shape class
        if (this.shape()) {
            classes.push(`wui-button--${this.shape()}`);
        }
        
        if (this.variant()) {
            classes.push(`wui-button--${this.variant()}`);
        }

        return classes.join(' ');
    });
}