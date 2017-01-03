
//allows bootstrap dropdowns to function
$('.dropdown-toggle').dropdown();

//changes the text of the cat menu on user selection
$(function(){

    $(".dropdown li a").click(function(){

      $(".btn-default:first-child").text($(this).text());
      $(".btn-default:first-child").val($(this).text());

   });
});

//changes the text of the type menu on user selction

function typeChanges() {
  $(function(){

      $(".dropdown li a").click(function(){

        $(".btn-warning:first-child").text($(this).text());
        $(".btn-warning:first-child").val($(this).text());

     });
  });
};


//global var
  var userSelection;
  var typeSelection;
  var catNumb;
  var typeNumb;
  var categories;
  var types;
  var products;


//get JSON files via promises

var promise1 = new Promise(function(resolve, reject) {
  $.ajax({
    url : "categories.json"
  })
  .done(function(data, t, x){
    resolve(data);
  })
});


var promise2 = new Promise(function(resolve, reject) {
  $.ajax({
    url : "types.json"
  })
  .done(function(data, t, x){
    resolve(data);
  })
});

var promise3 = new Promise(function(resolve, reject) {
  $.ajax({
    url : "products.json"
  })
  .done(function(data, t, x){
    resolve(data);
  })
});

//get info from promises and store to variable

Promise.all([promise1, promise2, promise3])
  .then(function(values){
    categories = values[0];
    types = values[1];
    products = values[2]

  });


//function to get numeric value of type

function parseType() {
  for(var i = 0; i < types.types.length; i++) {
      if (typeSelection === types.types[i].name){
        typeNumb = types.types[i].id;
        console.log("typeNumb: ", typeNumb)
      }
  }
  //function to fill div
  listProducts();
}


//function to fill div

function listProducts() {

  var productHtml = "";
  for(var i = 0; i < products.products.length; i++) {
    for (var key in products.products[i]) {
      if(products.products[i][key].type === typeNumb) {
        console.log(products.products[i][key].name);
        productHtml += `<div class="card card-block">`;
        productHtml += `<h4 class="card-title">Name: ${products.products[i][key].name} </h4>`;
        productHtml += `<p class="card-text">Description: ${products.products[i][key].description}</p>`
        productHtml += `<a href="#" class="card-link">Type: ${typeSelection}</a>`;
        productHtml += `<a href="#" class="card-link">Category: ${userSelection}</a>`;
        productHtml += `</div>`;
      }
    }
  }
  $("#listOfExplosives").html(productHtml);
};



//function to get type selection

function getTypes() {
  typeSelection = $(".btn-warning:first-child").val();
  console.log("typeSelection", typeSelection);

  //run function to get type number value
  parseType();

}

// Create new dropdown that includes types
function typeDropdown() {
  console.log("typeDropdown")
  var typeMenu = `<button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="true">Types of ${userSelection}<span class="caret"></span></button>
          <ul class="dropdown-menu types" aria-labelledby="dropdownMenu1">`;
  for(var i=0; i < types.types.length; i++) {
    if(types.types[i].category === catNumb){
      typeMenu += `<li><a href="#" class="cat">${types.types[i].name}</a></li>`
    }
  }
  typeMenu += `</ul>`
  //add to page
  $(".types").html(typeMenu);
  //bind event listener
  reAddEvents();

  typeChanges();
}

//function to turn user cat selection into numeric value

function parseCat() {
  for(var i = 0; i < categories.categories.length; i++) {
      if (userSelection === categories.categories[i].name){
        catNumb = categories.categories[i].id;
        console.log("catNumb: ", catNumb)
      }
  }
  //adds function to have the text of dropdown equate to user selection
  typeDropdown();
};
//function to get data from user Selection of dropDown

function getCategories() {
  userSelection = $(".btn-default:first-child").val();
  console.log("userSelection", userSelection)

  //run function to get cat number value
  parseCat();
}

//listen for change of selection, run everytime new content added to page
function reAddEvents() {
  //upon selection of the category, the get Cat function runs
  $(".cat").click(getCategories);
  //upon selection of type, the get
  $(".types").click(getTypes);
};
reAddEvents();
