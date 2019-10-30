import dialog from './dialog/dialog.html'

class HomeController {
    data = [
        {
            id: 1,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 2,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 3,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 4,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 5,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 6,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 7,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 8,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 9,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 10,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 11,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 12,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 13,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 14,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 15,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 16,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 17,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 18,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 19,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 20,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 21,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 22,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 23,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 24,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 25,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 26,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },{
            id: 27,
            title: 'rewerwe',
            content: '432234234234',
            status: 'new'
        },
    ];
    rendererData = [];
    query = {
        order: 'name',
        limit: 5,
        page: 1
    };
    selected = [];
    states = ['New', 'Completed', 'Not Completed'];

    constructor($mdDialog) {
        this.$mdDialog = $mdDialog;
        this.getPagesData()
    }

    getPagesData = (e) => {
        e ? this.query.order = e : e = this.query.order;

        const page = this.query.page;
        const limit = this.query.limit;

        let arr = [...this.data];

        if(e === 'id'){
            arr = arr.sort()
        }
        if(e === 'title'){
            arr = arr.sort((a, b) =>{
                let nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0
            })
        }

        if(typeof e === 'string' && e.indexOf('-') > -1){
            arr = arr.reverse()
        }

        const start = page ? (page - 1) * limit : 0;

        this.rendererData = arr.splice(start, limit);
    };

    total = () => this.data.length;

    completed = () => this.count('Completed');

    notCompleted = () => this.count('Not Completed');

    count = (string) => {
        if(this.total() > 0) {
            const filter = [...this.data].filter(item => item.status === string);
            return filter.length;
        } else {
            return 0;
        }
    };

    isSelectedItems = () => this.selected.length > 0;

    add = (event) => {
        event.stopPropagation();

        this.$mdDialog.show({
            controller: DialogController,
            templateUrl: 'app/components/home/dialog/dialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            controllerAs:'userForm',
            clickOutsideToClose:true,
            fullscreen: '400px'
        })
            .then((answer) => {
                answer.status = 'New';
                const last = this.data[this.data.length - 1];
                answer.id = last ? last.id + 1 : 1;
                this.data.push(answer);
                this.getPagesData();
            }, (err) =>  {
                console.log(err)
            });
    };

    delete = (event) => {
        event.stopPropagation();

        const confirm = this.$mdDialog.confirm()
            .title('Would you like to delete?')
            .textContent('Delete selected items')
            .ariaLabel('Lucky day')
            .targetEvent(event)
            .ok('confirm')
            .cancel('cancel');

        this.$mdDialog.show(confirm).then(() => {
            this.selected.forEach(item => {
                let index = '';
                this.data.find((findItem, ind) => findItem.id === item.id && (index = ind));
                typeof index === 'number' && this.data.splice(index, 1);
            });
            this.selected = [];
            this.getPagesData();
        });
    };


}

function DialogController($mdDialog) {
    this.cancel = function() {
        $mdDialog.cancel();
    };
    this.answer = function(answer) {
        let arr = answer.$getControls();
        if(answer.$valid) {
            const controls = {};
            arr.forEach(item => controls[item.$name] =item.$viewValue);
            $mdDialog.hide(controls)
        }
    };
}

HomeController.$inject = ['$mdDialog'];
DialogController.$inject = ['$mdDialog'];

export default HomeController;
