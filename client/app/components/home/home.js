import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import ngTable from 'angular-material-data-table';
let homeModule = angular.module('home', [
  uiRouter,
'md.data.table',
    ngTable,
    'ngMaterial'
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'home'
    });
})

.component('home', homeComponent)
  
.name;

export default homeModule;
