//allows bootstrap dropdowns to function
$('.dropdown-toggle').dropdown();

//changes the text of the category menu on user selection
$(function(){

    $(".dropdown li a").click(function(){

      $(".btn-default:first-child").text($(this).text());
      $(".btn-default:first-child").val($(this).text());

   });
});


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
    products = values[2];

  });

//EVENT LISTENERS

  //listen for change of selection, run everytime new content added to page
function addEvents() {
  //upon selection of the category, the get Cat function runs
  $(".cat").click(getCategories);
};
addEvents();


//function to get data from user Selection of dropDown

function getCategories() {
  userSelection = $(".btn-default:first-child").val();

  //run function to get cat number value
  parseCat();
}

//function to turn user cat selection into numeric value

function parseCat() {
  for(var i = 0; i < categories.categories.length; i++) {
      if (userSelection === categories.categories[i].name){
        catNumb = categories.categories[i].id;

          //adds function to have the text of dropdown equate to user selection
        typeDropdown();
      }
    }

};

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
  //upon selection of type
  $(".types").click(getTypes);
  //calls the type change button
  typeChanges();
}

//changes the text of the type menu on user selction

function typeChanges() {
  $(function(){

      $(".dropdown li a").click(function(){

        $(".btn-warning:first-child").text($(this).text());
        $(".btn-warning:first-child").val($(this).text());

     });
  });
};


//function to get type selection (fired upon user clicking the the type selection)

function getTypes() {
  typeSelection = $(".btn-warning:first-child").val();
  console.log("typeSelection", typeSelection);

  //run function to get type number value
  parseType();

}

//function to get numeric value of type

function parseType() {
  for(var i = 0; i < types.types.length; i++) {
      if (typeSelection === types.types[i].name){
        typeNumb = types.types[i].id;

      }
  }
  //function to fill div
  listProducts();
}


//function to fill div

function listProducts() {
  //start with empty string
  var productHtml = "";
  //interate through the products array held in products
  for(var i = 0; i < products.products.length; i++) {
    //testing for keys inside each instance of the product.product array
    for (var key in products.products[i]) {
      //if the current interation's type matches the selected type
      if(products.products[i][key].type === typeNumb) {
        //print that product to a product card
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
  //add created html string to the list of explosives div on the page
  $("#listOfExplosives").html(productHtml);
};
