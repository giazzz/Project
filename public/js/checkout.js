function checkForm() {
			var firstName = document.forms["form_data"].firstName.value;
            var lastName = document.forms["form_data"].lastName.value;
            var address = document.forms["form_data"].address.value;
            var phone = document.forms["form_data"].phone.value;
            var email = document.forms["form_data"].email.value;

			if(email.length >0){
				return true;
			}else{
				if(email.length <=0){
					document.forms["form_data"].email.nextElementSibling.style.display = "block";
				}
				if(email.length >0){
					if(document.forms["form_data"].email.nextElementSibling){
						document.forms["form_data"].email.nextElementSibling.remove();
					}
				}
				
				if(firstName.length <=0){
					document.forms["form_data"].firstName.nextElementSibling.style.display = "block";
				}
				if(firstName.length >0){
					if(document.forms["form_data"].firstName.nextElementSibling){
						document.forms["form_data"].firstName.nextElementSibling.remove();
					}
				}

                if(lastName.length <=0){
					document.forms["form_data"].lastName.nextElementSibling.style.display = "block";
				}
				if(lastName.length >0){
					if(document.forms["form_data"].lastName.nextElementSibling){
						document.forms["form_data"].lastName.nextElementSibling.remove();
					}
				}
				
				if(phone.length <=0){
					document.forms["form_data"].phone.nextElementSibling.style.display = "block";
				}
				if(phone.length >0){
					if(document.forms["form_data"].phone.nextElementSibling){
						document.forms["form_data"].phone.nextElementSibling.remove();
					}
				}

                if(address.length <=0){
					document.forms["form_data"].address.nextElementSibling.style.display = "block";
				}
				if(address.length >0){
					if(document.forms["form_data"].address.nextElementSibling){
						document.forms["form_data"].address.nextElementSibling.remove();
					}
				}
			}
		
			return false;
        }