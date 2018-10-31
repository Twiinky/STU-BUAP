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

var token;
var token2;
var token3;
Template.registro.events({
	'submit form': function(event){
		event.preventDefault();
		var email = $('[name=email]').val();
		var password = $('[name=password]').val();
		var matricula = $('[name=matricula]').val();
		token=email;
		token2=matricula;
		Accounts.createUser({
            email: email,
            password: password,
        
        });
		
    
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
    	token=email;
        Router.go('SesionUsuario');
    }
});
		
	}
});

Template.codigo.onRendered(function () {
    $('#qrcode').qrcode({
      size: 250,
      text: token2,
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




Template.codigo.helpers({
	'matricul': function(){

	var matricula_codigo=Boletos.findOne({correo:token});
	var newmatricula_codigo=matricula_codigo.matricula;

	console.log(newmatricula_codigo);
	token2=newmatricula_codigo;
	//console.log(typeof newmatricula_codigo);
	return(newmatricula_codigo);
	}	
});
