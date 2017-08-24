// Prod
// var baseURL = 'http://54.255.182.244:8090/';

// Local
var baseURL = 'http://localhost:8090';


function makeRequest(path, data, success, requestMethod)
{
    var response = mockHandle[path];
    if(!response){
        console.log("unhandled call PATH = " + path)
    }else{
        success($.parseJSON( response ) );
    }
}

function makePOSTRequest(path, data, success)
{
	makeRequest(path, data, success, 'POST');
}

function makeGETRequest(path, data, success)
{
	makeRequest(path, data, success, 'GET')
}

var mockHandle = [];

function mockResponse(path, response){
    mockHandle[path] = response;
}