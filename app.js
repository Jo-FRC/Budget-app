var BudgetController = (function(){
  var Expenses = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var data = {
    allitems:  {
      exp: [],
      inc: []
    },
    totals: {
      inc: 0,
      exp: 0
    }
  };

  return {
    addItem: function(type, des, val){
      var newItem, ID;
      //Create new ID
      if(data.allitems[type].lenght > 0){
        ID = data.allitems[type][data.allitems[type].length -1].id +1;
      } else {
        ID = 0;
      }

      //Create newItem based on 'inc' or 'exp' type
      if(type === 'exp'){
        newItem = new Expenses(ID, des, val);
      } else if(type === 'inc'){
        newItem = new Income(ID, des, val);
      }

      //Push it into our data structure
      data.allitems[type].push(newItem);

      //Return the new element
      return newItem;
    },

    testing: function() {
      console.log(data);
    }
  }

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
    var input, newItem;

    input = UICtrl.getInput();
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
  };

  return {
    init: function(){
      console.log('App has started.');
      setupEventListeners();
    }
  }


})(BudgetController, UIController);

controller.init();
