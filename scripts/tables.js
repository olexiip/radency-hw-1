const dataTable = document.querySelector(".main-table");
const archDataTable = document.querySelector(".arch-table");

export const clearTable = (table) => {
	while (table.children[1]) {
		table.removeChild(table.children[1]);
		//console.log("del")
	}
}

const composeRow = (newItem, btns) => {
	console.log("createRow");
	//console.log(newItem);
	const element = document.createElement("tr");
	element.customID = newItem.id;
	element.className = "listItem";

	//tName.addEventListener("click", (e) => { 
	//	console.log(e); 
	//} )
	const tName = document.createElement("th");
	const tCreatDate = document.createElement("th");
	const tCategory = document.createElement("th");
	const tContent = document.createElement("th");
	const tDate = document.createElement("th");
	const tButtons = document.createElement("th");

	const timeFormatter = (d) => {
		//console.log("timeFormatter")
		//console.log(d);
		//items1[0].Created = new Date(items1[0].Created);
		try {
			//console.log("***")
			//console.log(d);
			const normDate = new Date(d);
			const res = `${normDate.getDate()}.${normDate.getMonth()+1}.${normDate.getFullYear()}`
			//console.log("---")
			//console.log(res)
			return res;
		} catch (e) {
			//console.log(e);
			//console.log("bad date ++++++")
			return ""
		}
	}

	tName.textContent = newItem.name;
	tCreatDate.textContent = timeFormatter(newItem.Created);
	tCategory.textContent = newItem.category;
	tContent.textContent = newItem.content;
	tDate.textContent = newItem.dates;
	//console.log("====");
	//console.log(tCreatDate.textContent);

	tButtons.appendChild(btns);

	element.appendChild(tName);
	element.appendChild(tCreatDate);
	element.appendChild(tCategory);
	element.appendChild(tContent);
	element.appendChild(tDate);
	element.appendChild(tButtons);
	//console.log(element);
	return element;
}

const composeRowofBtns = (ArrOfBtns) => {
	//console.log("composeRowofBtns");
	const btns = document.createElement("div");
	ArrOfBtns.forEach((item)=>{
		btns.appendChild(item);
	});
	return btns;
}
const createEditBtn = () => {
	const btn = document.createElement("button");
	btn.className = "edit-btn optBtn";
	btn.textContent = "edit";
	return btn;
}
const createDelBtn = () => {
	const btn = document.createElement("button");
	btn.className = "delete-btn optBtn";
	btn.textContent = "del";
	return btn;
}
const createArchBtn = () => {
	const btn = document.createElement("button");
	btn.className = "archive-btn optBtn";
	btn.textContent = "arch";
	//btn.onclick = {someFincton};
	return btn;
}

export const refreshTable = (myDataStorage, myDataStorageArchived) => {
	console.log("refreshTable")
	const dataTable = document.querySelector(".main-table");
	const archDataTable = document.querySelector(".arch-table");
	clearTable(dataTable);
	clearTable(archDataTable);
	

	myDataStorage.items.forEach(function(item){
		//composeRow();
		const btns = [ createEditBtn() ,createArchBtn(), createDelBtn()];
		const rowOfBtns =  composeRowofBtns(btns);
		const element = composeRow(item, rowOfBtns)
		dataTable.appendChild(element);
	})
	myDataStorageArchived.items.forEach(function(item){
		const btns = [createDelBtn()];
		const rowOfBtns =  composeRowofBtns(btns);
		const element = composeRow(item, rowOfBtns)
		archDataTable.appendChild(element);
	})

}

export const setItemListeneres = (myQuerySelector, propsFunctin, propsData) => {
	//console.log("setItemListeneres-------------------");
	//console.log(myQuerySelector);
	//console.log(propsFunctin);
	//console.log(propsData);
	//console.log("setItemListeneres-------------------");
	const ffff = document.querySelectorAll(myQuerySelector);
	//console.log(ffff);
	for (let i=0; i<ffff.length; i++) {
		//console.log(ffff[i]);
		ffff[i].addEventListener("click", (event, propsData) => propsFunctin(event, propsData));
	};
}

