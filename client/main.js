import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {Mongo} from 'meteor/mongo';
Boletos = new Mongo.Collection('boletos');

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
		Accounts.createUser({
            email: email,
            password: password
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
        Router.go('SesionUsuario');
    }
});
		
		
	}
});

Template.codigo.onRendered(function () {
    $('#qrcode').qrcode({
      size: 200,
      text: "201845534"
    });
  });

Template.MuestraCodigo.helpers({
	'muestracodigo' : function(){
		return Meteor.userID();
	}
})

