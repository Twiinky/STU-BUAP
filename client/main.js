import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Boletos } from './lib/collections.js';
B = new Mongo.Collection('b');
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
		var listName = $('[name=listName]').val();
		Accounts.createUser({
            email: email,
            password: password,
            
        });
      B.insert({
          listName: listName
      });
      $('[name=listName]').val('');
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
Template.inicio.events({
	'submit .inicio': function(event){
		event.preventDefault();
		var title = event.target.title.value;
		Boletos.insert({
			title: title,
			createdAt: new Date()
		});
		event.target.title.value="";
		return false;
	}
});

Template.codigo.onRendered(function () {
    $('#qrcode').qrcode({
      size: 250,
      text: "201345534",
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

