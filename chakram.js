console.log('Running the service tests ... ');

var chakram = require('chakram');
expect = chakram.expect;

describe("Getting A Specific User", function() {

    var apiResponse;

    before(function () {
        var userId = 1;
        apiResponse = chakram.get("http://hrboost.herokuapp.com/users/" + userId);
        return apiResponse;
    });

    it("should return 200 on success", function () {
        return expect(apiResponse).to.have.status(200);
    });

    it("should include firstname, lastname, email and password", function () {
        return expect(apiResponse).to.have.schema({
            "id": "number",
            "firstName": "string",
            "lastName": "string",
            "email": "string",
            password: "string"
        });
    });
});

describe("Create a New user", function() {

    var userPost, userObject;

    before("Initialize a new user object for the tests", function () {
        userObject = {
            firstName: "Bob",
            lastName: "Smith",
            email: "bob@gmail.com",
            password: "abc123"
        };
        userPost = chakram.post("http://hrboost.herokuapp.com/users/", userObject);
    });

    it("should return 201 on success", function () {
        return expect(userPost).to.have.status(201);
    });
});

describe("Getting all annotations from user", function() {

    var apiResponse;

    before(function () {
        var userId = 1;
        apiResponse = chakram.get("http://hrboost.herokuapp.com/users/" + userId + "/annotations");
        return apiResponse;
    });

    it("should return 200 on success", function () {
        return expect(apiResponse).to.have.status(200);
    });

    //tobe an array
    it("should return an array of objects", function () {
        return expect(Array.isArray(apiResponse)).to.be.true;
    });

    //select first element of arr and check schema or loop
    it('should have each object have a schema as follows', function() {
        return expect(apiResponse[0]).to.have.schema({
            title: "apple",
            text: "They taste swell",
            timeStamp: "123456",
            type: "How To",
            pinId: "12345",
            pinX: "5678",
            pinY: "09876",
            emoji: 'Aghast',
            border: '987654678',
            image: '98756454758697807867564',
            comments: []
        });
    });
});

describe("passing a website to the backend", function() {
    var websitePost, websiteObject;

    before("Initialize a new website object for the tests", function () {
        var userId = 2;
        var URLHash = encodeURIComponent("abc123.com/def/456");
        websiteObject = {
            specificUrl: URLHash
            //Backend will need to deal with the root url. I.e abc123.com
        };
        websitePost = chakram.post("http://hrboost.herokuapp.com/users/" + userId + "/websites/", websiteObject);
    });

    it("should return 201 on success", function () {
        return expect(websitePost).to.have.status(201);
    });
});

describe("posting an annotation", function() {
    var annotationPost, annotationObject;

    before("Initialize a new annotation object for the tests", function () {
        var userId = 1;
        var websiteId = 1;
        annotationObject = {
            title: "apple",
            text: "They taste swell",
            timeStamp: "123456",
            type: "How To",
            pinId: "12345",
            pinX: "5678",
            pinY: "09876",
            emoji: 'Aghast',
            border: '987654678',
            image: '98756454758697807867564',
            comments: []
        };
        annotationPost = chakram.post("http://hrboost.herokuapp.com/users/" + userId + "/websites/" + websiteId + "/annotations", annotationObject);
    });

    it("should return 201 on success", function () {
        return expect(annotationPost).to.have.status(201);
    });
});

describe("Getting all annotations UXFeed", function() {

    var apiResponse;

    before(function () {
        var userId = 1;
        apiResponse = chakram.get("http://hrboost.herokuapp.com/annotations");
        return apiResponse;
    });

    it("should return 200 on success", function () {
        return expect(apiResponse).to.have.status(200);
    });

    it("should return an array of objects", function () {
        return expect(Array.isArray(apiResponse)).to.be.true;
    });

    //select first element of arr and check schema or loop
    it('should have each object have a schema as follows', function() {
        return expect(apiResponse[0]).to.have.schema({
            title: "apple",
            text: "They taste swell",
            timeStamp: "123456",
            type: "How To",
            pinId: "12345",
            pinX: "5678",
            pinY: "09876",
            emoji: 'Aghast',
            border: '987654678',
            image: '98756454758697807867564',
            comments: []
        });
    });
});

describe("Getting all annotations from a specific url", function() {

    //This one doesn't make any sense. Will need each domain to have unqiue identifier
    //Can use encodeURIComponent(url) to get a hash value that will always return same hash for unique url
    var apiResponse;

    before(function () {
        var websiteId = 1;
        apiResponse = chakram.get("http://hrboost.herokuapp.com/websites/" + websiteId + "/annotations");
        return apiResponse;
    });

    it("should return 200 on success", function () {
        return expect(apiResponse).to.have.status(200);
    });

    it("should return an array of objects", function () {
        return expect(Array.isArray(apiResponse)).to.be.true;
    });

    //select first element of arr and check schema or loop
    it('should have each object have a schema as follows', function() {
        return expect(apiResponse[0]).to.have.schema({
            title: "apple",
            text: "They taste swell",
            timeStamp: "123456",
            type: "How To",
            pinId: "12345",
            pinX: "5678",
            pinY: "09876",
            emoji: 'Aghast',
            border: '987654678',
            image: '98756454758697807867564',
            comments: []
        });
    });
});

describe("Logging in", function() {
    //Umesh says it'll take the users input field object comprised of email and password and somehow auth it on a POST
    var userPost, userObject;

    before("Initialize a new user object for the tests", function () {
        userObject = {
            email: "bclynch7@gmail.com",
            password: "abc123"
        };
        userPost = chakram.post("http://hrboost.herokuapp.com/users/", userObject);
    });
});