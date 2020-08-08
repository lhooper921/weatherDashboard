







//  click event for save button
$(".searchBtn").on('click',function(event){
    event.preventDefault();
   var inputText = $(event.target).siblings("input")
   console.log(inputText.val());
   localStorage.setItem(inputText.attr("id"),inputText.val())
})