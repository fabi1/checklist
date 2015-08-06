// Helpers
Handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});
Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
        
    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});

(function() {
	// Navigation / Load handlebar template
	var source   = document.querySelector("#nav-tpl").innerHTML;
	var template = Handlebars.compile(source);
	document.querySelector("nav ul").innerHTML = template(datas);

	// Checklist / Load handlebar template
	var source   = document.querySelector("#checklist-tpl").innerHTML;
	var template = Handlebars.compile(source);
	document.querySelector("#checklist").innerHTML = template(datas);

	// Nav filters
	var nav = document.querySelectorAll("nav a");
	[].forEach.call(nav, function(a){
		a.addEventListener("click", function(){
			this.classList.toggle("active");
			var this_id = this.getAttribute("id").substr(1);
			document.getElementById("f"+this_id).classList.toggle("animhide");
			setTimeout(function(){
				document.getElementById("f"+this_id).classList.toggle("hide");
			},400);
		}, false);
	});

	// Event delegation on fieldsets
	var fieldsets = document.querySelectorAll("fieldset");
	[].forEach.call(fieldsets, function(fieldset){
		fieldset.addEventListener("click", function(e){
			e.preventDefault();
			var target = e.target;
			while(target && target.tagName !== "A"){
				target = target.parentNode;
			}
			// stop actions if the target is not <a>
			if(target==null) return;
			// Test buttons n/a or ok
			if(target.classList.contains('bt-na')){
				clickItem(target, "unactive");
			}
			else if(target.classList.contains('bt-ok')){
				clickItem(target, "active");
			}	
		}, false);
	});
})();

// To know if the first item is active :/
var firstItemActive = false;
/*
@params
	el: 		HTMLElement - a
	classname: 	String - state to update
*/
function clickItem(el, classname){
	el.classList.toggle("active");
	var elparent = el.parentNode.parentNode;
	if ( (" " + elparent.className + " ").replace(/[\n\t]/g, " ").indexOf(" "+classname+" ") > -1 ){
		elparent.className = "";
		changePosition(elparent,"default");
	} 
	else{
		elparent.className = classname;
		changePosition(elparent,classname);
	}
}
/*
@params
	el: 	HTMLElement - li
	type: 	String - item status
*/
function changePosition(el, type){
	var elpos = el.getAttribute("data-pos");
	var elstarget, eltarget, elindex = -1, loopindex = 0, elnew;
	var elparent = el.parentNode;
	var eltarget = elparent.firstChild;

	switch(type){
		case "default":
			elstarget = elparent.querySelectorAll("li:not(.active):not(.unactive)");
			// Nb active elements
			elindex = elparent.querySelectorAll("li.active").length;
		break;
		case "active":
			elstarget = elparent.querySelectorAll("li.active");
			elindex = 0;
		break;
		case "unactive":
			elstarget = elparent.querySelectorAll("li.unactive");
			// Nb active & default
			elindex = elparent.querySelectorAll("li:not(.unactive)").length;
		break;
	}
	[].forEach.call(elstarget, function(elloop, index){
		if(elpos>elloop.getAttribute("data-pos")){
			loopindex = index;
		}
		else{
			return;
		}
	});
	if (elindex==0 && elpos==0 && el.classList.contains("active")) firstItemActive = true;
	else if (elpos==0) firstItemActive = false;
	// second item in the list is active while the first is already active
	if(elindex==0 && elpos==1 && firstItemActive) loopindex = 1;
	elindex += loopindex;
	// Target item where our item is inserted after
	eltarget = elparent.querySelectorAll("li")[elindex];
	// No next silbling if the first item in inserted at the first position
	eltarget = (elindex==0)?eltarget:eltarget.nextSibling;
	if(elindex != -1){
		// Clone the element
		elnew = el.cloneNode(true);
		// Insert the new element / insertAfter
		elparent.insertBefore(elnew, eltarget);
		// Remove the old element
		elparent.removeChild(el);
	}
}