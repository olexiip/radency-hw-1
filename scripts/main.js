	import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
	import {openForm, closeForm, submitBtn} from "../scripts/forms.js"
	import {readLS, reset, writeLS} from "../scripts/data.js"
	import {refreshTable, setItemListeneres} from "../scripts/tables.js"
	//console.log(uuidv4()); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'	

	console.log("start");
	const myDataStorage = { items:[]};
	const myDataStorageArchived = {items:[]};
	[myDataStorage.items, myDataStorageArchived.items] = readLS();
	
	const addItemform = document.querySelector(".form-container-add");
	const editItemform = document.querySelector(".form-container-edit");

	const createCategoryes = () => {
	const myCategoryes = {rand: "Random Thought", task:"Task", idea: "Idea"};
	const categoryesSel = [];
	Object.keys(myCategoryes).forEach((item, index)=>{
			categoryesSel[index] = `<option value="${myCategoryes[item]}">${myCategoryes[item]}</option>`;
	});
	addItemform.querySelector(`#itemCategory`).innerHTML=categoryesSel;
	editItemform.querySelector(`#itemCategory`).innerHTML=categoryesSel;
	return myCategoryes;
	}
	const myCategoryes = createCategoryes();
	//console.log(myCategoryes);


	const resetData = () => {
		console.log("reset strt")
		reset(myDataStorage, myDataStorageArchived);
		writeLS(myDataStorage, myDataStorageArchived);
		[myDataStorage.items, myDataStorageArchived.items] = readLS();
		refreshTable(myDataStorage, myDataStorageArchived);
		setEvents();
		console.log("reset end")
	}

//console.log(addItemform);

	//const dataTable = document.querySelector(".main-table");
	//const archDataTable = document.querySelector(".arch-table");

	const submitform = (event) => {
		console.log("submitform");
		//const newItem = {id: uuidv4(), ...submitBtn(event)};
		const newItem = submitBtn(event);
		newItem.id =uuidv4();
		console.log(event.path[0]);
		const form = event.path[0];
		closeForm(form);
		myDataStorage.items.push(newItem);
		//console.log(myDataStorage);
		writeLS(myDataStorage, myDataStorageArchived);
		[myDataStorage.items, myDataStorageArchived.items] = readLS();
		refreshTable(myDataStorage, myDataStorageArchived);
		setEvents();
	}

	const submitEditForm = (event) => {
		console.log("submitEditForm");
		//const newItem = {id: uuidv4(), ...submitBtn(event)};
		const EditedItem = submitBtn(event);
		//newItem.id =uuidv4();
		console.log(EditedItem);
		const form = event.path[0];
		closeForm(form);
		
		myDataStorage.items.find((item, index)=> {
			if(item.id === form.customID) {
				console.log("finded!");
				console.log(index)
				console.log(item)
				myDataStorage.items[index] = {...item, ...EditedItem};
				//item.dates = EditedItem.dates;
				console.log(item)
				return true;
			} 
		});
		console.log(myDataStorage);
		//alert("f")
		writeLS(myDataStorage, myDataStorageArchived);
		[myDataStorage.items, myDataStorageArchived.items] = readLS();
		refreshTable(myDataStorage, myDataStorageArchived);
		setEvents();
	}
	
	document.addEventListener("load", refreshTable(myDataStorage, myDataStorageArchived));

	const delF = (e) => {
		console.log("delF"); 
		//console.log(e); 
		//console.log(e.path[3]);
		//console.log(e.path[3].customID);
		//console.log(myDataStorage)

		myDataStorage.items.find(function(item, index) {
			if (item.id === e.path[3].customID) {
				myDataStorage.items.splice(index,1);
				console.log(myDataStorage);
				localStorage.setItem("data", JSON.stringify(myDataStorage));
				refreshTable(myDataStorage, myDataStorageArchived);
				setEvents();
				return [];
			};	
			
		})
	}

	const archF = (e) => {
		console.log("archF"); 
		//console.log(e); 
		//console.log(e.path[3]);
		//console.log(e.path[3].customID);
		//console.log(myDataStorage)

		myDataStorage.items.find(function(item, index) {
			if (item.id === e.path[3].customID) {
				const deletedItem = myDataStorage.items.splice(index,1);
				console.log(deletedItem);
				//myDataStorageArchived
				myDataStorageArchived.items.push(deletedItem[0])
				console.log(myDataStorage);
				localStorage.setItem("data", JSON.stringify(myDataStorage));
				localStorage.setItem("archivedData", JSON.stringify(myDataStorageArchived));
				refreshTable(myDataStorage, myDataStorageArchived);
				setEvents();
				return [];
			};	
			
		})

		
	}

	const unarchF = (e) => {
		console.log("unarchF"); 
		//console.log(e); 
		//console.log(e.path[3]);
		//console.log(e.path[3].customID);
		//console.log(myDataStorage)

		myDataStorageArchived.items.find(function(item, index) {
			if (item.id === e.path[3].customID) {
				const deletedItem = myDataStorageArchived.items.splice(index,1);
				console.log(deletedItem);
				//myDataStorageArchived
				myDataStorage.items.push(deletedItem[0])
				console.log(myDataStorageArchived);
				localStorage.setItem("data", JSON.stringify(myDataStorage));
				localStorage.setItem("archivedData", JSON.stringify(myDataStorageArchived));
				refreshTable(myDataStorage, myDataStorageArchived);
				setEvents();
				return [];
			};	
			
		})

		
	}

	const delFArch = (e) => {
		console.log("delFArch"); 
		//console.log(e); 
		//console.log(e.path[3]);
		//console.log(e.path[3].customID);
		console.log(myDataStorageArchived);

		myDataStorageArchived.items.find(function(item, index) {
			if (item.id === e.path[3].customID) {
				myDataStorageArchived.items.splice(index,1);
				console.log(myDataStorageArchived);
				localStorage.setItem("archivedData", JSON.stringify(myDataStorageArchived));
				refreshTable(myDataStorage, myDataStorageArchived);
				setEvents();
				return [];
			};	
			
		})


	}

	const editF = (e) => {
		console.log("editBtnF");
		console.log(e.path[3].customID);
		const item = myDataStorage.items.find((item ) => item.id === e.path[3].customID );
		openForm(editItemform, item);
	}

	const setEvents = () => {
		console.log("setEvents");
		const delBtnQSel = ".main-table>tr>th>div>.delete-btn"; // del btn 
		const editBtnQSel = ".main-table>tr>th>div>.edit-btn"; // edit btn 
		const archBtnQSel = ".main-table>tr>th>div>.archive-btn"; // edit btn 
		const delBtnQSelArchive = ".arch-table>tr>th>div>.delete-btn";
		const unarchBtnQSel = ".arch-table>tr>th>div>.unarchive-btn"; // del btn archived table
		setItemListeneres(delBtnQSel, delF);
		setItemListeneres(editBtnQSel, editF);
		setItemListeneres(archBtnQSel, archF);
		setItemListeneres(delBtnQSelArchive, delFArch);
		setItemListeneres(unarchBtnQSel, unarchF);
	}

	setEvents();

	document.querySelector(".addBtn").addEventListener("click", ()=> openForm(addItemform));
	addItemform.querySelector(".cancel").addEventListener("click", ()=> closeForm(addItemform));
	editItemform.querySelector(".cancel").addEventListener("click", ()=> closeForm(editItemform));

	document.querySelector(".form-background").addEventListener("click", ()=>  closeForm(addItemform));
	document.querySelector(".form-background").addEventListener("click", ()=> closeForm(editItemform));

	document.querySelector(".form-container-add").addEventListener("submit", (event) => {submitform(event)});
	document.querySelector(".form-container-edit").addEventListener("submit", (event) => {submitEditForm(event)});

	document.querySelector(".resetBtn").addEventListener("click", resetData);

	document.onkeydown = function(evt) {
		if (evt.key === "Escape") {
			closeForm(addItemform);
			closeForm(editItemform);
		};
		};


	