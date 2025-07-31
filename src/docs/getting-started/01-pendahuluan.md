# Memulai

Wajek UI (WUI) adalah sebuah library UI untuk [Framework Angular](https://angular.dev). Untuk mulai menggunakan WUI, jalankan perintah berikut di dalam direktori proyek angular.

```bash
# Instalasi bootstrap
npm install bootstrap --save

# Install Wajek UI
npm install @wajek/wui@latest --save
```

## Impor modul

Jika proyek anda berbasis modul, buka `src/app/app.module.ts`. Lalu tambahkan baris berikut :

```typescript
@NgModule({
    imports: [
        // ... modul lainnya
        WuiModule.forRoot()
    ]
})
export class AppModule {}
```

atau jika proyek anda berbasis standalone, buka `src/app/app.config.ts`. Lalu tambahkan baris berikut :

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    // ... provider lainnya
    importProvidersFrom(
      WuiModule.forRoot()
    )
  ]
};

```

## Impor Style

Wui menggunakan scss dalam mendeklarasikan stylenya. Pastikan proyek anda menggunakan scss, selanjutnya buka `angular.json`, lalu tambahkan baris berikut :

```json
{
    "projects": {
        "your-project": {
            "architect": {
                "build": {
                    "options": {
                        "styles": [
                            "node_modules/bootstrap/scss/bootstrap.scss",
                            "node_modules/@wajek/wui/scss/wui.scss",
                            // ... style lainnya
                        ]
                    }
                }
            }
        }
    }
}
```

