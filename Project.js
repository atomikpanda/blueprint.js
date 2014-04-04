var myClass = function() {
    this.init = function(context) {

    context.element.css("color", "red");
    context.name = {};
    context.name.first = "Bailey";
    context.name.last = "Seymour";
    return context;
    };
};


bp.classes.myClass = new myClass;

var mySubclass = function(){

    this.init = function(context){

        context = bp.contextFromClass(myClass, context);

        context.name.first = "s0ulp1xel";
        context.element.css("color", "blue");
        return context;
    };
};
bp.classes.mySubclass = new mySubclass;
