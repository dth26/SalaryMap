

var geocoder = new google.maps.Geocoder();


/* 
    compute geolocation(latitude, longitude) given an address
*/
function getCoordinates(companyData)
{

    geocoder.geocode({'address': companyData.vicinity}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {

           // printJSON(results[0].geometry.location);

            companyData['coordinates'] = results[0].geometry.location;

            var coors = String(results[0].geometry.location);
            var indexOfComma = coors.indexOf(',');
            var lat = coors.substring(1,indexOfComma);
            var lng = coors.substring(indexOfComma+1, coors.length-1);
            companyData['lat'] = lat;
            companyData['lng'] = lng;
            //alert(lat + ' ' + lng);

            addMarker(companyData);

        } 
        else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {  

        //     setTimeout(function() {
        //         getCoordinates(companyData);
        //     }, 200);
            alert("Reached GoogleGeocoder Query Limit for today: increase requests limit");
        } 
        else {
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

   var lat = allLocations[0][companyData.city].lat;
   var lng = allLocations[0][companyData.city].lng;

    var latLngCity = new google.maps.LatLng(lat, lng);


    var params = {
        location: latLngCity,
        keyword: companyData.companyName,
        radius: '50000'
    };


    var service = new google.maps.places.PlacesService(document.createElement('div'));

    service.nearbySearch(params, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            
            companyData['placeId'] = place[0].place_id;
            companyData['vicinity'] = place[0].vicinity;
            
            // call getCoordinates which should plot this address to the map
            getCoordinates(companyData);
            // printJSON(place);
            
        }
        else if (status ===  google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) { 
        //    Wait 200 ms and run request again if PlacesService returns over query limit 
            setTimeout(function() {

                // if(iteration=='undefined'){
                //     var iteration = 0 
                //     console.log('iteration is undefined');
                // }
                // if(iteration++ > 3){
                //     return;
                // }
     
                getAddressOfBusiness(companyData);
            }, 200);

            console.log("Reached GooglePlacesService Query Limit for today: increase requests limit");
            alert("Reached GooglePlacesService Query Limit for today: increase requests limit"); 

        }
        else{

            // our algorithm could not find the addresses for the following employers: thus cannnot place on map
            // companyData.companyName;

            console.log('Google Places Request: ' + status + ' FOR: ' + companyData.companyName + ' ' + companyData.city);
        }
    });


}



/* 
    set marker on google maps of current location 
*/
function addMarker(companyData){

    var image = {
      url: '../static/images/green.png',
      size: new google.maps.Size(16, 16),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0),
      scaledSize: new google.maps.Size(14, 14)
    };

   // alert(companyData.coordinates);

    var marker = new google.maps.Marker({
        // position: companyData.coordinates,
        position: new google.maps.LatLng(companyData.lat, companyData.lng),
        map: map,
        title: companyData.companyName,
        animation: null,
        icon: image
    });


   // printJSON(companyData);

    // save markers into global to access for on click salary
    gMarkers.push(marker);


    // push companyData to salaries controller
    var salaryElement = document.getElementById('salaryContent');
    var salaryCtrl = angular.element(salaryElement).scope();
    salaryCtrl.addSalary(companyData);



    var infowindow = new google.maps.InfoWindow({
        content: companyData.companyName + '<br>' + companyData.jobTitle + '<br><b>' + companyData.salary + '</b>' 
    });


    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });


}


