// Helpers
Handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
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

	// Buttons N/A
	var btsna = document.querySelectorAll(".bt-na");
	[].forEach.call(btsna, function(a){
		a.addEventListener("click", function(e){
			this.classList.toggle("active");
			var elparent = this.parentNode.parentNode;
			if ( (" " + elparent.className + " ").replace(/[\n\t]/g, " ").indexOf(" unactive ") > -1 ){
				elparent.className = "";
			} 
			else{
				elparent.className = "unactive";
			}
			e.preventDefault();
		}, false);
	});

	// Buttons Ok
	var btsok = document.querySelectorAll(".bt-ok");
	[].forEach.call(btsok, function(a){
		a.addEventListener("click", function(e){
			this.classList.toggle("active");
			var elparent = this.parentNode.parentNode;
			if ( (" " + elparent.className + " ").replace(/[\n\t]/g, " ").indexOf(" active ") > -1 ){
				elparent.className = "";
			} 
			else{
				elparent.className = "active";
			}
			e.preventDefault();
		}, false);
	});
})();