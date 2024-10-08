-- CreateEnum
CREATE TYPE "Role" AS ENUM ('koor_mbkm', 'admin_siap', 'dosbing', 'mahasiswa');

-- CreateTable
CREATE TABLE "AdminSiap" (
    "NIP_admin_siap" BIGINT NOT NULL,
    "nama_admin_siap" TEXT NOT NULL,

    CONSTRAINT "AdminSiap_pkey" PRIMARY KEY ("NIP_admin_siap")
);

-- CreateTable
CREATE TABLE "BerkasPenilaian" (
    "id_berkas_penilaian" SERIAL NOT NULL,
    "id_pendaftaran_mbkm" INTEGER NOT NULL,
    "nama_berkas" TEXT NOT NULL,

    CONSTRAINT "BerkasPenilaian_pkey" PRIMARY KEY ("id_berkas_penilaian")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dosbing" (
    "NIP_dosbing" BIGINT NOT NULL,
    "nama_dosbing" TEXT NOT NULL,

    CONSTRAINT "Dosbing_pkey" PRIMARY KEY ("NIP_dosbing")
);

-- CreateTable
CREATE TABLE "KonversiNilai" (
    "id_konversi_nilai" SERIAL NOT NULL,
    "NIP_admin_siap" BIGINT NOT NULL,
    "id_berkas_penilaian" INTEGER NOT NULL,
    "nilai_akhir" INTEGER NOT NULL,
    "grade" TEXT NOT NULL,

    CONSTRAINT "KonversiNilai_pkey" PRIMARY KEY ("id_konversi_nilai")
);

-- CreateTable
CREATE TABLE "KoorMbkm" (
    "NIP_koor_mbkm" BIGINT NOT NULL,
    "nama_koor_mbkm" TEXT NOT NULL,

    CONSTRAINT "KoorMbkm_pkey" PRIMARY KEY ("NIP_koor_mbkm")
);

-- CreateTable
CREATE TABLE "Mahasiswa" (
    "NIM" BIGINT NOT NULL,
    "nama_mahasiswa" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "id_program_mbkm" INTEGER NOT NULL,
    "NIP_dosbing" BIGINT NOT NULL,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("NIM")
);

-- CreateTable
CREATE TABLE "PendaftaranAkun" (
    "id_pendaftaran_akun" SERIAL NOT NULL,
    "NIM" BIGINT NOT NULL,
    "NIP_koor_mbkm" BIGINT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PendaftaranAkun_pkey" PRIMARY KEY ("id_pendaftaran_akun")
);

-- CreateTable
CREATE TABLE "PendaftaranMbkm" (
    "id_pendaftaran_mbkm" SERIAL NOT NULL,
    "NIM" BIGINT NOT NULL,
    "NIP_dosbing" BIGINT NOT NULL,
    "NIP_koor_mbkm" BIGINT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PendaftaranMbkm_pkey" PRIMARY KEY ("id_pendaftaran_mbkm")
);

-- CreateTable
CREATE TABLE "Pengumuman" (
    "id_pengumuman" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "NIP_koor_mbkm" BIGINT NOT NULL,

    CONSTRAINT "Pengumuman_pkey" PRIMARY KEY ("id_pengumuman")
);

-- CreateTable
CREATE TABLE "ProgramMbkm" (
    "id_program_mbkm" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "deskripsi" TEXT,
    "role" TEXT,
    "status" TEXT,
    "date" TIMESTAMP(3),
    "category_id" TEXT NOT NULL,

    CONSTRAINT "ProgramMbkm_pkey" PRIMARY KEY ("id_program_mbkm")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "BerkasPenilaian" ADD CONSTRAINT "BerkasPenilaian_id_pendaftaran_mbkm_fkey" FOREIGN KEY ("id_pendaftaran_mbkm") REFERENCES "PendaftaranMbkm"("id_pendaftaran_mbkm") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KonversiNilai" ADD CONSTRAINT "KonversiNilai_NIP_admin_siap_fkey" FOREIGN KEY ("NIP_admin_siap") REFERENCES "AdminSiap"("NIP_admin_siap") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KonversiNilai" ADD CONSTRAINT "KonversiNilai_id_berkas_penilaian_fkey" FOREIGN KEY ("id_berkas_penilaian") REFERENCES "BerkasPenilaian"("id_berkas_penilaian") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_id_program_mbkm_fkey" FOREIGN KEY ("id_program_mbkm") REFERENCES "ProgramMbkm"("id_program_mbkm") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_NIP_dosbing_fkey" FOREIGN KEY ("NIP_dosbing") REFERENCES "Dosbing"("NIP_dosbing") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendaftaranAkun" ADD CONSTRAINT "PendaftaranAkun_NIM_fkey" FOREIGN KEY ("NIM") REFERENCES "Mahasiswa"("NIM") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendaftaranAkun" ADD CONSTRAINT "PendaftaranAkun_NIP_koor_mbkm_fkey" FOREIGN KEY ("NIP_koor_mbkm") REFERENCES "KoorMbkm"("NIP_koor_mbkm") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendaftaranMbkm" ADD CONSTRAINT "PendaftaranMbkm_NIM_fkey" FOREIGN KEY ("NIM") REFERENCES "Mahasiswa"("NIM") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendaftaranMbkm" ADD CONSTRAINT "PendaftaranMbkm_NIP_dosbing_fkey" FOREIGN KEY ("NIP_dosbing") REFERENCES "Dosbing"("NIP_dosbing") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendaftaranMbkm" ADD CONSTRAINT "PendaftaranMbkm_NIP_koor_mbkm_fkey" FOREIGN KEY ("NIP_koor_mbkm") REFERENCES "KoorMbkm"("NIP_koor_mbkm") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengumuman" ADD CONSTRAINT "Pengumuman_NIP_koor_mbkm_fkey" FOREIGN KEY ("NIP_koor_mbkm") REFERENCES "KoorMbkm"("NIP_koor_mbkm") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramMbkm" ADD CONSTRAINT "ProgramMbkm_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
