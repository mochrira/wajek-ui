# Wajek UI (WUI)

> Framework UI berbasis **Material Design 3 (M3)** untuk Wajek Studio — konsisten di setiap aplikasi web.

Wajek UI adalah library komponen UI yang dibangun di atas **Angular Material CDK**, dirancang agar seluruh aplikasi web yang dikembangkan Wajek Studio memiliki tampilan dan perilaku yang konsisten. Produk ini terbagi menjadi:

- **Library komponen** (`wui`) — komponen reusable siap pakai yang dapat di-publish ke npmjs.com.
- **Situs dokumentasi & demo** — berisi cara memulai, penggunaan setiap komponen, dan kustomisasi tema.

---

## ✨ Fitur

- 🎨 Sesuai konsep **Material Design 3** (m3.material.io)
- 🧩 Berbasis **Angular Material CDK** (material.angular.dev/cdk)
- 🌗 Mendukung **tema gelap (dark)** dan **tema terang (light)**, dapat diganti saat runtime
- 📚 Dokumentasi lengkap: cara memulai, penggunaan, dan kustomisasi tema
- 🚀 Output berupa library yang siap di-publish ke **npmjs.com**
- 🏷️ Se-native mungkin terhadap **tag HTML yang sudah ada** (progressive enhancement)
- 🧭 Mengutamakan **directive** sebelum memutuskan membuat komponen
- 🔌 Dapat dipakai di **standalone component** maupun via NgModule

### Komponen & Directive

Sebagian besar perilaku diekspos sebagai **attribute directive** pada elemen native (prinsip directive-first).

| API | Jenis | Status | Keterangan |
| --- | --- | --- | --- |
| `wuiTheme` | Directive | Roadmap | Sistem tema & design token M3 (dark/light, kustomisasi brand color) |
| `wuiLayout` | Directive | Roadmap | Struktur halaman standar untuk semua aplikasi |
| `wuiSidenav` | Directive | Roadmap | Panel navigasi samping pada elemen semantik (fixed / overlay) |

---

## 🏗️ Tech Stack

| Aspek | Pilihan |
| --- | --- |
| Framework | [Angular](https://angular.dev) |
| Basis komponen | [Angular Material CDK](https://material.angular.dev/cdk) |
| Bahasa | TypeScript |
| Distribusi | [npmjs.com](https://npmjs.com) |

> **Catatan:** Wajek UI hanya bergantung pada Angular Material **CDK**, bukan Angular Material Components. Seluruh token, tema, dan komponen mengikuti spesifikasi M3 secara mandiri.

---

## 🧭 Prinsip Desain

Dua prinsip yang memandu pengembangan seluruh API Wajek UI:

1. **Native-first** — memakai tag HTML yang sudah ada (`<nav>`, `<aside>`, `<ul>`, `<button>`, `<a>`, dst.) dan mempertahankan semantik & perilaku bawaannya (fokus, ARIA implisit). Wrapper buatan dihindari kecuali benar-benar diperlukan.
2. **Directive-first** — fitur yang tidak butuh struktur DOM sendiri diimplementasikan sebagai **attribute directive**; komponen baru hanya dibuat bila directive tidak memadai.

### Contoh

Daripada menyediakan elemen buatan khusus, perilaku diletakkan sebagai atribut/direktif pada elemen native:

```html
<!-- toggle sidenav cukup menjadi directive pada button native -->
<button wuiSidenavToggle>Sidenav</button>

<!-- sidenav dirender dari elemen semantik -->
<aside wuiSidenav>
  <nav>…</nav>
</aside>
```

> Contoh di atas bersifat ilustratif — API final akan disesuaikan saat implementasi.

---

## 📦 Instalasi

Instalasi tersedia setelah library dipublikasikan ke npmjs.com:

```bash
npm install wui
# atau
yarn add wui
```

### Melalui NgModule

Contoh penggunaan di `app.module.ts`:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WuiLayoutModule, WuiSidenavModule } from 'wui';

@NgModule({
  imports: [
    BrowserModule,
    WuiLayoutModule,
    WuiSidenavModule,
  ],
})
export class AppModule {}
```

### Standalone component

Wajek UI juga dapat diimpor langsung ke standalone component:

```ts
import { Component } from '@angular/core';
import { WuiLayout, WuiSidenav } from 'wui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WuiLayout, WuiSidenav],
  template: `
    <aside wuiSidenav>…</aside>
    <main wuiLayout>…</main>
  `,
})
export class AppComponent {}
```

---

## 🎨 Kustomisasi Tema

Wajek UI menyediakan tema terang & gelap berbasis design token M3. Kustomisasi warna *brand* dan pergantian tema saat runtime akan dijelaskan lengkap di situs dokumentasi.

```scss
// Contoh (akan disesuaikan dengan API final library)
@use 'wui/theme' as wui;

$my-theme: wui.define-theme((
  color: (primary: #6750A4, scheme: light),
));
```

---

## 📂 Struktur Project

```
wui-angular/
├── docs/
│   ├── vision.md          # Visi & tujuan produk
│   ├── architecture.md    # Keputusan arsitektur
│   └── requirements.md    # Kebutuhan fungsional & non-fungsional
├── projects/
│   ├── wui/               # Library komponen (output publish npm)
│   └── demo/              # Situs dokumentasi & demo komponen
└── ...
```

> Struktur `projects/` bersifat indikatif dan akan disesuaikan saat inisialisasi Angular workspace.

---

## 🛠️ Development

| Perintah | Deskripsi |
| --- | --- |
| `npm install` | Install seluruh dependensi workspace |
| `npm run build:wui` | Build library `wui` |
| `npm run start:demo` | Menjalankan situs dokumentasi/demo secara lokal |
| `npm test` | Menjalankan unit test & test aksesibilitas |
| `npm run publish:wui` | Publish library ke npmjs.com |

> Daftar perintah di atas akan disempurnakan mengikuti setup Angular workspace & Nx/Angular CLI yang dipakai.

---

## 🗺️ Roadmap

Iterasi pertama (sesuai `docs/vision.md`):

- [ ] Sistem tema M3 (design token, dark/light, kustomisasi warna)
- [ ] Komponen `Layout`
- [ ] Komponen `Sidenav`
- [ ] Directive pendukung (native-first & directive-first)
- [ ] Situs dokumentasi & demo interaktif
- [ ] Rilis & publish pertama ke npmjs.com

---

## 📚 Dokumentasi

- [Vision](docs/vision.md)
- [Architecture](docs/architecture.md)
- [Requirements](docs/requirements.md)

---

## 📄 Lisensi

Sementara dokumen lisensi belum ditetapkan. Konten repository ini dikelola oleh **Wajek Studio**.
