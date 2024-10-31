'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        id: 'bangkit-academy',
        name: 'Bangkit Academy'
      },
      {
        id: 'bootcamp',
        name: 'Bootcamp'
      },
      {
        id: 'iisma',
        name: 'IISMA'
      },
      {
        id: 'kampus-mengajar',
        name: 'Kampus Mengajar'
      },
      {
        id: 'magang-msib',
        name: 'Magang MSIB'
      },
      {
        id: 'student-exchange',
        name: 'Pertukaran Mahasiswa Merdeka'
      },
      {
        id: 'studi-independen',
        name: 'Studi Independen'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
