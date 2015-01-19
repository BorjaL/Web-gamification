describe('Register Functionality', function () {

  beforeEach(module('register'));

  describe('Controller', function () {

  	var registerCtrl,registerFactoryMock,scope;

    beforeEach(inject(function ($controller, $rootScope) {
      //given:
      registerFactoryMock = {register: sinon.spy()};
      scope = $rootScope.$new();
      registerCtrl = $controller('registerCtrl', {
        $scope: scope, registerFactory: registerFactoryMock
      });
    }));


    it('register calls to the register factory', function(){
      //when:
      scope.register({});

      //then:
      registerFactoryMock.register.should.have.been.calledOnce 
    });
  });


  describe('Factory', function () {

  	var httpBackend, registerFactory, window;

    beforeEach(inject(function ($window, $httpBackend, _registerFactory_) {
      window = $window;
      registerFactory = _registerFactory_;
      httpBackend = $httpBackend;
      registerFactory.navigate = sinon.spy();
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('register a user redirect me to the user page', function(){

      //given:
      httpBackend.expectPOST('http://localhost:3023/players.json').respond({token: 'token'});

      //when:
      registerFactory.register({username: 'ToniStark', password: 'S3Cr3T'}, function(error, _message){});

      httpBackend.flush();

      //then:
      expect(window.localStorage.getItem('user_token')).to.equal('token');
      expect(window.localStorage.getItem('user_id')).to.equal('ToniStark');
      sinon.assert.calledWith(registerFactory.navigate, "/apps/userProfile/index.html");
    });

    it('a user can not register because the username already exists', function(){

      //given:
      var result = "";
      httpBackend.expectPOST('http://localhost:3023/players.json')
                 .respond(function (method, url, data, headers) {
                    return [409, 'username already exists'];
                 });

      //when:
      registerFactory.register({username: 'ToniStark', password: 'S3Cr3T'}, function(error, _message){result = error});

      httpBackend.flush();

      //then:
      expect(result).to.equal("This username already exists, please choose another one :)");
    });

    it('a user can not register because of miss some field', function(){
      //given:
      var data = {username: null, password: "S3Cr3T"};

      //when:
      var must_to_be_false = registerFactory.validate_params(data);

      //then
      expect(must_to_be_false).to.be.false;
    });

  });
});