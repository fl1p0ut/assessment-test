function loadHotels(){
	
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "http://fake-hotel-api.herokuapp.com/api/hotels",
		success: function(response){
			var hotel = '';
			var hCount = 1;
			for(i in response){
				if (i < 20){ //limited response
					hotel += '<div class="container">';
						hotel += '<div class="row">';
							hotel += '<div class="col-lg-5 col-md-6 col-sm-7 col-xs-24 img-div">';
								hotel += '<a href="'+response[i].images[0]+'" target="_blank">';
									hotel += '<img id="img_'+hCount+'" src="'+response[i].images[0]+'" class="img-responsive img">';
								hotel += '</a>';
							hotel += '</div>';
							hotel += '<div class="col-lg-7 col-md-6 col-sm-5 col-xs-24">';
								hotel += '<div class="col-md-8 col-sm-6 left padding-div">';
									hotel += '<span class="cap-0"><b>'+response[i].name+'</b></span><br>';
									hotel += '<span>'+response[i].city+'-'+response[i].country+'</span>';
								hotel += '</div>';
								hotel += '<div class="col-md-4 col-sm-6 padding-div">';
									hotel += '<span class="cap-1">'+setStars(response[i].stars)+'</span>';
								hotel += '</div>'
								hotel += '<div class="col-lg-12 col-md-12 col-sm-12 left comment-div"><p>'+response[i].description+'</p></div>';
								hotel += '<div class="col-md-6 col-sm-12 col-xs-6 left padding-div center">';
									hotel += '<button class="btn btn-default gray" type="button" id="button_'+hCount+'" onclick="showReviews(\''+response[i].id+'\','+hCount+');">Show reviews</button>';
								hotel += '</div>';
								hotel += '<div class="col-md-6 col-sm-12 col-xs-6 right">';
									hotel += '<span class="cap-2">'+response[i].price+'&#8364;</span><br>';
									hotel += '<span>'+setDate(response[i].date_start)+'-'+setDate(response[i].date_end)+'</span>';
								hotel += '</div>';
							hotel += '</div>';
						hotel += '</div>';
						hotel += '<div class="row">';
							hotel += '<div class="col-lg-12 col-md-12 col-sm-12 reviews" id="reviews_'+hCount+'">';
							hotel += '</div>';
						hotel += '</div>';
					hotel += '</div>';
					
					hCount++;
				}
			}
			$('#main').html(hotel);
			$('#limit').show();
		},
		error:function(){
			//window.location.href = "http://fake-hotel-api.herokuapp.com/api/hotels?force_error=1";
			var string = '';
			string += '<div class="container"><div class="error">';
				string += '<b>An error ocured</b>';
			string += '</div></div>';
			$('#main').html(string);
		}
	});
	
}

function showReviews(hotel_id, counter){
	
	if ($('#button_'+counter).text() === 'Show reviews'){
		$('#button_'+counter).text('Hide reviews');
		$('#img_'+counter).css('border-bottom-left-radius', '0px');
		$('#reviews_'+counter).show();
		$.ajax({
			type: "GET",
			dataType: "json",
			url: "http://fake-hotel-api.herokuapp.com/api/reviews?hotel_id=" + hotel_id,
			success: function(response){
				var reviews = '';
				var spanClass;
				var rCount = 0;
				for(i in response){
					if(response[i].positive == true){
						spanClass = 'glyphicon glyphicon-plus-sign';
					}else{
						spanClass = 'glyphicon glyphicon-minus-sign';
					}
					reviews += '<div class="row">';
						reviews += '<div class="col-sm-1 center-sign"><span class="'+spanClass+' center-span"></span></div>';
						reviews += '<div class="col-sm-11 left"><h4><b>'+response[i].name+'</b></h4><br><p>'+response[i].comment+'</p></div>';
					reviews += '</div><hr>';
					
					$('#reviews_'+counter).html(reviews);
					
					rCount++;
				}
			},
			error:function(){
				var string = '';
				string += '<div class="row">';
					string += '<b>No hotel id specified</b>';
				string += '</div>';
				$('#reviews_'+counter).html(string);
			}
		});
	}else{
		$('#button_'+counter).text('Show reviews');
		$('#img_'+counter).css('border-bottom-left-radius', '15px');
		$('#reviews_'+counter).hide();
	}
	
}

function setStars(star){
	
	var stars = '';
	switch(star){
		case 1:
			stars = '&#9733;&#9734;&#9734;&#9734;&#9734;';
			break;
		case 2:
			stars = '&#9733;&#9733;&#9734;&#9734;&#9734;';
			break;
		case 3:
			stars = '&#9733;&#9733;&#9733;&#9734;&#9734;';
			break;
		case 4:
			stars = '&#9733;&#9733;&#9733;&#9733;&#9734;';
			break;
		case 5:
			stars = '&#9733;&#9733;&#9733;&#9733;&#9733;';
			break;
		default:
			stars = "There must be 5 stars!";
	}
	return stars;
	
}

function setDate(string){
	
	var date = new Date(string);
	var dd = date.getDate();
	var mm = date.getMonth() + 1;
	var yyyy = date.getFullYear();
	if(dd < 10){
		dd = '0' + dd;
	}
	if(mm < 10){
		mm = '0' + mm;
	}
	return dd + "." + mm + "." + yyyy;
	
}

/* bugged */

/*
//onclick="switchImages(\''+response[i].images+'\','+hCount+');"

function switchImages(imagesarray, img_id){
	var current = $('#img_id_'+ img_id).attr('src');
	var imgArray = imagesarray.split(',');
	var i = 0;
	setInterval(function(){
		var next = imgArray[++i%imgArray.length];
		$('#anchor_'+img_id).prop('href',next);
		$('#anchor_'+img_id).prop('target','_blank');
		$('#img_id_'+ img_id ).prop('src',next);
	},7500);
}
*/