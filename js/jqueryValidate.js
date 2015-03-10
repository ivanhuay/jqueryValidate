;(function($,window,undefined){
	var validate=function(selector,opciones){
		//tengo que declarar las variables q me interesan
		if(this.init)
		{
			this.init(selector,opciones);
		}
	}
	validate.prototype={
		default:{
			
		},
		validateEmail:function(email){
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
		},
		validate:function(){

		},

		init:function(select,opciones){
			valido = true;
			var paso = this;//para no entrar en conflicto dentro del .each
			
			select.find('input,textarea,select').filter('[data-validation]').each(function (index){
				
				var data_validation = $(this).attr("data-validation");
				var valtype = data_validation.split(" ");
				for(var i in valtype){
					if(valtype[i] == "required"){
						if($(this).val()=="" || $(this).val()==false){
							valido = false;
							if(!$("#"+$(this).prop("name")+"_error_"+valtype[i]).length){
								$("<p id='"+$(this).prop("name")+"_error_"+valtype[i]+"' style='color:red'>Campo obligatorio</p>").insertAfter($(this));
								
							}
						}else{
							if($("#"+$(this).prop("name")+"_error_"+valtype[i]).length){
								$("#"+$(this).prop("name")+"_error_"+valtype[i]).remove();
							}
						}
						
					}
					if(valtype[i] == "email"){
						if(!paso.validateEmail($(this).val())){
							valido = false;
							if(!$("#"+$(this).prop("name")+"_error_"+valtype[i]).length){
								$("<p id='"+$(this).prop("name")+"_error_"+valtype[i]+"' style='color:red'>Email no valido</p>").insertAfter($(this));
								
							}
						}else{
							if($("#"+$(this).prop("name")+"_error_"+valtype[i]).length){
								$("#"+$(this).prop("name")+"_error_"+valtype[i]).remove();
							}
						}
						
					}
					if(valtype[i] == "match"){
						var match_id = $(this).attr("matchid");
						
						if(! ( $(this).val() == $("#"+match_id).val() ) ){
							valido = false;
							console.log("not match");
							if(!$("#"+$(this).prop("name")+"_error_"+valtype[i]).length){
								$("<p id='"+$(this).prop("name")+"_error_"+valtype[i]+"' style='color:red'>Los campos no coinciden</p>").insertAfter($(this));
								
							}
						}else{
							if($("#"+$(this).prop("name")+"_error_"+valtype[i]).length){
								$("#"+$(this).prop("name")+"_error_"+valtype[i]).remove();
							}
						}
						
					}
					if(valtype[i] == "length"){
						var thislenght = $(this).attr("data-validation-length");
						
						if(! ( $(this).val().length >= thislenght ) && $(this).val()!="" ){
							valido = false;
							//console.log("not match");
							if(!$("#"+$(this).prop("name")+"_error_"+valtype[i]).length){
								$("<p id='"+$(this).prop("name")+"_error_"+valtype[i]+"' style='color:red'>El campo requiere "+thislenght+" caracteres como minimo</p>").insertAfter($(this));
								
							}
						}else{
							if($("#"+$(this).prop("name")+"_error_"+valtype[i]).length){
								$("#"+$(this).prop("name")+"_error_"+valtype[i]).remove();
							}
						}
						
					}
					
				}
			});
			if(select.is("form") && valido ){
				select.submit()
			}
			//return valido;
			

			

		},

	}
	$.fn.validateH=function(opciones){
		if(typeof opciones=='string')
		{
			metodo=opciones;
			args=Array.prototype.slice.call(arguments,1);
			var validHel=(this.data('validHel'))?this.data('validHel'):new validateH;
			if(validHel[metodo])
			{
				validHel[metodo].apply(validHel,args);
			}
		}else if(typeof opciones=='object' || !opciones)
		{
			this.data('validHel',new validateH(this,opciones));
		}else if(typeof opciones == "undefined"){
			this.data('validHel',new validateH(this,{}));
		}else
		{
			$.error('Error, parametro ingresado es incorrecto.');
		}
		return this;
	}
	window.validateH=validate;
})(jQuery,window)