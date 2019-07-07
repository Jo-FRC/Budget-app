var BudgetController = (function(){



})();

var UIController = (function(){

  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  }
  
  return {
    getInput : function(){
      return {
        type: document.querySelector(DOMStrings.inputType).value, //Will be either inc or exp
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value,
      };
    },
    getDOMString: function(){
      return DOMStrings;
    }
  }



})();

var controller = (function(budgetCtrl, UICtrl){

  var setupEventListeners = function(){
    var DOM = UICtrl.getDOMString();
    
    document.querySelector(DOM.inputBtn).addEventListener('click', crtlAddItem);

    document.addEventListener('keypress', function(e){
      if(e.keyCode === 13 || e.which === 13){
        crtlAddItem();
      }
    });
  }
  
  
  var crtlAddItem = function(){
    var input = UICtrl.getInput();
    
  };

  return {
    init: function(){
      console.log('App has started.');
      setupEventListeners();
    }
  }


})(BudgetController, UIController);

controller.init();
