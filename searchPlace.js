
var map;
var infowindow;
var nMarkerArr = []; //For 'nearby' markers

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7577, lng: -122.4376},
    zoom: 10
  });

  var service = new google.maps.places.PlacesService(map);//For 'nearby' funct
  var input = document.getElementById('pac-input');
  var autocomplete = new google.maps.places.Autocomplete(input);
  var marker = new google.maps.Marker({
    map: map
  });

  infowindow = new google.maps.InfoWindow();
  autocomplete.bindTo('bounds', map);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);


  //Append HTML elemnts for sideBar and hide from initial view. Including this in 'click listener' reults in appending multiple sideBar elements
  $("#menu").append("<h5>Place Info</h5> <div id='placeInfo'> <p></p> </div> <h5>Nearby</h5> <div id='nearby'></div> <h5>Photos</h5> <div id='placePhotos'></div>").hide("fast");


  //When search button is clicked, set marker and render sideBar
  document.getElementById('searchBut').addEventListener('click', function() {
    //infowindow.close();
    deleteMarkers(); //Remove any previos 'nearby' blue markers

    //Help user by autocompleting partial entry
    var place = autocomplete.getPlace();
    var photos = place.photos;
    var picClick = 0;

    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    // Set the position of the marker using the place ID and location.
    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location
    });
    marker.setVisible(true);


    //Style the sideBar
    $(function() {
      $( "#menu" ).accordion({collapsible: true, active: false, heightStyle:"content"});
    });
    $("#menu").show("fast");
    $(".sideBar").animate({ left:'+=50px'}, 1000);
    $(".sideBar").animate({ left:'-=50px'}, 1000);



    //Setup elements for 'info' funct
    document.getElementById("placeInfo").innerHTML = '<img src="' + place.icon + '"><br><strong>' + place.name + '</strong><br>' +
        '<br>' + place.formatted_address + '<br>' + place.international_phone_number + '<br><a href="' + place.website + '" target="_blank">Website</a>';


    //Setup dropdown elements for 'nearby' funct
    document.getElementById("nearby").innerHTML = '<select id="selector">'+
    '<option>Explore Nearby...</option>'+
    '<option value="accounting">Accounting</option>'+
    '<option value="airport">Airport</option>'+
    '<option value="amusement_park">Amusement Park</option>'+
    '<option value="aquarium">Aquarium</option>'+
    '<option value="art_gallery">Art Gallery</option>'+
    '<option value="atm">ATM</option>'+
    '<option value="bakery">Bakery</option>'+
    '<option value="bank">Bank</option>'+
    '<option value="bar">Bar</option>'+
    '<option value="beauty_salon">Beauty Salon</option>'+
    '<option value="bicycle_store">Bicycle Store</option>'+
    '<option value="book_store">Book Store</option>'+
    '<option value="bowling_alley">Bowling Alley</option>'+
    '<option value="bus_station">Bus Station</option>'+
    '<option value="cafe">Cafe</option>'+
    '<option value="campground">Campground</option>'+
    '<option value="car_dealer">Car Dealer</option>'+
    '<option value="car_rental">Car Rental</option>'+
    '<option value="car_repair">Car Repair</option>'+
    '<option value="car_wash">Car Wash</option>'+
    '<option value="casino">Casino</option>'+
    '<option value="cemetery">Cemetery</option>'+
    '<option value="church">Church</option>'+
    '<option value="city_hall">City Hall</option>'+
    '<option value="clothing_store"> Clothing Store</option>'+
    '<option value="convenience_store">Convenience Store</option>'+
    '<option value="courthouse">Court House</option>'+
    '<option value="dentist">Dentist</option>'+
    '<option value="department_store">Department Store</option>'+
    '<option value="doctor">Doctor</option>'+
    '<option value="electrician">Electrician</option>'+
    '<option value="electronics_store">Electronics Store</option>'+
    '<option value="embassy">Embassy</option>'+
    '<option value="establishment">Establishment</option>'+
    '<option value="finance">Finance</option>'+
    '<option value="fire_station">Fire Station</option>'+
    '<option value="florist">Florist</option>'+
    '<option value="food">Food</option>'+
    '<option value="funeral_home">Funeral Home</option>'+
    '<option value="furniture_store">Furniture Store</option>'+
    '<option value="gas_station">Gas Station</option>'+
    '<option value="general_contractor">General Contractor</option>'+
    '<option value="grocery_or_supermarket">Grocery/Supermarket</option>'+
    '<option value="gym">Gym</option>'+
    '<option value="hair_care">Hair Care</option>'+
    '<option value="hardware_store">Hardware Store</option>'+
    '<option value="health">Health</option>'+
    '<option value="hindu_temple">Hindu Temple</option>'+
    '<option value="home_goods_store">Home Goods Store</option>'+
    '<option value="hospital">Hospital</option>'+
    '<option value="insurance_agency">Insurance Agency</option>'+
    '<option value="jewelry_store">Jewelry Store</option>'+
    '<option value="laundry">Laundry</option>'+
    '<option value="lawyer">Lawyer</option>'+
    '<option value="library">Library</option>'+
    '<option value="liquor_store">Liquor Store</option>'+
    '<option value="local_government_office">Local Government Office</option>'+
    '<option value="locksmith">Locksmith</option>'+
    '<option value="lodging">Lodging</option>'+
    '<option value="meal_delivery">Meal Delivery</option>'+
    '<option value="meal_takeaway">Meal Takeaway</option>'+
    '<option value="mosque">Mosque</option>'+
    '<option value="movie_rental">Movie Rental</option>'+
    '<option value="movie_theater">Movie Theater</option>'+
    '<option value="moving_company">Moving Company</option>'+
    '<option value="museum">Museum</option>'+
    '<option value="night_club">Night Club</option>'+
    '<option value="painter">Painter</option>'+
    '<option value="park">Park</option>'+
    '<option value="parking">Parking</option>'+
    '<option value="pet_store">Pet Store</option>'+
    '<option value="pharmacy">Pharmacy</option>'+
    '<option value="physiotherapist">Physiotherapist</option>'+
    '<option value="place_of_worship">Place of Worship</option>'+
    '<option value="plumber">Plumber</option>'+
    '<option value="police">Police</option>'+
    '<option value="post_office">Post Office</option>'+
    '<option value="real_estate_agency">Real Estate Agency</option>'+
    '<option value="restaurant">Restaurant</option>'+
    '<option value="roofing_contractor">Roofing Contractor</option>'+
    '<option value="rv_park">RV Park</option>'+
    '<option value="school">School</option>'+
    '<option value="shoe_store">Shoe Store</option>'+
    '<option value="shopping_mall">Shopping Mall</option>'+
    '<option value="spa">Spa</option>'+
    '<option value="stadium">Stadium</option>'+
    '<option value="storage">Storage</option>'+
    '<option value="store">Store</option>'+
    '<option value="subway_station">Subway Station</option>'+
    '<option value="synagogue">Synagogue</option>'+
    '<option value="taxi_stand">Taxi Stand</option>'+
    '<option value="train_station">Train Station</option>'+
    '<option value="travel_agency">Travel Agency</option>'+
    '<option value="university">University</option>'+
    '<option value="veterinary_care">Veterinary Care</option>'+
    '<option value="zoo">Zoo</option>'+
  '</select>';

  //Try dropdown with multiple columns
  /*$('#selector').gentleSelect({
        columns: 5,
        itemWidth: 100,
    });*/

    //Listen for change in 'nearby' dropdown
    document.getElementById("selector").onchange = function() {
      deleteMarkers();
      service.nearbySearch({
        location: place.geometry.location,
        radius: 1000,
        types: [this.value]
      }, callback);
    };



    //Setup elemnts for 'photo' funct
    document.getElementById("placePhotos").innerHTML = '<img id="thumbN" src="' + photos[0].getUrl({'maxWidth': 140, 'maxHeight': 90}) + '"><p>Click and use arrow keys to explore photos</p>' ;


    //Listen for click on thumbnail for 'photo' funct and the keydown event for scrolling photos
    document.getElementById("thumbN").addEventListener('click',function(){
      document.getElementById("bigPhoto").innerHTML = '<img src="' + photos[picClick].getUrl({'maxWidth': 800, 'maxHeight': 380}) + '">';
      $(document).keydown(function(key) {
        switch(parseInt(key.which,10)) {

			          // Left arrow key pressed
			          case 37:
                {
                  if(picClick>0) picClick--;
                  document.getElementById("bigPhoto").innerHTML = '<img src="' + photos[picClick].getUrl({'maxWidth': 800, 'maxHeight': 380}) + '">';
                  break;
                }

			         // Right Arrow Pressed
			         case 39:
               {
                 if(picClick<(photos.length-1)) picClick++;
                 document.getElementById("bigPhoto").innerHTML = '<img src="' + photos[picClick].getUrl({'maxWidth': 800, 'maxHeight': 380}) + '">';
				         break;
                }

              //Escape key pressed
              case 27:
              {
                $('#bigPhoto').empty();
                picClick=0;
              }
		      }
	      });
    });
  });

} //End initMap


  //Invoke when 'nearby' dropdown changed
  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }


  //Create markers for the nearby places
  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var nMarker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });
    nMarkerArr.push(nMarker);

    google.maps.event.addListener(nMarker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }


// Delete all markers in the array.
function deleteMarkers() {
  for (var i = 0; i < nMarkerArr.length; i++) {
    nMarkerArr[i].setMap(null);
  }
  nMarkerArr = [];
}
