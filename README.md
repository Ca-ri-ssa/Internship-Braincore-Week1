﻿# 3: Otentikasi, Keamanan, dan Pengujian
### Tugas
1. Implementasi Otentikasi:
- Tambahkan fitur login dengan token JWT pada aplikasi Anda.
2. Keamanan dan Pengujian:
- Implementasikan HTTPS dan keamanan dasar.
- Tulis test untuk endpoint API Anda dan pastikan semuanya berfungsi dengan baik.

## Instruksi
### 1. Clone Repository
```
git clone -b tugas3 https://github.com/Ca-ri-ssa/Internship-Braincore-Week1.git 
```

### 2. Install All Dependency
```
bun install
```

### 3. Run Unit Test
```
bun test
```
Jika ingin menjalankan testing hanya pada ``index.test.ts``:
```
bun test:1
```
Jika ingin menjalankan testing hanya pada ``authentication.test.ts``:
```
bun test:2
```

### 4. Environment Variable
Pada proyek ini, adanya penggunaan variabel environment untuk menyimpan secret key dari JWT.
```ls
JWT_SECRET_KEY = "<ISI SECRET KEY ANDA>"
```

### 5. Run the Code!
Untuk menjalankan program dari server Bun, dapat dilakukan dengan menggunakan command di bawah ini:
```
bun run dev
```
Server akan berjalan pada http://localhost:3000.