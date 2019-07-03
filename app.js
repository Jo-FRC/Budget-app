var BudgetController = (function(){



})();

var UIController = (function(){



})();

var controller = (function(budgetCtrl, UICtrl){

var crtlAddItem = function(){
  console.log('it works');
}

document.querySelector('.add__btn').addEventListener('click', crtlAddItem);

document.addEventListener('keypress', function(e){
  if(e.keyCode === 13 || e.which === 13){
    crtlAddItem();
  }
});

})(BudgetController, UIController);
