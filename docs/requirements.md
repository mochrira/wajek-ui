# Wajek UI — Requirements

Dokumen ini mendefinisikan kebutuhan (requirements) untuk **Wajek UI**, framework UI internal Wajek Studio. Dokumen ini disusun berdasarkan **Vision** (`docs/vision.md`) dan **Architecture** (`docs/architecture.md`).

---

## 1. Pendahuluan

### 1.1 Tujuan

Wajek UI adalah library komponen UI berbasis **Material Design 3 (M3)** yang dibangun di atas **Angular Material CDK**. Tujuannya adalah menyediakan antarmuka yang konsisten di seluruh aplikasi web yang dikembangkan Wajek Studio, lengkap dengan dukungan tema gelap/terang dan dokumentasi yang baik.

### 1.2 Ruang Lingkup

Project menghasilkan dua artefak:

1. **Library komponen** (`wui`) — kumpulan komponen reusable yang siap di-publish ke npmjs.com.
2. **Project dokumentasi & demo** — situs/aplikasi yang memperagakan cara memulai, penggunaan setiap komponen, dan kustomisasi tema.

### 1.3 Dokumen Terkait

| Dokumen | Keterangan |
| --- | --- |
| `docs/vision.md` | Visi, tujuan, dan fitur dasar produk |
| `docs/architecture.md` | Keputusan arsitektur (framework & basis komponen) |

### 1.4 Istilah & Singkatan

| Istilah | Definisi |
| --- | --- |
| M3 | Material Design 3 (m3.material.io) |
| CDK | Component Development Kit (material.angular.dev/cdk) |
| WUI | Wajek UI, nama library |
| npm | Package manager Node.js / registry publik npmjs.com |
| Standalone | Fitur Angular yang memungkinkan component/directive/pipe dipakai tanpa NgModule |

---

## 2. Deskripsi Umum

### 2.1 Perspektif Produk

Wajek UI merupakan lapisan presentasi yang dipakai lintas aplikasi web Wajek Studio. Produk berada di atas Angular Material CDK (bukan Angular Material Components), sehingga seluruh desain token, tema, dan komponen mengikuti spesifikasi M3.

### 2.2 Pengguna

- **Pengembang Wajek Studio** — mengonsumsi library untuk membangun aplikasi web internal/klien.
- **Pengembang eksternal (publik)** — memakai library Wajek UI yang dipublikasikan di npmjs.com.
- **Kontributor internal** — mengembangkan dan memelihara komponen di dalam repository.

### 2.3 Lingkungan Operasi

- **Framework:** Angular (sesuai `architecture.md`).
- **Basis komponen:** Angular Material CDK (sesuai `architecture.md`).
- **Platform distribusi:** npmjs.com.
- **Dukungan tema:** dark & light, berbasis token M3.
- **Mode konsumsi:** NgModule dan **standalone component** (sesuai Visi).

---

## 3. Kebutuhan Fungsional

### 3.1 Manajemen Tema (Theming)

| ID | Kebutuhan |
| --- | --- |
| FR-101 | Sistem harus mendukung **tema gelap (dark)** dan **tema terang (light)**. |
| FR-102 | Skema warna, tipografi, bentuk (shape), dan elevasi harus mengikuti spesifikasi **Material Design 3 (M3)**. |
| FR-103 | Tema harus dibangun di atas **design token** yang terpusat sehingga dapat dikustomisasi per aplikasi. |
| FR-104 | Sistem harus menyediakan mekanisme pergantian tema dark/light secara **runtime** (tanpa rebuild). |
| FR-105 | Tema harus mendukung kustomisasi warna *brand* (primary, secondary, tertiary, error, dst.) melalui API publik yang terdokumentasi. |
| FR-106 | Nilai default tema harus konsisten dan dapat digunakan tanpa konfigurasi tambahan. |

### 3.2 Library Komponen

Fitur dasar komponen yang dijanjikan pada Vision:

#### 3.2.1 Komponen Layout

| ID | Kebutuhan |
| --- | --- |
| FR-201 | Komponen `Layout` harus menyediakan struktur halaman standar yang konsisten untuk semua aplikasi (area konten, area header/nav, dst.). |
| FR-202 | Komponen `Layout` harus menerima area konten dinamis dari aplikasi pengguna. |
| FR-203 | Komponen `Layout` harus terintegrasi dengan `Sidenav` sebagai area navigasi (lihat FR-3xx). |

#### 3.2.2 Komponen Sidenav

| ID | Kebutuhan |
| --- | --- |
| FR-301 | Komponen `Sidenav` harus menyediakan panel navigasi samping (kiri/kanan) yang dapat dibuka & ditutup. |
| FR-302 | Komponen `Sidenav` harus mendukung mode **fixed (docked)** dan **overlay (over)**. |
| FR-303 | Komponen `Sidenav` harus mendukung daftar menu/navigasi yang dapat di-render dari data (mis. daftar item menu). |
| FR-304 | Komponen `Sidenav` harus dapat dikustomisasi kontennya (header, item aktif/selected, label, ikon). |

#### 3.2.3 Ketentuan & Prinsip Desain Komponen

Prinsip desain mengikuti Visi: **menggunakan tag HTML native sebisa mungkin** dan **memaksimalkan directive sebelum memutuskan membuat komponen**.

| ID | Kebutuhan |
| --- | --- |
| FR-401 | Setiap komponen harus mendukung **tema dark & light** tanpa perubahan kode aplikasi pengguna. |
| FR-402 | Setiap komponen harus menerapkan prinsip **accessibility (a11y)** — navigasi keyboard, fokus yang terlihat, dan label ARIA yang tepat. |
| FR-403 | Setiap komponen harus menerima **atribut native** dan event Angular standar kecuali dinyatakan lain. |
| FR-404 | Kumpulan komponen dapat **diperluas bertahap** (beyond Layout & Sidenav) tanpa mengubah API komponen yang sudah ada. |
| FR-405 | Fitur yang tidak memerlukan struktur/DOM tambahan wajib diimplementasikan sebagai **attribute directive** terlebih dahulu; komponen baru hanya dibuat bila directive tidak memadai. |
| FR-406 | Implementasi harus **menggunakan tag HTML native & semantik** (mis. `<nav>`, `<aside>`, `<ul>/<li>`, `<button>`, `<a>`) dan menghindari pembungkus (wrapper) buatan yang tidak diperlukan. |
| FR-407 | Perilaku & semantik bawaan elemen native (mis. fokus keyboard, ARIA implisit) harus dipertahankan/dimanfaatkan (**progressive enhancement**) dan hanya ditimpa bila ada alasan fungsional yang jelas. |
| FR-408 | Setiap komponen & directive harus dapat dipakai di **standalone component** (Angular standalone), tidak terbatas pada penggunaan via NgModule. |

### 3.3 Dokumentasi & Demo

| ID | Kebutuhan |
| --- | --- |
| FR-501 | Harus tersedia halaman **"Getting Started"** yang menjelaskan instalasi package dari npm. |
| FR-502 | Harus tersedia dokumentasi **penggunaan setiap komponen** beserta contoh kode yang dapat disalin (copy-paste). |
| FR-503 | Harus tersedia dokumentasi **kustomisasi tema** (dark/light, warna brand, token) dengan contoh nyata. |
| FR-504 | Situs demo harus menampilkan **live example** interaktif untuk setiap komponen & setiap mode tema. |
| FR-505 | Dokumentasi harus menunjukkan **API setiap komponen** (input, output, selector, direktif/modul). |
| FR-506 | Dokumentasi harus menyertakan contoh penggunaan dalam **standalone component** maupun berbasis **NgModule**. |

### 3.4 Distribusi (npm)

| ID | Kebutuhan |
| --- | --- |
| FR-601 | Project utama (primary output) adalah **library yang dapat di-publish ke npmjs.com** dengan nama package yang konsisten. |
| FR-602 | Library harus menyediakan **entry point publik yang bersih** (public API surface) — hanya mengekspos API yang memang boleh dipakai pengguna. |
| FR-603 | Package harus menyertakan **file definisi tipe (TypeScript `.d.ts`)** dan **stylesheet tema** yang dapat diimpor. |
| FR-604 | Proses build library harus menghasilkan artefak yang siap dipublikasi (versi, changelog, dsb.). |

---

## 4. Kebutuhan Non-Fungsional

### 4.1 Kompatibilitas & Teknologi

| ID | Kebutuhan |
| --- | --- |
| NFR-101 | Dibangun dengan **Angular** dan **Angular Material CDK** sebagai satu-satunya dependensi runtime yang diwajibkan (sesuai `architecture.md`). |
| NFR-102 | Harus kompatibel dengan Angular **LTS/semver** yang didukung (dinyatakan di dokumentasi). |
| NFR-103 | Tidak bergantung pada Angular Material *Components* — hanya CDK. |
| NFR-104 | Struktur DOM hasil render harus **seminimal mungkin** — tanpa wrapper `<div>`/elemen ekstra yang tidak memiliki keperluan fungsional atau styling. |
| NFR-105 | Output harus tetap **bermakna & dapat diakses tanpa CSS/JS** sejauh elemen native memungkinkan (*progressive enhancement*). |
| NFR-106 | Komponen & directive harus diekspos sebagai entitas **standalone** (`standalone: true`) sehingga dapat diimpor langsung ke standalone component maupun lewat `imports` NgModule. |

### 4.2 Aksesibilitas (a11y)

| ID | Kebutuhan |
| --- | --- |
| NFR-201 | Komponen harus lolos kriteria dasar **WCAG 2.x (level AA)** untuk interaksi yang disediakan. |
| NFR-202 | Semua interaksi penting harus dapat dioperasikan melalui **keyboard**. |
| NFR-203 | Kontras warna tema harus memenuhi rasio kontras yang disyaratkan M3/WCAG pada mode dark & light. |

### 4.3 Performa

| ID | Kebutuhan |
| --- | --- |
| NFR-301 | Ukuran bundle komponen yang dipakai harus **tree-shakeable** (hanya komponen yang diimpor ikut ter-bundle). |
| NFR-302 | Penggunaan CDK harus tidak menimbulkan *change detection* berlebih pada komponen yang idle. |
| NFR-303 | Situs dokumentasi/demo harus dapat dimuat dengan performa wajar (hasil audit Lighthouse ≥ 90 untuk kategori terpilih). |

### 4.4 Kualitas & Pengujian

| ID | Kebutuhan |
| --- | --- |
| NFR-401 | Setiap komponen wajib memiliki **unit test** dan **test aksesibilitas** yang berjalan pada pipeline CI. |
| NFR-402 | Harus ada **snapshot/visual regression test** untuk tema dark & light guna mencegah regresi desain. |
| NFR-403 | Kode harus mengikuti konvensi lint & format yang ditetapkan repository. |

### 4.5 Dokumentasi Kualitas

| ID | Kebutuhan |
| --- | --- |
| NFR-501 | Semua API publik harus memiliki **JSDoc** yang memadai dan muncul pada dokumentasi. |
| NFR-502 | Contoh kode pada dokumentasi harus **selalu sinkron** dengan versi library terbaru (dapat diverifikasi otomatis bila memungkinkan). |

### 4.6 Maintainability

| ID | Kebutuhan |
| --- | --- |
| NFR-601 | Struktur project harus memisahkan **library** (`projects/wui`) dan **dokumentasi/demo** agar rilis library tidak terkontaminasi demo. |
| NFR-602 | Versi library mengikuti **semantic versioning (semver)**. |

---

## 5. Batasan & Asumsi

### 5.1 Batasan (Out of Scope)

- Bukan fork/modifikasi dari Angular Material Components.
- Tidak menyediakan komponen *beyond* scope dokumen Vision pada iterasi pertama (Layout & Sidenav + sistem tema).
- Tidak membuat komponen/API baru bila kebutuhan sudah dapat dipenuhi oleh **elemen HTML native + directive** (prinsip native-first & directive-first).
- Tidak mencakup backend/API server untuk aplikasi pengguna.

### 5.2 Asumsi

- Pengguna akhir memiliki pengetahuan dasar Angular & npm.
- Akses publik ke npmjs.com tersedia untuk proses publish.
- Keputusan detail implementasi (mis. struktur folder) mengikuti `architecture.md` dan dapat disempurnakan saat implementasi.

---

## 6. Kriteria Penerimaan (Ringkasan)

Project **Wajek UI** dianggap selesai untuk iterasi pertama bila:

1. Library ter-publish di **npmjs.com** dan dapat diinstal serta dipakai di aplikasi Angular kosong (smoke test FR-601–FR-604).
2. Tema **dark & light** berbasis M3 dapat diaktifkan dan diganti **runtime** (FR-101–FR-106).
3. Komponen **`Layout`** dan **`Sidenav`** berfungsi penuh, konsisten antar tema, dan aksesibel (FR-201–FR-404).
4. Situs **dokumentasi/demo** menampilkan Getting Started, panduan tema, dan demo interaktif semua komponen (FR-501–FR-505).
5. Seluruh test (unit, a11y, visual) hijau di CI (NFR-401–NFR-403).
6. Seluruh komponen & directive mengikuti prinsip **native-first & directive-first** (FR-405–FR-407) dengan DOM minimal (NFR-104–NFR-105).
7. Seluruh komponen & directive dapat dipakai di **standalone component** dan via NgModule (FR-408, FR-506, NFR-106).
