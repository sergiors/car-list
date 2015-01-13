var App = App || {};

(function() {
    'use strict';

    var Content = App.Content
      , Sidebar = App.Sidebar;

    var Bootstrap = React.createClass({
        getInitialState: function() {
            return {
                cars: []
            }
        },
        
        componentWillMount: function() {
            Backbone.Events.on('sync:cars', function(cars) {
                this.setState({cars: cars});
            }.bind(this));
        },
        
        componentWillUnmount: function() {
            Backbone.Events.off('sync:cars');
        },

        render: function() {
            return (
                <div>
                    <Sidebar cars={this.state.cars} />
                    <Content />
                </div>
            );
        }
    });

    var router = new App.Router(function() {
        Backbone.history.start();
    });

    var cars = router.cars
      , mount = document.getElementById('bootstrap');

    React.render(<Bootstrap />,mount);
})();
