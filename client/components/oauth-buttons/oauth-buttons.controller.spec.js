'use strict';

describe('Controller: OauthButtonsCtrl', function() {

  // load the controller's module
  beforeEach(module('uwece651f16NewApp'));

  var OauthButtonsCtrl, $window;

  // Initialize the controller and a mock $window
  beforeEach(inject(function($controller) {
    $window = {
      location: {}
    };

    OauthButtonsCtrl = $controller('OauthButtonsCtrl', {
      $window: $window
    });
  }));

  it('should attach loginOauth', function() {
    expect(OauthButtonsCtrl.loginOauth).to.be.a('function');
  });
});
