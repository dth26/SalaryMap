

var geocoder = new google.maps.Geocoder();


var latlng = {
    'Philadelphia': {'lat': 39.9496103, 'lng':-75.1502821},
    'Pittsburgh': {'lat': 40.4624764, 'lng': -79.9300166},
    'Washington DC': {'lat': 38.8976763, 'lng': -77.0365298},
    'San Francisco': {'lat': 37.7675707, 'lng': -122.430643}
};

// city to state mapping
var states = {
    'Philadelphia': 'PA',
    'Pittsburgh': 'PA',
    'Washington DC': 'District of Columbia',
    'San Francisco': 'CA'
};



/* 
    compute geolocation(latitude, longitude) given an address
*/
function getCoordinates(companyData)
{

    geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {

            companyData.coordinates = results[0].geometry.location;
            addMarker(companyData);

        } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {  

            setTimeout(function() {
                getCoordinates(companyData);
            }, 200);

        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
    });


}

    /*
                var companyData = {
                    'city': city,
                    'jobTitle':  data.companyJobTitle,
                    'companyName': data,companyName,
                    'salary': data.companySalary
                };

    */



/*
        get address of employer

        city: the city that the used select to search for jobs in 'Philadelphia', 'Pittsburgh'
        exactLoc: the precise city and state of the employer return by glassdoor. ex 'Monroeville'
*/
function getAddressOfBusiness(companyData){

    var lat = latlng[city].lat;
    var lng = latlng[city].lng;

    var latLngCity = new google.maps.LatLng(lat, lng);


    var params = {
        location: latLngCity,
        keyword: companyName,
        radius: '50000'
    };


    var service = new google.maps.places.PlacesService(document.createElement('div'));

    service.nearbySearch(params, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            
            companyData.place_id = place[0].place_id;
            companyData.vicinity = place[0].vicinity;
            
            // call getCoordinates which should plot this address to the map
            getCoordinates(companyData);
            // printJSON(place);
            
        }else if (status ===  google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {  
            /* Wait 200 ms and run request again if PlacesService returns over query limit */
            setTimeout(function() {
                getAddressOfBusiness(companyData);
            }, 200);

        }else{
            alert('Google Places Request: ' + status);
        }
    });


}


/* 
    set marker on google maps of current location 
*/
function addMarker(companyData){

    alert(companyData.salary);
    var marker = new google.maps.Marker({
        position: companyData.coordinates,
        map: map,
        title: companyData.companyName
    });

    // marker.setMap(map);

    // marker.addListener('click', function() {
    //     infowindow.open(map, marker);
    // });


}


