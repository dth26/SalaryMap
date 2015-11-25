
var map;
var infowindow = new google.maps.InfoWindow({
});

(function() {

    // var directionsDisplay = new google.maps.DirectionsRenderer();
    // var directionsService = new google.maps.DirectionsService();
    // var distanceService = new google.maps.DistanceMatrixService();

    // get users current position
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initialize, handle_error);
    } else {
        handle_error();
    }
})();

function handle_error(){

}


/*
    - set map
    - save current position/ coordinates to map
*/
function initialize(position) {

    yourLatitude = position.coords.latitude;
    yourLongitude = position.coords.longitude;

    yourLatlng = new google.maps.LatLng(yourLatitude,yourLongitude);

    // infowindow = new google.maps.InfoWindow({
    //     content: 'map'
    // });
    

    //set map configuration
    var mapOptions = {
        center: new google.maps.LatLng(39, -95),
        zoom: 4,
        scrollwheel: false
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}


function setCenter(lat, lng){
    map.panTo(new google.maps.LatLng(lat, lng));
    map.setZoom(15);
}
