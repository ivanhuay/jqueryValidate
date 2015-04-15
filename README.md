# jqueryValidate
This jQuery plugin makes simple clientside form validation easy

##how to use

bootstrap implementation example
```html
<form id="mainForm" action="#">
	<div class="row">
		<div class="input-field col s6">
			<input type="text" name="name" data-validation="required">
			<label for="name">Name</label>
		</div>
	</div>
	<div class="row">
		<div class="input-field col s6">
			<input type="text" name="email" data-validation="required email">
			<label for="email">Email</label>
		</div>
	</div>
	<div class="row">
		<div class="input-field col s6">
			<input type="password" name="pass" id="pass1" data-validation="required min-length" data-validation-length="8">
			<label for="pass">Password</label>
		</div>
	</div>
	<div class="row">
		<div class="input-field col s6">
			<input type="password" name="pass2" data-validation="required match" matchid="pass1">
			<label for="">Repeat password</label>
		</div>
	</div>
	<button id="submit" class="waves-effect waves-light btn">Submit</button>
</form>
```

```javascript
$("#submit").on("click",function (e){
	e.preventDefault();
	$("#mainForm").validate();
});
```

##features recently added

###success function
success function parameter to handle the callback after validation
the success function recives as parameter the serialized data

####example:

```javascript
$("#mainForm").validate({
	success:function(data){
		console.log(data);
	}
	});
```

###callback & validCallback functions

function to customise de validation callbacks, recive as parameters each input

####example
```javascript
$("#mainForm").validate({
	success:function(data){
		console.log(data);
	},
	callback:function(input){
		alert("Error: "+input.val()+" wrong parameter");
	},
	validCallback:function(input){
		alert("Dara: "+input.val()+" Acepted");
	},
});
```
###clean function

function to clean al error in form or input
 
####example
```javascript
$("#mainForm").validate('clean');
```

