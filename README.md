# SI-MBKM REST API - Teknik Komputer UNDIP

SI-MBKM (Sistem Informasi MBKM) adalah aplikasi web yang dikembangkan untuk mendukung pencatatan dan pengelolaan seluruh aktivitas program Merdeka Belajar Kampus Merdeka (MBKM) di Departemen Teknik Komputer Universitas Diponegoro.

## 🔧 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Token)
- **File Upload**: Multer
- **Documentation**: Swagger (opsional)

## 📌 Fitur REST API

### 1. Autentikasi & Otorisasi
- Login dan registrasi mahasiswa
- Middleware autentikasi JWT
- Role-based access control untuk Mahasiswa, Koor MBKM, Admin SIAP, dan Dosbing

### 2. Manajemen Akun & Pendaftaran
- CRUD akun mahasiswa dan dosbing
- Pendaftaran MBKM beserta unggah dokumen: CV, Transkrip, KTP, Sertifikat, dan dokumen tambahan

### 3. Program MBKM
- CRUD data program oleh Koor MBKM
- Filter program berdasarkan kategori, status, dan periode

### 4. Penilaian & Konversi Nilai
- Input dan update penilaian oleh dosbing dan admin
- Proses konversi nilai ke sistem akademik

### 5. Pengumuman
- CRUD pengumuman oleh Koor MBKM
- Mahasiswa hanya dapat melihat (read-only)

## 📂 Struktur Endpoint (Contoh)
```
POST    /auth/login
POST    /auth/register
GET     /program-mbkm
POST    /program-mbkm (role: Koor MBKM)
POST    /pendaftaran (role: Mahasiswa)
POST    /upload/cv (role: Mahasiswa)
GET     /berkas-penilaian/:id (role: Dosbing, Admin)
```
> Semua endpoint diamankan dengan JWT dan middleware peran.

## 📎 Dokumentasi
Jika menggunakan Swagger:
Buka `/docs` di browser setelah menjalankan server.

## 🚀 Cara Menjalankan
```bash
git clone https://github.com/yourusername/si-mbkm-backend.git
cd si-mbkm-backend
npm install
npx sequelize db:migrate
npm start
```

## 📫 Kontak
Dikembangkan oleh Rizal Agatha Erdin Agesyah  
Email: rizalagatha1403@gmail.com  
GitHub: https://github.com/rizalagatha
