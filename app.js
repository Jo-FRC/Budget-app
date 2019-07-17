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
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  }

  return {
    getInput : function(){
      return {
        type: document.querySelector(DOMStrings.inputType).value, //Will be either inc or exp
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value,
      };
    },

    addListItem : function(obj, type){

      var html, newHtml, element;

      if(type === 'inc'){
        element = DOMStrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if(type === 'exp'){
        element = DOMStrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      document.querySelector(element).insertAdjacentHTML('beforeEnd', newHtml);
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
    UICtrl.addListItem(newItem, input.type);
  };

  return {
    init: function(){
      console.log('App has started.');
      setupEventListeners();
    }
  }


})(BudgetController, UIController);

controller.init();
