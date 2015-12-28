describe('Login', function () {

  beforeEach(module('login', function ($provide) {
    $provide.value('redirectToUrlAfterLogin', { url: '/' });
    $provide.constant('app_config', {api_url:'http://gamisfan.com:3023',send_to_keen:false,keen_data:{projectId:'',writeKey:''}});
  }));

  describe('Controller', function () {

    var loginCtrl, loginFactoryMock, scope;

    beforeEach(inject(function ($controller, $rootScope) {
      loginFactoryMock = {login: sinon.stub().callsArgWith(1, "error" )};
      scope = $rootScope.$new();
      loginCtrl = $controller('loginCtrl', {
        $scope: scope, loginFactory: loginFactoryMock
      });
    }));

    it('login data should be empty and show error is false in the begining', function (){
      expect(scope.login_data.username).to.equal('');
      expect(scope.login_data.password).to.equal('');
      expect(scope.show_error).to.equal(false);
    });

    it('login data should be empty and show error is false after an error', function (){
      scope.logIn({});
      
      expect(scope.login_data.username).to.equal('');
      expect(scope.login_data.password).to.equal('');
      expect(scope.show_error).to.equal(true);
    });

    it('login calls to the login factory', function(){
      scope.logIn({});

      loginFactoryMock.login.should.have.been.calledOnce;
    });
  });


  describe('Factory', function () {

    beforeEach(inject(function ($httpBackend, _$location_, _loginFactory_, _sessionStorageFactory_) {
      loginFactory = _loginFactory_;
      httpBackend = $httpBackend;
      $location = _$location_;
      sessionStorageFactory = _sessionStorageFactory_;
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('login function save the token and redirect to the user page', function(){
      
      //given:
      httpBackend.expectPOST('http://gamisfan.com:3023/players/login.json').respond({token: 'token', username: "ToniStark"});

      //when:
      loginFactory.login({username: 'ToniStark', password: 'S3Cr3T'}, function(error, _message){});

      httpBackend.flush();

      //then:
      expect(sessionStorageFactory.getSessionToken()).to.equal('token');
      expect($location.path()).to.equal('/ToniStark');
    });

    it('a user can not login because of miss some field', function(){
      //given:
      var data = {username: null, password: "S3Cr3T"};

      //when:
      var must_to_be_false = loginFactory.validate_params(data);

      //then
      expect(must_to_be_false).to.be.false;
    });
  });
});