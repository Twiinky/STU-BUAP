import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Boletos } from '../lib/collections.js';

import './main.html';

Router.configure({
	layoutTemplate: 'principal'
});
Router.route('/registro');
Router.route('/ingresar');
Router.route('/SesionUsuario');
Router.route('/SesionError');
Router.route('/',{
	name:'inicio',
	template:'inicio'
});

Template.registro.events({
	'submit form': function(event){
		event.preventDefault();
		var email = $('[name=email]').val();
		var password = $('[name=password]').val();
		var matricula = $('[name=matricula]').val();


		Accounts.createUser({
            email: email,
            password: password,
        
        });
		const mat=String(matricula);
    
		Boletos.insert({
       		matricula: matricula,
       		correo: email,

   		});
     
      
      
		Router.go('SesionUsuario');
	}
});

Template.navegacion.events({
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
		Router.go('inicio');
	}
});

var hola="hola";
Template.ingresar.events({
	'submit form': function(event){
		event.preventDefault();
		var email=$('[name=email]').val();
		var password=$('[name=password]').val();
		Meteor.loginWithPassword(email, password, function(error){
    if(error){
        console.log(error.reason);
        Router.go('SesionError');
    } else {
    	hola=email;
        Router.go('SesionUsuario');
        var m=Boletos.distinct("matricula",{correo: email}).toString();
    	 console.log(m);
    }
});
		
	}
});

Template.codigo.onRendered(function () {

    $('#qrcode').qrcode({
      size: 250,
      text: "201245534",
      background: '#F2F2F2',
      //mode: 2,
      //label: '201345534',
      //fontname: 'Helvetica',
      //fontcolor: '#005580',
      fill: '#005580',
      //image: '/buap.png'
    });
    return false;
  });

Template.MuestraCodigo.helpers({
	'muestracodigo' : function(){
		return Meteor.userID();
	}
})


Template.codigo.helpers({
	'matricul': function(){
	h=Boletos.find({matricula:"0"});

	return (hola);
	}	
	
	
});
