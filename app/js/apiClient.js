var baseURL = 'http://localhost:8090';


function makeRequest(path, data, success, requestMethod)
{
	var url = baseURL + '/' + path;
    $.ajax({
	  type: requestMethod,    	
      url: url,
      data: data,
      success: success,
      fail: function ()
      {
        console.log('GET request FAIL.');// Do generic failure handling here
      }
  });
}

function makePOSTRequest(path, data, success)
{
	makeRequest(path, data, success, 'POST');
}

function makeGETRequest(path, data, success)
{
	makeRequest(path, data, success, 'GET')
}
