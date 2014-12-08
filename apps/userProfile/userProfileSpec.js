describe('User profile ', function () {

  beforeEach(module('user_profile'));

  describe('Controller', function () {

    var userProfileCtrl, userProfileFactoryMock, scope;

    beforeEach(inject(function ($controller, $rootScope) {
      //given:
      userProfileFactoryMock = {userInfo: sinon.spy(), redirectToLogin: sinon.spy()};
      scope = $rootScope.$new();
      userProfileCtrl = $controller('userProfileCtrl', {
        $scope: scope, userProfileFactory: userProfileFactoryMock
      });
    }));

    it('call to the factory for the user info if there is a token', function(){
      //given:
      userProfileFactoryMock.hasToken = sinon.stub().returns(true);

      //when:
      scope.initUserInfo({});

      //then:
      userProfileFactoryMock.userInfo.should.have.been.calledOnce;
    });

    it('if there is no token redirect to login page', function(){
      //given:
      userProfileFactoryMock.hasToken = sinon.stub().returns(false);

      //when:
      scope.initUserInfo({});

      //then:
      userProfileFactoryMock.redirectToLogin.should.have.been.calledOnce;
    });
  });


  describe('Factory', function () {
    var httpBackend, userProfileFactory, window;

    beforeEach(inject(function ($window, $httpBackend, _userProfileFactory_) {
      window = $window;
      userProfileFactory = _userProfileFactory_;
      httpBackend = $httpBackend;
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    
  });
});