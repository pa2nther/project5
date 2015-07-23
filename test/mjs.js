//Use knockout to list Sites
$(function initialize(){
var myLatlng = [
     ['San Francisco Zoo',37.7331,-122.5031],
     ['Lake Merced',37.7094,-122.4958],
     ['Olympic Club',37.7094,-122.4500],
     ['Stern Grove',37.7362,-122.4776]
  ]

var mapOptions = {
    zoom: 9,
    center: new google.maps.LatLng(37.7567,-122.5068)
}

var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

var  points = [
   { title: 'San Francisco Zoo',longitude: 37.7331,lattitude: -122.5031},
    {title: 'Lake Merced', longitude:37.7094,lattitude:-122.4958}
    ];
   


var viewModel = {
  points: ko.observableArray(points),

  query: ko.observable(''),
  
  search: function(value){
    //remove current values
    viewModel.points.removeAll();

    for (var x in points) {
        if(points[x].title.toLowerCase().indexOf(value.toLowerCase())>=0){
        viewModel.points.push(points[x]);
        
        }
    }
  }
};



viewModel.query.subscribe(viewModel.search);

ko.applyBindings(viewModel);

});
