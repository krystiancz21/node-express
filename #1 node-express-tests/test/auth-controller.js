const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
const AuthController = require("../controllers/auth");
const { name } = require("body-parser");

describe("Auth Controller - Signup", function () {
  before(function (done) {
    mongoose
      .connect(
        'mongodb+srv://s95382:EQFEFlFeZ0ygqpuZ@cluster0.qfslcny.mongodb.net/test-message?retryWrites=true&w=majority'
      ) // test-messages
      .then((result) => {
        const user = new User({
          email: "test@test.com",
          password: "tester",
          name: "Test",
          posts: [],
          _id: "66955b6a4f6f1717e442d061",
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });

  beforeEach(function () {
    // before each test
  });

  afterEach(function () {
    // before each test
  });

  it("should throw an error with code 500 if accessing the database fails", function (done) {
    sinon.stub(User, "findOne"); // atrapa funkcji, która może być używana do symulowania zachowań w testach
    User.findOne.throws(); // symulacja rzucenia błędu za każdym razem, gdy metoda findOne zostanie wywołana

    const req = {
      body: {
        email: "test@test.com",
        password: "tester",
      },
    };

    AuthController.login(req, {}, () => { }).then((result) => {
      // żądanie, pusty obiekt odpowiedzi (res) i pustą funkcję callback.
      // console.log(result);
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
      done(); // test został zakończony po wykonaniu wszystkich asynchronicznych operacji i może przejść do kolejnego testu.
    });

    User.findOne.restore(); // przywrócenie oryginalnej funkcji
  });

  it("should send a response with a valid user status for an existing user", function (done) {
    const req = { userId: "66955b6a4f6f1717e442d061" }; // getUserStatus
    const res = {
      statusCode: 500,
      userStatus: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userStatus = data.status;
      },
    };
    AuthController.getUserStatus(req, res, () => { }).then(() => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.userStatus).to.be.equal('I am new!');
      done();
    });
  });

  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
