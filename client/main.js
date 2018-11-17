import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Boletos } from '../lib/collections.js';
import { Vendedor } from '../lib/collections.js';

import './main.html';

Router.configure({
	layoutTemplate: 'principal',
	//layoutTemplate: 'principalVendedor'
});
Router.route('/registro');
Router.route('/ingresar');
Router.route('/navegacion');

Router.route('/registroVendedor');
Router.route('/ingresarVendedor');
Router.route('/navegacionVendedor');

Router.route('/SesionUsuario');
Router.route('/SesionVendedor');
Router.route('/SesionChofer');

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
       		boletos: 0
   		});
     
      
      
		Router.go('SesionUsuario');
	}
});

Template.registroVendedor.events({
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
		
    
		Vendedor.insert({
       		matricula: matricula,
       		correo: email
   		});
     
      
      
		Router.go('SesionVendedor');
	}
});


Template.navegacion.events({
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
		Router.go('inicio');
	}
});

Template.navegacionVendedor.events({
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


Template.ingresarVendedor.events({
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
        Router.go('SesionVendedor');
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

Template.SesionUsuario.helpers({
	'boleto' : function(){
		var bol=Boletos.findOne({correo:token});
		var boletos=bol.boletos;
		return(boletos);
	}
});

Template.SesionVendedor.helpers({
	'vendedor' : function(){
		var ven=Vendedor.findOne({correo:token});
		var nombreVendedor=ven.matricula;
		return(nombreVendedor);
	}
});

Template.codigo.helpers({
	'matricul': function(){

	var matricula_codigo=Boletos.findOne({correo:token});
	var newmatricula_codigo=matricula_codigo.matricula;
	var nombre=matricula_codigo.correo;
	//var boletos=matricula_codigo.boletos;


	
	token2=newmatricula_codigo;
	//console.log(typeof newmatricula_codigo);
	return(newmatricula_codigo);
	}	
});
