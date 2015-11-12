
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

   // var menuHeight = $('#header').height() + $('#header2').height();
   // $('#map-canvas').css('height', $(window).height() +'px');
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

   // getAddressOfBusiness('Pi', 'intermedix');
    //getAddressOfBusiness('philadelphia', 'Wells Fargo');


    // add your current location to map
   // addMarker(yourLatlng,'You','');

}


