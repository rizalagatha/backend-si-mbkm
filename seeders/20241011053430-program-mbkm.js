'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('program_mbkm', [
      {
        id_program_mbkm: 7,
        company: "SoftWorks",
        deskripsi: null,
        role: "UX Designer",
        status: "Active",
        date: "2024-10-10T07:03:30.000Z",
        category_id: "magang-msib"
      },
      {
        id_program_mbkm: 5,
        company: "TechGuru",
        deskripsi: null,
        role: "Product Manager",
        status: "Active",
        date: "2024-10-10T07:02:26.000Z",
        category_id: "magang-msib"
      },
      {
        id_program_mbkm: 4,
        company: "Innovate Inc.",
        deskripsi: null,
        role: "Fullstack Developer",
        status: "Inactive",
        date: "2024-10-10T07:01:55.000Z",
        category_id: "magang-msib"
      },
      {
        id_program_mbkm: 1,
        company: "Dell",
        deskripsi: null,
        role: "Frontend Developer",
        status: "Active",
        date: "2024-10-10T06:56:36.000Z",
        category_id: "magang-msib"
      },
      {
        id_program_mbkm: 6,
        company: "Dicoding Indonesia",
        deskripsi: null,
        role: "Mentor Android Developer",
        status: "Active",
        date: "2024-10-10T07:03:00.000Z",
        category_id: "kampus-mengajar"
      },
      {
        id_program_mbkm: 3,
        company: "WebTech",
        deskripsi: null,
        role: "Mentor UI Designer",
        status: "Active",
        date: "2024-10-10T07:01:23.000Z",
        category_id: "kampus-mengajar"
      },
      {
        id_program_mbkm: 2,
        company: "TechCorp",
        deskripsi: null,
        role: "Backend Developer",
        status: "Active",
        date: "2024-10-10T07:00:33.000Z",
        category_id: "kampus-mengajar"
      },
      {
        id_program_mbkm: 9,
        company: "Harvard University",
        deskripsi: null,
        role: "Visiting Student",
        status: "Active",
        date: "2024-10-10T07:04:32.000Z",
        category_id: "iisma"
      },
      {
        id_program_mbkm: 8,
        company: "Cambridge University",
        deskripsi: null,
        role: "Visiting Lecturer",
        status: "Active",
        date: "2024-10-10T07:03:58.000Z",
        category_id: "iisma"
      },
      {
        id_program_mbkm: 10,
        company: "Denpasar University",
        deskripsi: null,
        role: "Visiting Student",
        status: "Active",
        date: "2024-10-10T07:06:27.000Z",
        category_id: "student-exchange"
      },
      {
        id_program_mbkm: 13,
        company: "Google, GoTo, and Traveloka",
        deskripsi: null,
        role: "Machine Learning Cohort",
        status: "Active",
        date: "2024-10-10T07:08:09.000Z",
        category_id: "bangkit-academy"
      },
      {
        id_program_mbkm: 12,
        company: "Google, GoTo, and Traveloka",
        deskripsi: null,
        role: "Mobile Programming Cohort",
        status: "Active",
        date: "2024-10-10T07:07:38.000Z",
        category_id: "bangkit-academy"
      },
      {
        id_program_mbkm: 11,
        company: "Google, GoTo, and Traveloka",
        deskripsi: null,
        role: "Cloud Computing Cohort",
        status: "Active",
        date: "2024-10-10T07:07:11.000Z",
        category_id: "bangkit-academy"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('program_mbkm', null, {});
  }
};
