
//allows bootstrap dropdowns to function
$('.dropdown-toggle').dropdown();

//Changes text of dropdown to match selection:

//changes the text of the left menu
$(function(){

    $(".dropdown li a").click(function(){

      $(".btn-default:first-child").text($(this).text());
      $(".btn-default:first-child").val($(this).text());

   });
});


//global var
  var userSelection = "";
  var catID;

//code to get json files via promises


//get the categories
function getCategories() {
  userSelection = $(".btn-default:first-child").val();

  return new Promise(function(resolve, reject){
    $.ajax({
      url: "categories.json"
    })
    .done(function(dataCat, textStatus, XHR) {
      resolve(dataCat);
    })
  })
}



//get the types
function getTypes() {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: "types.json"
    })
    .done(function(dataType, textStatus, XHR) {
      resolve(dataType.id);
    })
  })
}

//get the products
function getProducts() {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: "products.json"
    })
    .done(function(dataProducts, textStatus, XHR) {
      resolve(dataProducts);
    })
  })
}


//The Resolves:

//listen for change of selection
$(".dropdown-menu").click(function() {
  getCategories().then(function(dataCat){
    var whatCat = dataCat;
    var thisCat;
    console.log("whatCat", whatCat.categories[0].id);
    for(var i = 0; i < whatCat.categories.length; i++) {
      if (userSelection === whatCat.categories[i].name){
        thisCat = whatCat.categories[i].id;
      }
    }
    console.log("thiscat: ", thisCat)
    getTypes(thisCat).then(function(val){
      console.log(val);
    })
  })
});
