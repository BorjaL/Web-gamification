describe('User profile ', function () {

  beforeEach(module('userProfile'));

  describe('Controller', function () {

    var userProfileCtrl, userProfileFactoryMock, scope;

    beforeEach(inject(function ($controller, $rootScope) {
      //given:
      userProfileFactoryMock = {userInfo: sinon.spy(), redirectToLogin: sinon.spy(), hasToken: sinon.spy()};
      scope = $rootScope.$new();
      userProfileCtrl = $controller('userProfileCtrl', {
        $scope: scope, $routeParams: {username: "TonyStark"}, userProfileFactory: userProfileFactoryMock
      });
    }));

    it('call to the factory for the user info if there is a token', function(){

      //when:
      scope.initUserInfo();

      //then:
      userProfileFactoryMock.userInfo.should.have.been.calledOnce;
    });
  });


  describe('Factory', function () {
    var httpBackend, userProfileFactory, window, location;

    beforeEach(inject(function ($window, $httpBackend, $location, _userProfileFactory_) {
      window = $window;
      userProfileFactory = _userProfileFactory_;
      httpBackend = $httpBackend;
      location = $location;
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
      window.localStorage.removeItem('user_token');
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
      window.localStorage.setItem('user_token', 'token');
      httpBackend.expectGET('http://localhost:3023/players/username?access_token=token').respond({player: {username: 'username'}, is_owner: false});

      //when:
      userProfileFactory.userInfo("username", function(error, user_info, is_owner){
        //then:
        assert(user_info.username === "username")
      });
      httpBackend.flush();
    });



    it('server gives us an error', function(){
      //given:
      httpBackend.expectGET('http://localhost:3023/players/username?access_token=null').respond(500);

      //when:
      userProfileFactory.userInfo("username", function(error, user_info, is_owner){
      	//then:
        assert(error == "Something goes wrong :S")
      });

      httpBackend.flush();
    });


    it('show different message when visiting other player profile', function(){
      //given:
      window.localStorage.setItem('user_token', 'token');
      httpBackend.expectGET('http://localhost:3023/players/username?access_token=token').respond(403);

      //when:
      var user_info = userProfileFactory.userInfo("username", function(error, user_info, is_owner){
          //then:
          assert(error === null)
          assert(user_info === null)
          assert(is_owner === false)
      });
      httpBackend.flush();
    });
    
  });
});