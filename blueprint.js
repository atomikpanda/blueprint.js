var blueprint = new function() {
    this.classes = {};

    this._valueForPath = function(obj, path){
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
        obj = obj[path[i]];
    };
    return obj;
    }

    this._getMatches = function(string, regex) {
    var m;
    var matches = [];
    while ((m = regex.exec(string)) != null) {
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }
    matches.push(m[1]);
    }
    return matches;
    }

    this.contextFromClass = function() {
    var superClass = new arguments[0];

    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    };

     return superClass.init.apply(this, args);
    };
};
var bp = blueprint;

$(document).ready(function(){

    var allClassNames = Object.keys(blueprint.classes);

    for (var i = 0; i < allClassNames.length; i++) {
        var className = allClassNames[i];
        var classObj = blueprint.classes[className];
         var element = $("."+className);
         var context = new Object;
         context.element = element;

         context = classObj.init(context);


            var elementHTML = element[0].outerHTML;
            var expressionsRegex = /\%\{(.*?[^\%])}/g;

            var expressions = blueprint._getMatches(elementHTML,expressionsRegex);

            for (var ii = 0; ii < expressions.length; ii++) {
                 var exs = expressions[ii];
                 exs = exs.trim().split(/\s+/);

                 for (var iii = 0; iii < exs.length; iii++) {
                    var ex = exs[iii];

                   var newHTML = blueprint._valueForPath(context, ex).toString();
                   
                   var findRegex = new RegExp(""+ex+"");
                   
                    elementHTML = elementHTML.replace(findRegex,newHTML);
                    elementHTML = elementHTML.replace(/(%\{)/,"");
                    elementHTML = elementHTML.replace(/(\})/,"");

                };
              };
              element.replaceWith(elementHTML);
         };
});
