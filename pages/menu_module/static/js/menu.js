// Make a company.project namespace
var erm = erm || {};
erm.emenu = erm.emenu || {};
// My global variable is now restricted and shouldn't collide.
erm.emenu.editing = false;

erm.emenu.hideNavbar = function() {
	var $navbar = $(".collapse.navbar-collapse"); // .class1.class2 checks to see if it belongs to BOTH class1 and class2.
	if ($navbar.hasClass("in")) {
		$navbar.collapse("hide");
	}
};

erm.emenu.enableButtons = function() {
	$("#toggle-edit").click(function() {
		if (erm.emenu.editing) {
			erm.emenu.editing = false;
			$(".edit-actions").addClass("hidden");
			$(".edit-actions-hidden").removeClass("hidden");
			$(this).html(editVar);
		} else {
			erm.emenu.editing = true;
			$(".edit-actions").removeClass("hidden");
			$(".edit-actions-hidden").addClass("hidden");
			$(this).html(doneVar);
		}
		erm.emenu.hideNavbar();
	});

	$(".edit-cuisine").click(function() {
		cuisineName = $(this).find(".cuisineName").html();
		console.log("name: " + cuisineName);
		$("#edit-cuisine-modal input[name=cuisineName]").val(cuisineName);

		retailPrice = $(this).find(".retailPrice").html();
		console.log("price: " + retailPrice);
		$("#edit-cuisine-modal input[name=retailPrice]").val(retailPrice);

		description = $(this).find(".description").html();
		console.log("description: " + description);
		$("#edit-cuisine-modal textarea[name=description]").val(description);

		cuisineTypeID = $(this).find(".cuisineTypeID").html();
		console.log("typeID: " + cuisineTypeID);
		if (cuisineTypeID == "") {
			$("#edit-cuisine-modal select[name=cuisine_type]").find("option[value=NULL]").attr("selected", true);
		} else {
			$("#edit-cuisine-modal select[name=cuisine_type]").find("option[value="+ cuisineTypeID +"]").attr("selected", true);
		}

		dailyspecial = $(this).find(".dailyspecial").html();
		console.log("dailyspecial: " + dailyspecial);
		if (dailyspecial == "1") {
			$("#edit-cuisine-modal input[name=dailyspecial]").attr("checked", true);
		};

		specialPrice = $(this).find(".specialPrice").html();
		console.log("special price: " + specialPrice);
		$("#edit-cuisine-modal input[name=specialPrice]").val(specialPrice);
		
		cuisineID = $(this).find(".cuisineID").html();
		console.log("EDIT ID: " + cuisineID);
		$("#edit-cuisine-modal input[name=cuisineID]").val(cuisineID).prop("disabled", false);
	});

	$(".edit-dailyspecialcuisine").click(function() {
		cuisineName = $(this).find(".cuisineName").html();
		console.log("name: " + cuisineName);
		$("#edit-dailyspecialcuisine-mode .specialCuisineName").html(cuisineName);

		specialPrice = $(this).find(".specialPrice").html();
		console.log("price: " + specialPrice);
		$("#edit-dailyspecialcuisine-mode input[name=specialPrice]").val(specialPrice);

		cuisineID = $(this).find(".cuisineID").html();
		console.log("EDIT DAILY SPECIAL ID: " + cuisineID);
		$("#edit-dailyspecialcuisine-mode input[name=cuisineID]").val(cuisineID).prop("disabled", false);
	});

	$(".delete-cuisine").click(function() {
		cuisineID = $(this).find(".cuisineID").html();
		console.log("DELETE ID: " + cuisineID);
		$("#delete-cuisine-modal input[name=cuisineID]").val(cuisineID).prop("disabled", false);
	});

	$(".delete-cuisine-type").click(function() {
		typeID = $("select[name=typeName]").val();
		console.log("DELETE TYPE ID: " + typeID);
		$("#delete-cuisine-type-modal input[name=typeID]").val(typeID).prop("disabled", false);
	});

	$("#add-cuisine-type").click(function() {
		console.log("TYPE ID: " + lastSortOrder);
		$("#insert-cuisine-type-modal input[name=lastSortOrder]").val(lastSortOrder).prop("disabled", false);
	});

	$(".insert-cuisine-step1-next").click(function() {
		name_ch = $("#insert-cuisine-step1-modal input[name=cuisine_name_ch]").val();
		console.log("Name in Chinese: " + name_ch);
		$("#insert-cuisine-step4-modal input[name=cuisine_name_ch]").val(name_ch);

		name_en = $("#insert-cuisine-step1-modal input[name=cuisine_name_en]").val();
		console.log("Name in English: " + name_en);
		$("#insert-cuisine-step4-modal input[name=cuisine_name_en]").val(name_en);
		console.log($("#insert-cuisine-step4-modal input[name=cuisine_name_en]").val());

		description_ch = $("#insert-cuisine-step1-modal textarea[name=cuisine_description_ch]").val();
		console.log("Description in Chinese: " + description_ch);
		$("#insert-cuisine-step4-modal textarea[name=cuisine_description_ch]").val(description_ch);

		description_en = $("#insert-cuisine-step1-modal textarea[name=cuisine_description_en]").val();
		console.log("Description in English: " + description_en);
		$("#insert-cuisine-step4-modal textarea[name=cuisine_description_en]").val(description_en);
	});

	$(".insert-cuisine-step2-next").click(function() {
		typeID = $("#insert-cuisine-step2-modal select[name=cuisine_type]").val();
		console.log("Cuisine Type: " + typeID);
		$("#insert-cuisine-step4-modal input[name=cuisine_typeID]").val(typeID);
	});

	$(".insert-cuisine-step3-next").click(function() {
		price = $("#insert-cuisine-step3-modal input[name=cuisine_price]").val();
		console.log("retail price: " + price);
		$("#insert-cuisine-step4-modal input[name=cuisine_retailPrice]").val(price);
	});

	$('#submit').click (function() {
   		$('.modal fade').modal('hide');
	});
};

$(document).ready(function() {
	erm.emenu.enableButtons();
	//erm.emenu.addEventHandlers();
});

$(document).ready(function() {
	var TypeId;

	$.ajax({
		type: 'get',
		url:'/Types',
		success: function(types) {
			$.each(types, function(i, type){ 
				$('#Type_list').append('<li><a href="#" id ="'+type._id+'">'+type.Name+'</a></li>');
				$('#cuisine-type-select').append('<option value="'+type.Name+'">'+type.Name+'</option>');
				$('#cuisine-type-select2').append('<option value="'+type.Name+'">'+type.Name+'</option>');
				$('#'+type._id).click(function (){
					var TypeId = type._id;
					$("#cuisines_menu").replaceWith('<tbody id="cuisines_menu"></tbody>');
					$.each(type.cuisines, function(i, cuisine){
						$("#cuisines_menu" ).append(
				'<tr>'+
                  '<td>'+
                  '<div class="row">'+
                    '<div class="image"><img src="'+cuisine.image+'" height="100px"></div>'+
                    '<div class="intro">'+
                      '<div class="row">'+
                        '<div class="col-sm-10 cuisineName" name="cuisineName">'+cuisine.Name+'</div>'+
                        '<div class="col-sm-2" id="price">'+toUSD(cuisine.price)+'</div>'+
                        '<!-- <div class="col-sm-2">$".$retailPrice."</div> -->'+
                      '</div>'+
                      '<div class="row"><div class="col-sm-12">'+cuisine.description+'</div></div>'+
                    '</div>'+
                  '</div>'+
                  '</td>'+
                  '<td class="hidden edit-actions">'+
                  '<div class="row"><div class="col-md-6">'+
                    '<button data-toggle="modal" data-target="#edit-cuisine-modal" type="button"'+
                          'class="edit-cuisine btn btn-success btn-xs">'+
                      '<span class="glyphicon glyphicon-pencil"></span>'+
                      '<!-- <div class="hidden cuisineID">".$cuisineID."</div> -->'+
                      '<div class="hidden cuisineName">'+cuisine.Name+'</div>'+
                      '<div class="hidden retailPrice">'+cuisine.price+'</div>'+
                      '<!-- <div class="hidden specialPrice">".$specialPrice."</div> -->'+
                      '<!-- <div class="hidden description">".$description."</div> -->'+
                      '<!-- <div class="hidden cuisineTypeID">".$cuisineTypeID."</div> -->'+
                      '<!-- <div class="hidden dailyspecial">".$dailyspecialCheck."</div> -->'+
                    '</button>'+
                  '</div>'+
                  '<div class="col-md-6">'+
                    '<button data-toggle="modal" data-target="#delete-cuisine-modal" type="button"'+
                        'class="delete-cuisine btn btn-danger btn-xs">'+
                    '<span class="glyphicon glyphicon-trash"></span>'+
                      '<!-- <div class="hidden cuisineID">".$cuisineID."</div> -->'+
                    '</button>'+
                  '</div>'+
                '</div>'+
              '</td>'+
            '</tr>')})
				})
			});
		}
	});

	var newTypeFrom = $('#Typeform');
	newTypeFrom.submit(function(e){
		$.ajax({
			type:newTypeFrom.attr('method'),
			url:newTypeFrom.attr('action'),
			data:newTypeFrom.serialize(),
			success:function(data){
				var type = JSON.parse(data);
				$('#Type_list').append('<li><a href="#" id ="'+type._id+'">'+type.Name+'</a></li>');
				$('#cuisine-type-select').append('<option value="'+type.Name+'">'+type.Name+'</option>');
				$('#insert-cuisine-type-modal').modal('hide');
			},
			error: function(){
				alert("ERROR");
			}
		});
		e.preventDefault();
	});
	
	var CuisineEditForm = $("#cuisine_edit");
	CuisineEditForm.submit(function(e){
		console.log(CuisineEditForm.serialize());
		$.ajax({
			type:CuisineEditForm.attr('method'),
			url:CuisineEditForm.attr('action'),
			data:CuisineEditForm.serialize(),
			success: function(data){

			},
			error: function(){

			}
		})
		e.preventDefault();
	})

	function toUSD(number) {
    var number = number.toString(), 
    dollars = number.split('.')[0], 
    cents = (number.split('.')[1] || '') +'00';
    dollars = dollars.split('').reverse().join('')
        .replace(/(\d{3}(?!$))/g, '$1,')
        .split('').reverse().join('');
    return '$' + dollars + '.' + cents.slice(0, 2);
	}

	// var newCusineFrom = $('#cusine_form');
	// newCusineFrom.submit(function(e){ 
	// 	console.log(new FormData($(this)[0]));
	// 	$.ajax({
	// 		type:newCusineFrom.attr('method'),
	// 		url:newCusineFrom.attr('action'),
	// 		data:new FormData(this),
	// 		processData: false,
 //  			contentType: false,
	// 		success:function(data){
	// 			var type = JSON.parse(data);
	// 			$('#insert-cuisine-step4-modal').modal('hide');
	// 		},
	// 		error: function(){
	// 			alert("ERROR");
	// 		}
	// 	});
	// 	e.preventDefault();
	// });


	
	var cuisines_table = function(TypeId){
		console.log(TypeId);
		$.ajax({
		type: 'get',
		url:'/Types',
		success: function(types) {
			$.each(types, function(i, type){ 
				if(type._id === TypeId){
					$.each(type.cuisines, function(i, cuisine){
						$("#cuisines_menu" ).append(
				'<tr>'+
                  '<td>'+
                  '<div class="row">'+
                    '<div class="image"><img src='+cuisine.image+'" height="100px"></div>'+
                    '<div class="intro">'+
                      '<div class="row">'+
                        '<div class="col-sm-10 cuisineName" name="cuisineName">'+cuisine.Name+'</div>'+
                        '<div class="col-sm-2">'+cuisine.price+'</div>'+
                        '<!-- <div class="col-sm-2">$".$retailPrice."</div> -->'+
                      '</div>'+
                      '<div class="row"><div class="col-sm-12">'+cuisine.description+'</div></div>'+
                    '</div>'+
                  '</div>'+
                  '</td>'+
                  '<td class="hidden edit-actions">'+
                  '<div class="row"><div class="col-md-6">'+
                    '<button data-toggle="modal" data-target="#edit-cuisine-modal" type="button"'+
                          'class="edit-cuisine btn btn-success btn-xs">'+
                      '<span class="glyphicon glyphicon-pencil"></span>'+
                      '<!-- <div class="hidden cuisineID">".$cuisineID."</div> -->'+
                      '<div class="hidden cuisineName">'+cuisine.Name+'</div>'+
                      '<div class="hidden retailPrice">'+cuisine.price+'</div>'+
                      '<!-- <div class="hidden specialPrice">".$specialPrice."</div> -->'+
                      '<!-- <div class="hidden description">".$description."</div> -->'+
                      '<!-- <div class="hidden cuisineTypeID">".$cuisineTypeID."</div> -->'+
                      '<!-- <div class="hidden dailyspecial">".$dailyspecialCheck."</div> -->'+
                    '</button>'+
                  '</div>'+
                  '<div class="col-md-6">'+
                    '<button data-toggle="modal" data-target="#delete-cuisine-modal" type="button"'+
                        'class="delete-cuisine btn btn-danger btn-xs">'+
                    '<span class="glyphicon glyphicon-trash"></span>'+
                      '<!-- <div class="hidden cuisineID">".$cuisineID."</div> -->'+
                    '</button>'+
                  '</div>'+
                '</div>'+
              '</td>'+
            '</tr>')})
				}	
			});
			}	
		});
	};
});


 



