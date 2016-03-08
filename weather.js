$(document).ready(function(){
	$( "#cityfield" ).keyup(function(){
		var url = "https://students.cs.byu.edu/~clement/CS360/ajax/getcity.cgi?q="+$("#cityfield").val();
		$.ajax({url:url,dataType: "json",
		success:function(data){
			console.log("Got "+data);
			console.log("Got "+data[0]);
			console.log("Got "+data[0].city);
		
			var everything;
			everything = "<ul>";
			$.each(data, function(i,item){
				everything += "<li> "+data[i].city;
			});

			everything += "</ul>";
			$("#txtHint").html(everything)
		}})
		.done(function(){console.log('getJSON request succeeded!');})
		.fail(function(jqXHR, textStatus, errorThrown){
			console.log('getJSON request failed! ' + textStatus);
			console.log("incoming "+jqXHR.responseText);
		})
		.always(function(){console.log('getJSON request ended!');})
		.complete(function(){console.log("complete");});
		

		$("#txtHint").text("Keyup "+$("#cityfield").val());
	});

	$("#cityform").submit(function(e){
		var value = $("#cityfield").val();
		console.log(value);
		e.preventDefault();
		$("#dispcity").text(value);

		var myurl = "https://api.wunderground.com/api/7f2a404372c3f011/geolookup/conditions/q/UT/";
		myurl += value;
		myurl += ".json";
		console.log(myurl);
		$.ajax({
			url : myurl,
			data : "jsonp",
			success : function(parsed_json){
				//console.log(data);
				var location = parsed_json['location']['city'];
				var temp_string = parsed_json['current_observation']['temperature_string'];
				var current_weather = parsed_json['current_observation']['weather'];
				everything = "<ul>";
				everything += "<li>Location: " + location;
				everything += "<li>Temperature: " + temp_string;
				everything += "<li>Weather: " + current_weather;
				everything += "</ul>";
				$("#weather").html(everything);
			}
		})
	});

});


