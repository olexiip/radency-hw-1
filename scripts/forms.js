	const inputItemName = document.querySelector("#itemName");
	const inputItemContent = document.querySelector("#itemContent");
	const creationForm = document.querySelector(".form-container-add"); 
	
	const form = document.querySelector(".form-container-add");

	export function openForm(form, item) {
		console.log("openForm");
		console.log(form);
		console.log(item);
		//console.log(myCategoryes);
		form.style.display = "block";
		
		document.querySelector(".form-background").style.display = "block";
		const inputItemName = form.querySelector("#itemName");
		const inputItemContent = form.querySelector("#itemContent");
		
		inputItemName.addEventListener("input", ()=> disableButton(form));
		inputItemContent.addEventListener("input", ()=> disableButton(form));
		
		if (item) {
			form.customID = item.id;
			form.querySelector("#itemName").value = item.name;
			console.log(form.querySelector("#itemCategory"));
			form.querySelector("#itemCategory").value = item.category;
			//form.querySelector("#itemCategory").value = item.category; 
			
			form.querySelector("#itemContent").value = item.content;
			form.querySelector("#itemDate").value = item.dates;
		}
	};

	export function closeForm(form) {
		console.log("closeForm");
		//console.log(form);
		form.style.display = "none";
		const inputItemName = form.querySelector("#itemName");
		const inputItemContent = form.querySelector("#itemContent");
		document.querySelector(".form-background").style.display = "none";
		inputItemName.removeEventListener("change", (()=> disableButton(form)));
		inputItemContent.removeEventListener("change", (()=> disableButton(form)));
		form.reset(); 
		disableButton(form);
	};

	function disableButton(form) {
		const inputItemName = form.querySelector("#itemName");
		const inputItemContent = form.querySelector("#itemContent");
		const dateField = form.querySelector("#itemDate")
		const dates = inputItemContent.value.match(/\d{1,2}[\.\-\/]\d{1,2}[\.\-\/]\d{4}/gm);
		dateField.value = dates;
		console.log(dates);
	

		if (!(inputItemName.value && inputItemContent.value)) {
			//console.log("disable");
			form.querySelector(".btn").setAttribute("disabled", "");
		} else {
			//console.log("enable");
			form.querySelector(".btn").removeAttribute("disabled");
		}
	}

	export function submitBtn(e) {
		e.preventDefault();
		console.log("submitBtn");
		//console.log(e);
		//console.log(e.srcElement.itemName.value);
		//console.log(e.srcElement.itemCategory.value);
		//console.log(e.srcElement.itemContent.value);
		//console.log(e.srcElement.itemDate.valueAsDate);
		return {
				
				name: e.srcElement.itemName.value,
				Created: new Date(),
				category: e.srcElement.itemCategory.value,
				content: e.srcElement.itemContent.value,
				dates: e.srcElement.itemDate.value,
		}
	};


