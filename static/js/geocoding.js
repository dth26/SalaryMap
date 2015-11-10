

var geocoder = new google.maps.Geocoder();


var latlng = {
    'philadelphia': {'lat': 39.9496103, 'lng':-75.1502821},
    'pittsburgh': {'lat': 40.4624764, 'lng': -79.9300166},
    'dc': {'lat': 38.8976763, 'lng': -77.0365298},
    'francisco': {'lat': 37.7675707, 'lng': -122.430643}
};




/* 
    compute geolocation(latitude, longitude) given an address
*/
function getCoordinates(placeId, address, company, city)
{

    geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {

            addMarker(results[0].geometry.location, company, city);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
    });


}


/*
        get address of employer(queryPhrase) and location(city)
*/
function getAddressOfBusiness(city, company){

    var lat = latlng[city].lat;
    var lng = latlng[city].lng;

    var loc = new google.maps.LatLng(lat, lng);


    var params = {
        location: loc,
        keyword: company,
        radius: '50000'
    };


    var service = new google.maps.places.PlacesService(document.createElement('div'));

    service.nearbySearch(params, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            //now must call getGeoCode which should plot this address to the map
            getCoordinates(place[0].place_id, place[0].vicinity, company, city);
            //showAddress(place[0].vicinity);
            //printJSON(place);
            //alert(place[0].vicinity);
            //return place[0].vicinity;
            
        }else{
            alert(status);
        }
    });


}


/* 
    set marker on google maps of current location 
*/
function addMarker(myLatlng, company, city){

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: company
    });

    marker.setMap(map);

    // alert(myLatlng);
    // alert(marker.getPosition().lat());
    // alert(marker.getPosition().lng());

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });






}


