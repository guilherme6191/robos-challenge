const request = require('supertest');
const server = require('../../server');

describe('GET /', () => {
  it('should render ok', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });
});
