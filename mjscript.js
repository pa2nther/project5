// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
var sites 


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

      //add info to listbox
      if (place.name != 'San Francisco Zoo' && place.name != 'Lake Merced')
         sites.innerHTML += '<ul><li><a href=http://www.en.wikipedia.org/wiki/' + place.name + '">'+place.name+"</a></li>";

      var infoM2 = $.getJSON("http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&exsentences=2&titles="+marker.title+"&format=json&formatversion=2&callback=?", function(data) {if(data['query']['pages']['0']['extract'])document.getElementById('i').innerHTML+=data['query']['pages']['0']['extract']; else document.getElementById('i').innerHTML+="No results <br>";console.log(data['query']['pages']['0']['extract']);});
      
      markers.push(marker);

      var infowindow = new google.maps.InfoWindow({
    //  content: infoS+"Click for more info on Wikipedia</a>"

             

  });
       
      google.maps.event.addListener(marker, 'click', function() { 
      infowindow.setContent("<a href='http://www.en.wikipedia.org/wiki/"+this.title+"'>"+"Click for more info on "+this.title+"</a>");
       infowindow.open(map,this);
      });

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });
  // [END region_getplaces]
//Use knockout to list Sites
ko.applyBindings ({
  points: [
   { title: 'San Francisco Zoo',longitude: 37.7331,lattitude: -122.5031},
    {title: 'Lake Merced', longitude:37.7094,lattitude:-122.4958}
    ]
   });
//Array for sites markers, map did not read knockout format
var myLatlng = [
    [ 'San Francisco Zoo', 37.7331, -122.5031],
    [ 'Lake Merced', 37.7094,-122.4958]

   ]



var i;
var marker;
for (i=0;i<myLatlng.length;i++){
  marker=new google.maps.Marker({
  position: new google.maps.LatLng(myLatlng[i][1],myLatlng[i][2]),
  map: map,
  title: myLatlng[i][0]

});

//var infoM = $.getJSON("http://en.wikipedia.org/w/api.php?action=parse&format=json&callback=?", {page:marker.title, prop:"text"}, function(data) {document.getElementById('i').innerHTML="<h3>"+data.parse.title+"</h3>"+data.parse.text[0];console.log(data.parse.text[1]);});
var infoM2 = $.getJSON("http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&exsentences=2&titles="+marker.title+"&format=json&formatversion=2&callback=?", function(data) {document.getElementById('i').innerHTML+=data['query']['pages']['0']['extract'];console.log(data['query']['pages']['0']['extract']);});
//var info2 = $.ajax("https://www.en.wikipedia.org/w/api.php?action=query&titles="+marker.title+"Page&prop=extracts&exinfor&rvprop=content&format=jsonfm",function(data){console.log(data)});


 var infoS="<a href='http://www.en.wikipedia.org/wiki/"+marker.title+"'>" ;

 //Setting the content within the listner instead
  var infowindow = new google.maps.InfoWindow({
    //  content: infoS+"Click for more info on Wikipedia</a>"

                  

  });

//Adds infowindow when the marker is clicked
google.maps.event.addListener(marker, 'click', function() { 
 infowindow.setContent("<a href='http://www.en.wikipedia.org/wiki/"+this.title+"'>"+"Click for more info on "+this.title+"</a>");
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
 $('#listbx').collapsible('default-open');
// ko.applyBindings(myLatlngK);
}
google.maps.event.addDomListener(window, 'load', initialize);
