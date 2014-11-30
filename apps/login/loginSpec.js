describe('Login ', function () {

  beforeEach(module('login'));

  describe('Controller', function () {

    var loginCtrl, loginFactoryMock, scope;

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

    var loginFactory, httpBackend, $window;

    beforeEach(inject(function (_$window_, $httpBackend, _loginFactory_) {
        //given:
        $window = _$window_;
        loginFactory = _loginFactory_;      
        httpBackend = $httpBackend;
        $window.location.href = { href: sinon.spy()}
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('login calls to the server and the user is logged', function(){

      var result;
      httpBackend.expectPOST('http://localhost:3023/players/login.json').respond({success: true});

      //when:
      loginFactory.login({username:"Stark", password:"S3Cr3T"}, function(error, message){
        //then:
        expect(window.location.href).calledWith('/game/index.html');
        //expect(message).to.equal('bar');
      });
      httpBackend.flush();

    });
  });
});