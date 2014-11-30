describe('Login Functionality', function () {

  beforeEach(module('login'));

  describe('Controller', function () {
    
    var loginCtrl,loginFactoryMock,scope;

    beforeEach(inject(function ($controller, $rootScope) {
      //given:
      loginFactoryMock = {login: sinon.spy()};
      scope = $rootScope.$new();
      loginCtrl = $controller('loginCtrl', {
        $scope: scope, loginFactory: loginFactoryMock
      });
    }));

    it('login data should be empty and show error is false', function (){
      expect(scope.login_data.username).to.equal('');
      expect(scope.login_data.password).to.equal('');
      expect(scope.show_error).to.equal(false);
    });

    it('login calls to the login factory', function(){
      //when:
      scope.logIn({});

      //then:
      loginFactoryMock.login.should.have.been.calledOnce 
    });
  });


  describe('Factory', function () {

    var httpBackend, loginFactory, window;

    beforeEach(inject(function ($window, $httpBackend, _loginFactory_) {
      window = $window;
      loginFactory = _loginFactory_;
      httpBackend = $httpBackend;
      loginFactory.navigate = sinon.spy();
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('login function save the token and redirect to the user page', function(){
      
      //given:
      httpBackend.expectPOST('http://localhost:3023/players/login.json').respond({token: 'token'});

      //when:
      loginFactory.login({username: 'ToniStark', password: 'S3Cr3T'}, function(error, _message){});

      httpBackend.flush();

      //then:
      expect(window.localStorage.getItem('my-storage')).to.equal('token');
      sinon.assert.calledWith(loginFactory.navigate, "/apps/user_profile/index.html");
    });
  });
});