var GOOGLE_KEY = 'AIzaSyDsnaGf5pCVRpo5hCpcBfOq0J5Vdzj8DLY'; 

// list of cities that the user wants to search for job in
var locations = [];



// attach event listeners
$('.glyphicon-plus').on('click', handleLocation);
$('.glyphicon-remove').on('click', handleLocation);
$('#right-panel-menu li').on('click', changeMenuTab);


function printJSON(json){
    alert(JSON.stringify(json, null, 2));
    console.log(JSON.stringify(json, null, 2));
}


// dynamically build URL GET query string
function buildURL(baseURL, params){

	var url = baseURL;
	
	for(var key in params)
	{
		// make sure property is not inherited from object protype
		if(params.hasOwnProperty(key)){
			url += '&' + key + '=' + params[key];
		}
	}

	return url;
}


function handleLocation(){
	var loc = $(this).attr('data-loc');

	if(loc in locations)
		locations.splice(loc);
	else
		locations.push(loc);

	$(this).toggleClass('glyphicon-plus glyphicon-remove');	
}


function changeMenuTab(){
	var currMenuTab = '#' + $('#right-panel-menu .active').attr('data-tab') + 'Content';
	var nextMenuTab = '#' + $(this).attr('data-tab') + 'Content';

	$('#right-panel-menu .active').removeClass('active');
	$(currMenuTab).hide();

	$(this).addClass('active');
	$(nextMenuTab).show();

}

