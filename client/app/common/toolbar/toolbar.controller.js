class ToolbarController {
  constructor($mdSidenav,$http,$state,dataService){
      'ngInject';
    this.$http = $http;
      this.$mdSidenav = $mdSidenav;
      this.$state = $state;
      this.dataService = dataService;
      this.lists = ['Air tickts', 'Railway tickets', 'Bus', 'Office', 'Hotel','Transport', 'Tour'];
      this.token = sessionStorage.getItem('token');
  }
    open(Id) {
       this.$mdSidenav(Id).open()
    }
    close(id){
      if(event.target.tagName == 'MD-BACKDROP')
      this.$mdSidenav(id).close()
    }
    to(value){
        this.$state.go(value)
    }
    active(){
      this.$mdSidenav('right').close()
      this.dataService.formmodal = true
      this.dataService.scroll.hide()

    }
    logout(){
      let req = {
        method: 'POST',
        url: 'http://ec2-54-88-87-181.compute-1.amazonaws.com:8889/logout',
        headers: {
          Authorization:sessionStorage.getItem('token'),
          "X-Token-Auth":sessionStorage.getItem('token')
        },
        data: {
          token:sessionStorage.getItem('token')
        }
      }
      this.$http(req).then(response => {
        console.log(response)
        sessionStorage.removeItem('token')
        this.token = null
      })
        .catch(response => {
          console.log(response.response)
        })
    }
}

export default ToolbarController;
// ToolbarController.$inject = ['$mdSidenav'];
