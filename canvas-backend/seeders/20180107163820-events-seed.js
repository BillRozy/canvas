'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        title: 'Test1',
        summary: 'Test Summary',
        body: 'Something Important',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        image: 'http://matthewlehner.net/images/webpack-and-phoenix-on-elixir-og-fdd5d4c0.jpg',
        category: 'testing',
      },
      {
        title: 'Test2',
        summary: 'Test Summary 2',
        body: 'Something Important 2',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        image: 'https://cdn-images-1.medium.com/max/1600/1*JjoaPqpdOE2-w1D8UJ3dUQ.jpeg',
        category: 'testing',
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Events', null, {});
  },
};
