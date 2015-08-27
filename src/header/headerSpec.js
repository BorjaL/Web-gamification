describe('Header', function () {

  beforeEach(module('header'));

  describe('Controller', function () {

    var headerCtrl, headerFactoryMock, scope;

    beforeEach(inject(function ($controller, $rootScope) {
      headerFactoryMock = {logOut: sinon.spy(), isTokenActive: sinon.spy(), getUsernameFromStorage: sinon.spy()};
      scope = $rootScope.$new();
      headerCtrl = $controller('headerCtrl', {
        $scope: scope, headerFactory: headerFactoryMock
      });
    }));

    it('if we log out we call header factory log out', function (){
      //when:
      scope.logOut();

      //then:
      headerFactoryMock.logOut.should.have.been.calledOnce;
    });

    it('if we ask if the sesion is active we call header factory', function (){
      //when:
      scope.isTokenActive();

      //then:
      headerFactoryMock.isTokenActive.should.have.been.calledOnce;
    });
  });


  describe('Factory', function () {

    var headerFactory, sessionStorageFactory;

    beforeEach(inject(function (_sessionStorageFactory_, _headerFactory_) {
      sessionStorageFactory = _sessionStorageFactory_;
      sessionStorageFactory.removeSessionInfo = sinon.spy();
      sessionStorageFactory.hasSessionToken = sinon.spy()
      headerFactory = _headerFactory_;
      headerFactory.redirect = sinon.spy();
    }));

    it('logOut function delete token from local storage and redirect', function(){

      //when:
      headerFactory.logOut();

      //then:
      sessionStorageFactory.removeSessionInfo.should.have.been.calledOnce;
      headerFactory.redirect.should.have.been.calledOnce;
    });

    it('the session is active if there is a token in the local storage', function(){

      //when:
      result = headerFactory.isTokenActive();

      //then:
      sessionStorageFactory.hasSessionToken.should.have.been.calledOnce
    });
  });

});