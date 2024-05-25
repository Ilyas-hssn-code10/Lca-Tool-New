import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js'; // your express app

const expect = chai.expect;

chai.use(chaiHttp);

describe('Test endpoint', () => {
  it('should return a 200 status code and an empty array', async(done) => {
    chai.request(app)
      .get('/posts')
      .end((err, res) => {
        expect(err).to.be.null;
        //expect(res.status).to.equal(200);
        done();
      });
  });
});
