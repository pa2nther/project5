// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
var sites;


function initialize() {

  var markers = [];
  
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(37.7567, -122.5068),
      new google.maps.LatLng(37.4567, -122.2068));
  map.fitBounds(defaultBounds);
  sites = document.getElementById('listbx1'); //adds search results listbx
  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();
    
    
    if (places.length == 0) {
      return;
    }
    document.getElementById('listbx1').innerHTML=" "; //clear the div for new entries
    document.getElementById('i').innerHTML="from Wikipeadia <br>";
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }
    
    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });
      //not using listbox for list at this time
      //add info to listbox
      if (place.name != 'San Francisco Zoo' && place.name != 'Lake Merced')
         sites.innerHTML += "<li>"+place.name+"</li>";

      var infoM2a = $.getJSON("http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&exsentences=2&titles="+marker.title+"&format=json&formatversion=2&callback=?", function(data) {if(data['query']['pages']['0']['extract'] && navigator.online)document.getElementById('i').innerHTML+=data['query']['pages']['0']['extract']; else document.getElementById('i').innerHTML+="No results <br>";console.log(data['query']['pages']['0']['extract']);});
      
      markers.push(marker);

      var infowindow = new google.maps.InfoWindow({
    //  content: infoS+"Click for more info on Wikipedia</a>"
          

  });
       
      google.maps.event.addListener(marker, 'click', function() { 
      var infoM2a = $.getJSON("http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&exsentences=2&titles="+this.title+"&format=json&formatversion=2&callback=?", function(data) {if(data['query']['pages']['0']['extract'])infowindow.setContent(data['query']['pages']['0']['extract']+"<p>from Wikipedia</p>"); else infowindow.setContent("No results for the location from Wikipedia");}).fail(function(data,textStatus,error){console.log("Error"+errorK);infowindow.setContent("connection error");});

      //infowindow.setContent("<a href='http://www.en.wikipedia.org/wiki/"+this.title+"'>"+"Click for more info on "+this.title+"</a>");
       infowindow.open(map,this);
      });

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });
  // [END region_getplaces]




   

//Array for sites markers, map did not read knockout format
var myLatlng = [
    [ 'San Francisco Zoo', 37.7331, -122.5031],
    [ 'Lake Merced', 37.7094,-122.4958]

   ];



var i;
var marker;
var sMarker = []; //Array to hold markers for later use
for (i=0;i<myLatlng.length;i++){
  marker=new google.maps.Marker({
  position: new google.maps.LatLng(myLatlng[i][1],myLatlng[i][2]),
  map: map,
  title: myLatlng[i][0]
});
  sMarker.push(marker);

//var infoM2 = $.getJSON("http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&exsentences=2&titles="+marker.title+"&format=json&formatversion=2&callback=?", function(data) {document.getElementById('i').innerHTML+="<li class="+marker.title+">"+data['query']['pages']['0']['extract']+"</li>";console.log(data['query']['pages']['0']['extract']);})
//.fail(function(){
//  alert('No connection');
//});
//var ifw=[];
//var infoM3 = $.getJSON("http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&exsentences=2&titles="+marker.title+"&format=json&formatversion=2&callback=?", function(data) { ifw.push(data['query']['pages']['0']['extract']);console.log(data['query']['pages']['0']['extract']);})
//.fail(function(){
//  alert('No connection');
//});

//var infoS="<a href='http://www.en.wikipedia.org/wiki/"+marker.title+"'>" ;

 //Setting the content within the listner instead
var infowindow = new google.maps.InfoWindow({
    //  content: infoS+"Click for more info on Wikipedia</a>"
  });


//Adds infowindow when the marker is clicked
google.maps.event.addListener(marker, 'click', function() { 
 var infoMc = $.getJSON("http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&exsentences=2&titles="+this.title+"&format=json&formatversion=2&callback=?", function(data) {infowindow.setContent("<li class="+this.title+">"+data['query']['pages']['0']['extract']+"</li><p> from Wikipedia</p>");})
.error(function(){
  alert('No connection');
});
  //infowindow.setContent("<a href='http://www.en.wikipedia.org/wiki/"+this.title+"'>"+"Click for more info from Wikipedia on "+this.title+"</a>");
 infowindow.open(map,this);
   
   // var infoM2 = $.getJSON("http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&exsentences=2&titles="+marker.title+"&format=json&formatversion=2&callback=?", function(data) {foreach (data['query']['pages'] as pages )document.getElementById('i').innerHTML=data['query']['pages']['0']['extract'];console.log(data['query']['pages']['0']['extract']);})
  });

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}

//Use knockout to list Sites

 var  points = [
  {title: 'San Francisco Zoo',longitude: "37.7331",lattitude: "-122.5031"},
  {title: 'Lake Merced', longitude:"37.7094",lattitude:"-122.4958"}
    ];
   


var viewModel = function(){

  var self = this;

  self.points = ko.observableArray(points);
  
  self.query = ko.observable('');

  self.search = ko.computed(function(){
      
      for (var i=0;i<points.length;i++){//loop to make the markers appear with the search 
      console.log(sMarker[i].title);
      if(sMarker[i].title.indexOf(self.query().toLowerCase())<0)
       sMarker[i].setMap(null);
     else
       sMarker[i].setMap(map);
    }
      return ko.utils.arrayFilter(self.points(), function(point){

      return point.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
      //console.log(point.title);
    });
    
      });
};



ko.applyBindings(viewModel );

 $('#listbx').collapsible('default-open');
 
}
google.maps.event.addDomListener(window, 'load', initialize);
