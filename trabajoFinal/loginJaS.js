function ingreso() {
    var usu = document.getElementById("usuario").value;//creamos una varible y lo igualamos al id del html
    var con = document.getElementById("contraseña").value;//creamos una variable y lo igualamos al id del html

    // Si la contraseña y usuario son existosos, nos manda a otro HTML. si no aparece una alerta.
    if (usu == "admin" && con == "admin231"){
        window.location="vista.html"
    }
    if(usu == "user1" && con == "user123"){
        window.location="index.html"
    }else{
        alert("USUARIO O CONTRASEÑA DENEGADO");
    }

}



