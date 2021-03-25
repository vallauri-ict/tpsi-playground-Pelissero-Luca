"use strict";

$(document).ready(function(){	
	
	let _login = $("#login")

		
    _btn.on("click", function(){
		let _user = _login.find("input").eq(0)
		let _pwd = _login.find("input").eq(1)
		let _btn = _login.children("div").eq(2).children("div").eq(1)
		
		if(_user.val()=="" || _pwd.val()==""){
			alert ("attenzione campi non compilati")
		}
		else{
			let user = _user.val();
			let pwd=_pwd.val();
			const url = `http://localhost:3000/utenti?nome=${user}`
			let rq = inviaRichiesta("GET", url);
			rq.fail(errore)
			rq.done(function(data){	
				console.log(data)
			})	
		}
	})
})