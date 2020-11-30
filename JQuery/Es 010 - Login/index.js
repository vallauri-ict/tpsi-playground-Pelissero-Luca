"use strict";

var utenti = [{ "user": "pippo", "pwd": "pwdPippo" },
    { "user": "pluto", "pwd": "pwdPluto" },
    { "user": "minnie", "pwd": "pwdMinnie" }
];

$(document).ready(function() {

    let _user = $("#txtUser");
    let _pwd = $("#txtPwd");

    let _msgUser = $("#msgUser")
    let _msgPwd = $("#msgPwd")

    _user.change(function() {
        let ok = false;

        if (_user.val() != "") {
            for (const item of utenti) {
                if (_user.val() == item.user) {
                    ok = true;
                }
            }
        }

        if (!ok) {
            _user.addClass("nok");
            _msgUser.css({ color: "red" }).text("User non valido");
            _msgUser.fadeIn(2000);
        } else {
            _user.removeClass("nok")
            _msgUser.css({ color: "green" }).text("OK");
            _msgUser.fadeIn(2000);
        }
    })

    _user.hover(function() { $(this).addClass("over") }, function() { $(this).removeClass("over"); })
    _pwd.hover(function() { $(this).addClass("over") }, function() { $(this).removeClass("over"); })

    _pwd.change(function() {
        let ok = false;

        if (_pwd.val() != "")
            for (const item of utenti)
                if (_pwd.val() == item.pwd)
                    if (item.user == _user.val())
                        ok = true;
        if (!ok) {
            _pwd.addClass("nok");
            _msgPwd.css({ color: "red" }).text("Pwd non valida o non corrispondente");
            _msgPwd.fadeIn(2000);
        } else {
            _pwd.removeClass("nok")
            _msgPwd.css({ color: "green" }).text("OK");
            _msgPwd.fadeIn(2000);
        }
    })
});