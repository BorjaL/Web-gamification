describe('Header', function () {

  beforeEach(module('header'));

  describe('Controller', function () {

    var headerCtrl, headerFactoryMock, scope;

    beforeEach(inject(function ($controller, $rootScope) {
      //given:
      headerFactoryMock = {logOut: sinon.spy(), isTokenActive: sinon.spy()};
      scope = $rootScope.$new();
      headerCtrl = $controller('headerCtrl', {
        $scope: scope, headerFactory: headerFactoryMock
      });
    }));

    it('if we log out we call header factory log out', function (){
      //when:
      scope.logOut();

      //then:
      headerFactoryMock.logOut.should.have.been.calledOnce 
    });

  it('if we ask if the sesion is active we call header factory', function (){
      //when:
      scope.isTokenActive();

      //then:
      headerFactoryMock.isTokenActive.should.have.been.calledOnce 
    });
  });


  describe('Factory', function () {

    var headerFactory, window;

    beforeEach(inject(function ($window, _headerFactory_) {
      window = $window;
      headerFactory = _headerFactory_;
      headerFactory.redirect = sinon.spy();
    }));

    it('logOut function delete token from local storage', function(){
      
      //given:
      window.localStorage.setItem('user_token', 'user_token');

      //when:
      headerFactory.logOut();

      //then:
      expect(window.localStorage.getItem('user_token')).to.be.null;
    });

    it('the session is active if there is a token in the local storage', function(){
      //given:
      window.localStorage.setItem('user_token', 'user_token');

      //when:
      result = headerFactory.isTokenActive();

      //then:
      expect(result).to.be.true;
    });

    it('the session is not active if there is not a token in the local storage', function(){
      //given:
      window.localStorage.removeItem('user_token');

      //when:
      result = headerFactory.isTokenActive();

      //then:
      expect(result).to.be.false;
    });
  });
});