ddescribe('md-input-container directive', function() {
  beforeEach(module('material.components.input'));

  function setup(attrs) {
    var container;
    inject(function($rootScope, $compile) {
      container = $compile('<md-input-container><input ' +(attrs||'')+ '></md-input-container>')($rootScope);
      $rootScope.$apply();
    });
    return container;
  }

  it('should set focus class on container', function() {
    var el = setup();
    expect(el).not.toHaveClass('md-input-focused');

    el.find('input').triggerHandler('focus');
    expect(el).toHaveClass('md-input-focused');

    el.find('input').triggerHandler('blur');
    expect(el).not.toHaveClass('md-input-focused');
  });

  it('should set has-value class on container for non-ng-model input', function() {
    var el = setup();
    expect(el).not.toHaveClass('md-input-has-value');

    el.find('input').val('123').triggerHandler('input');
    expect(el).toHaveClass('md-input-has-value');

    el.find('input').val('').triggerHandler('input');
    expect(el).not.toHaveClass('md-input-has-value');
  });

  it('should set has-value class on container for ng-model input', inject(function($rootScope) {
    $rootScope.value = 'test';
    var el = setup('ng-model="$root.value"');
    expect(el).toHaveClass('md-input-has-value');

    $rootScope.$apply('value = "3"');
    expect(el).toHaveClass('md-input-has-value');

    $rootScope.$apply('value = null');
    expect(el).not.toHaveClass('md-input-has-value');
  }));

});
