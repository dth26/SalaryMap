

// glassdoor key and id
var KEY = 'ckMc41ydCN9';
var ID = '47182';
var glassdoorURL = 'http://api.glassdoor.com/api/api.htm?t.p=' + ID + '&t.k=' + KEY + '&userip=0.0.0.0&useragent=&format=json&v=1&countryId=1';


(function() {
	var city = $('#cityIn').val();
	var searchPhrase = $('#searchPhraseIn').val();

	city = 'Pittsburgh';
	searchPhrase = 'software engineer';
	getJobsInCity(city, searchPhrase);
})();



/*, 
	get jobs in city for occupation
*/
function getJobsInCity(city, searchPhrase, searchLimit){

	var params = {
		'action': 'employers',
		'pn': 1,
		'city': city,
		'q': searchPhrase,			// can be any combination of employer or occupation
		'ps': searchLimit			// number of employers returned
	} 

	requestToGlassdoor(params);
}


function requestToGlassdoor(params){

	var url = buildURL(glassdoorURL,params);
	//alert(url);
	//url = 'http://api.glassdoor.com/api/api.htm?t.p=5317&t.k=ckMc41ydCN9&userip=0.0.0.0&useragent=&format=json&v=1&action=salaries&returnStates=true&admLevelRequested=1';


	$.ajax({
	    url: url,
	    dataType: 'jsonp',
	    success: function(data){
	    	var currentPageNum = data.response.currentPageNumber;
	    	var totalPages = data.response.totalNumberOfPages;

	    	//printJSON(data);

	    	// add employers to map

	    	// you must iterate through each page in the request
	    	if(currentPageNum<totalPages){
	    		params['pn'] = currentPageNum+1;

	    		// recursive call to get every page
	    		//requestToGlassdoor(params);
	    	}
	
	    },
	    error: function (request, status, error) {
	        alert(request.responseText);
	        alert(status);
	        alert(error);
	    }
	});
}

















