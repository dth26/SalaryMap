

// glassdoor key and id
var KEY = 'ckMc41ydCN9';
var ID = '47182';
var glassdoorURL = 'http://api.glassdoor.com/api/api.htm?t.p=' + ID + '&t.k=' + KEY + '&userip=0.0.0.0&useragent=&format=json&v=1&countryId=1';


$('.filter').on('click', getJobs);


// (function() {
// 	var city = $('#cityIn').val();
// 	var searchPhrase = $('#searchPhraseIn').val();

// 	city = 'Pittsburgh';
// 	searchPhrase = 'software engineer';
// 	getJobsInCity(city, searchPhrase);
// })();



/*, 
	get jobs in city for occupation
*/
// function getJobs(){

// 	var jobTitle = $.trim($('#searchPhraseIn').val());
// 	var searchLimit = 10;
// 	var params, state, city;


// 	// locations in base.js
// 	// contains the cities that the user wants to search
// 	for(var i=0; i<locations.length ;i++)
// 	{
// 		city = locations[i];
// 		state = states[city];

// 		params = {
// 			'action': 'employers',
// 			'pn': 1,
// 			'city': city,
// 			'state': state,
// 			'country': 'USA',
// 			'q': jobTitle,				// can be any combination of employer or occupation
// 			'ps': searchLimit			// number of employers returned
// 		}; 

// 		requestToGlassdoor(params);
// 	}

// }


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
	    	var employers = data.response.employers;

	    	/* 
	    		we can get a more precise location of employer user 'data.response.employers.featuredReview.location'
	    		however, this would require double the amount of requests for geocoding since I would have to
	    		get the coordinates of this location to pass to the google.places request. Right now I simply pass the
	    		city that the user select such as 'Philadelphia', 'Pittsburgh'
			*/
			// iterate through list of employers for current page
			for(var i=0; i<employers.length && i<10; i++)
			{
				var companyLoc = employers[i].featuredReview.location;
	    		var companyName = data.response.employers[i].name;
	    		/*
				Glassdoor only returns the name of the employee and the city, state
				getAddressOfBusiness() gets the exact address
	    		*/
	    		getAddressOfBusiness(params.city, companyLoc, companyName);
			}


	    	// you must iterate through each page in the request
	    	if(currentPageNum<totalPages && currentPageNum<2)
	    	{
	    		params['pn'] = currentPageNum+1;

	    		// recursive call to get every page
	    		requestToGlassdoor(params);
	    	}
	
	    },
	    error: function (request, status, error) {
	        alert(request.responseText);
	        alert(status);
	        alert(error);
	    }
	});
}



function getJobs(){
	var jobTitle = $.trim($('#searchPhraseIn').val());
	var totalLoc = locations.length;					// total number of cities user wants searched

	scrapeGlassdoor(0, totalLoc, jobTitle);
}



// scrape glassdoor
function scrapeGlassdoor(curr, totalLoc, jobTitle){

	city = locations[curr++];
	state = states[city];

	$.ajax({
		url: '/scrapeGlassdoor?city=' + city + '&searchPhraseIn=' + jobTitle,
		method: 'GET',
		dataType: 'json',
		success: function(data){

			printJSON(data);

			// scrape all locations that user selects
			if(curr <= totalLoc-1)
			{
				scrapeGlassdoor(curr, totalLoc, jobTitle);

				city, companyJobTitle, companyName, companySalary

				var companyData = {
					'city': city,
					'jobTitle':  data.companyJobTitle,
					'companyName': data,companyName,
					'salary': data.companySalary
				};

				/*
					glassdoor does not provide the address or coordinates of the employer,
					so first we must get the address of the employer using googlePlaces 
					and then we must get the coordinates of this address using geocoding
				*/
				getAddressOfBusiness(companyData);
			}
		}
	});
	
}











