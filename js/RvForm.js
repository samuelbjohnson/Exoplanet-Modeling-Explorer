/*License information needs to go here*/

//dojo.provide("org.exoplanets.eme.js.RvForm");

dojo.require("org.exoplanets.eme.js.RvParameter");
dojo.require("org.exoplanets.eme.js.science.Orbels");

dojo.declare("org.exoplanets.eme.js.RvForm", null, {

	constructor: function(/*Node*/containerNode) {
		var orbels = new org.exoplanets.eme.js.science.Orbels(null);
		
		this.getContainerNode = function() {
			return containerNode;
		};
		
		this.setContainerNode = function(newContainer) {
			containerNode = newContainer;
		};
		
		this.getOrbels = function() {
			return orbels;
		};
		
		this.setOrbels = function(newOrbels) {
			orbels = newOrbels;
		}
		
		this.setupSliders();
	},
	
	setupSliders: function() {
		var s = {}, prop;
		
		s.P = new org.exoplanets.eme.js.RvParameter(dojo.create("div", {}, this.getContainerNode()), {
			parameterName: "Period",
			name: "period",
			minimum: 0,
		});
		
		s.tp = new org.exoplanets.eme.js.RvParameter(dojo.create("div", {}, this.getContainerNode()), {
			parameterName: "Time of Periastron",
			name: "timeOfPeriastron",
		});
		
		s.e = new org.exoplanets.eme.js.RvParameter(dojo.create("div", {}, this.getContainerNode()), {
			parameterName: "Eccentricity",
			name: "eccentricity",
			minimum: 0,
			maximum: 1
		});
		
		s.om = new org.exoplanets.eme.js.RvParameter(dojo.create("div", {}, this.getContainerNode()), {
			parameterName: "Omega",
			name: "omega",
			minimum: 0,
			maximum: 360
		});
		
		s.k = new org.exoplanets.eme.js.RvParameter(dojo.create("div", {}, this.getContainerNode()), {
			parameterName: "Radial Velocity Semi-Amplitude",
			name: "semiAmplitude",
			minimum: 0,
		});
		
		s.cmvel = new org.exoplanets.eme.js.RvParameter(dojo.create("div", {}, this.getContainerNode()), {
			parameterName: "Center of Mass Velocity",
			name: "cmvel"
		});
		
		s.dvdt = new org.exoplanets.eme.js.RvParameter(dojo.create("div", {}, this.getContainerNode()), {
			parameterName: "dvdt",
			name: "dvdt"
		});
		
		this.sliders =  s;
		
		for(prop in s) {
			dojo.connect(s[prop], "onChange", this, this.updateValues);
		}
		
	},
	
	updateValues: function() {
		console.log("RvForm.updateValues()");
		var tempOrbels = {};
		for(prop in this.sliders) {
			tempOrbels[prop] = (this.sliders[prop]).getValue();
		}
		
		this.setOrbels(new org.exoplanets.eme.js.science.Orbels(tempOrbels));
		
		this.updateComplete();
	},
	
	/* 
		The purpose of this function is to create an event that will
		be triggered when the update is complete
	*/
	updateComplete: function() {
		console.log("RvForm.updateComplete()");
	}
	
	

});