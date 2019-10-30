import angular from 'angular';
import uiRouter from 'angular-ui-router';
import toolbarComponent from './toolbar.component';
let toolbarModule = angular.module('toolbar', [
  uiRouter,
  'ngMaterial'
])

.component('toolbar', toolbarComponent)

.name;

export default toolbarModule;
