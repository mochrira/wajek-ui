import { Injectable } from "@angular/core";

export interface IconConfig {
  [iconName: string]: string; // iconName -> SVG content or URL
}

@Injectable({
    providedIn: 'root'
})
export class IconService {
    private icons = new Map<string, string>();

    constructor() { }

    getIcon(name: string): string | null {
        return this.icons.get(name) || null;
    }

    registerIcon(name: string, content: string): void {
        this.icons.set(name, content);
    }

    registerIcons(icons: IconConfig): void {
        Object.entries(icons).forEach(([name, content]) => {
        this.registerIcon(name, content);
        });
    }
}