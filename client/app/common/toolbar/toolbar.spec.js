import ToolbarModule from './toolbar';
import ToolbarController from './toolbar.controller';
import ToolbarComponent from './toolbar.component';
import ToolbarTemplate from './toolbar.html';

describe('Toolbar', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ToolbarModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ToolbarController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(ToolbarTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = ToolbarComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(ToolbarTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(ToolbarController);
    });
  });
});
