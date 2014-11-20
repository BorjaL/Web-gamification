describe('Controller: loginCtrl', function () {

  // load the controller's module
  beforeEach(module('login'));

  var loginCtrl,loginFactoryMock,
    scope;

  // Initialize the controller and a mock scope
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
  })
});