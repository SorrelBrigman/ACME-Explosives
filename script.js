
//allows bootstrap dropdowns to function
$('.dropdown-toggle').dropdown();

//global var
  var UserSelection
  var catID;
//code to get json files via promises


//get the categories
function getCategories() {
  ExSelection = $(".dropdown-menu").val();

  return new Promise(function(resolve, reject){
    $.ajax({
      url: "categories.json"
    })
    .done(function(dataCat, textStatus, XHR) {
      resolve(dataCat.id);
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

//The resolves

  getCategories.then(function(val){
    console.log(val);
    for(var i = 0; i < val.length; i++) {
      if(val[i] === ExSelection) {
        catID = val[i];
      }
    }
//do something with catID to make it select the correct type of types.
  })
  .then(function(){
    getTypes();
  })
  .then(function() {
    getProducts();
  }).then(function(){
    console.log("catId: ", catID);
  });


//Changes text of dropdown to match selection:

//changes the text of the left menu
$(function(){

    $(".dropdown li a").click(function(){

      $(".btn-default:first-child").text($(this).text());
      $(".btn-default:first-child").val($(this).text());

   });
});



//listen for change of selection
$(".dropdown-menu").click(getCategories)
