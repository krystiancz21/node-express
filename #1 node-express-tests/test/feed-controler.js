const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
// const AuthController = require("../controllers/auth");
const FeedController = require("../controllers/feed");
const { name } = require("body-parser");

describe("Feed Controller", function () {
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

  it("should add a created post to the posts of the creator", function (done) {
    const req = {
      body: {
        title: 'Test Post',
        content: 'A Test Post'
      },
      file: {
        path: 'abc'
      },
      userId: '66955b6a4f6f1717e442d061' // bo user ID ma znaczenie 
    };
    const res = {
      status: function () {
        return this;
      }, json: function () { }
    };

    FeedController.createPost(req, res, () => { }).then(savedUser => {
      expect(savedUser).to.have.property('posts');
      expect(savedUser.posts).to.have.length(1);
      done();
    });

    // User.findOne.restore(); // przywrócenie oryginalnej funkcji
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

