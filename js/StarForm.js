dojo.provide("org.exoplanets.eme.js.StarForm");

dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.Button");
dojo.require("dojox.data.XmlStore");

dojo.declare("org.exoplanets.eme.js.StarForm", null, {
	constructor: function(/*node*/ formContainer) {
		this.container = formContainer;
		this.buildHtml();
	},
	
	buildHtml: function() {
		this.form = dojo.create("form", {}, this.container);
		
		this.starNameBox = new dijit.form.TextBox({}, dojo.create("input", {type: "text", name: "starName"}, this.container));
		
		this.searchButton = new dijit.form.Button({label: "Find Star Data", onClick: dojo.hitch(this, this.retrieve)}, dojo.create("input", {type: "button"}, this.container));
	},
	
	getSeries: function() {
		return this.series;
	},
	
	retrieve: function() {
		var query;
		query = "starName=" + this.starNameBox.getValue();
		this.store = new dojox.data.XmlStore({
			url: "test/RVParser/rvDataXml.php?" + query,
			rootItem: "observation"
		});
		this.store.fetch({
			onComplete: dojo.hitch(this, this.processXml),
			onError: dojo.hitch(this, this.error)
		});
	},
	
	processXml: function(items, request) {
		var min, max = 0;
		this.series = new Array();
		dojo.forEach(items, dojo.hitch(this, function(item) {
			var x = this.store.getValue(item, "time");
			if ( !min || x < min ) {
				min = x;
			}
			if (x > max) {
				max = x;
			}
			this.series.push({
				x: x,
				y: this.store.getValue(item, "rv")
			});
		}));
		this.minObservation = min;
		this.maxObservation = max;
		this.updateComplete();
	},
	
	error: function() {
		alert("xml error");
	},
	
	getMinObservation: function() {
		return Number(this.minObservation.toString());
	},
	
	getMaxObservation: function() {
		return Number(this.maxObservation.toString());
	},
	
	/* 
		The purpose of this function is to create an event that will
		be triggered when the update is complete
	*/
	updateComplete: function() {
		console.log("StarForm.updateComplete()");
	}
});