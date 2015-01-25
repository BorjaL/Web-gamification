describe('User profile ', function () {

  beforeEach(module('userProfile'));

  describe('Controller', function () {

    var userProfileCtrl, userProfileFactoryMock, scope;

    beforeEach(inject(function ($controller, $rootScope) {
      //given:
      userProfileFactoryMock = {userInfo: sinon.spy(), redirectToLogin: sinon.spy(), hasToken: sinon.spy()};
      scope = $rootScope.$new();
      userProfileCtrl = $controller('userProfileCtrl', {
        $scope: scope, userProfileFactory: userProfileFactoryMock
      });
    }));

    it('call to the factory for the user info if there is a token', function(){
      //given:
      userProfileFactoryMock.hasToken = sinon.stub().returns(true);

      //when:
      scope.initUserInfo();

      //then:
      userProfileFactoryMock.userInfo.should.have.been.calledOnce;
    });

    it('if there is no token redirect to login page', function(){
      //given:
      userProfileFactoryMock.hasToken = sinon.stub().returns(false);

      //when:
      scope.initUserInfo();

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
      userProfileFactory.redirectToHome = sinon.spy();
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('test if there are a token in the local storage', function(){
      //given:
      window.localStorage.setItem('user_token', 'token');

      //when:
      var has_token = userProfileFactory.hasToken();

      //then:
      has_token.should.to.be.true;
    });

    it('the user info is given from the server', function(){
      //given:
      window.localStorage.setItem('user_id', 'username');
      window.localStorage.setItem('user_token', 'token');
      httpBackend.expectGET('http://localhost:3023/players/username?access_token=token').respond({username: 'username'});

      //when:
      userProfileFactory.userInfo(function(error, user_info){
        //then:
        assert(user_info.username === "username")
      });
      httpBackend.flush();

      
    });

    it('redirect to the main page when there is no permissions', function(){
      //given:
      window.localStorage.setItem('user_id', 'username');
      window.localStorage.setItem('user_token', 'token');
      httpBackend.expectGET('http://localhost:3023/players/username?access_token=token').respond(403);

      //when:
      var user_info = userProfileFactory.userInfo({token: 'token'}, function(error, _message){});
      httpBackend.flush();

      //then:
      userProfileFactory.redirectToHome.should.have.been.calledOnce;
    });
    
  });
});