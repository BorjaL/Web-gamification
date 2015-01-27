describe('Register Functionality', function () {

  beforeEach(module('register'));

  describe('Controller', function () {

  	var registerCtrl,registerFactoryMock,scope;

    beforeEach(inject(function ($controller, $rootScope) {
      //given:
      registerFactoryMock = {register: sinon.stub().callsArgWith(1, "error" )};
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

    it('register data should be empty and show error is false', function (){
      expect(scope.register_data.username).to.equal('');
      expect(scope.register_data.password).to.equal('');
      expect(scope.show_error).to.equal(false);
    });

    it('register data should be empty and show error after an error', function (){
      //when:
      scope.register({});

      //then:
      expect(scope.register_data.username).to.equal('');
      expect(scope.register_data.password).to.equal('');
      expect(scope.show_error).to.equal(true);
    });
  });


  describe('Factory', function () {

  	var httpBackend, registerFactory, window, location;

    beforeEach(inject(function ($window, $httpBackend, $location, _registerFactory_) {
      window = $window;
      registerFactory = _registerFactory_;
      httpBackend = $httpBackend;
      location = $location;
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('register a user redirect me to the user page', function(){

      //given:
      httpBackend.expectPOST('http://localhost:3023/players.json').respond({token: 'token', username: 'ToniStark'});

      //when:
      registerFactory.register({username: 'ToniStark', password: 'S3Cr3T'}, function(error, _message){});

      httpBackend.flush();

      //then:
      expect(window.localStorage.getItem('user_token')).to.equal('token');
      expect(location.path()).to.equal('/ToniStark');
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