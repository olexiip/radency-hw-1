import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const myDataStorage = { items:[]};
const myDataStorageArchived = {items:[]};

export const readLS = () => {
	try {
		const items1 = (JSON.parse(localStorage.getItem("data"))).items;
		const items2 = (JSON.parse(localStorage.getItem("archivedData"))).items;
		return [items1, items2];
	}catch(e){
		//console.log(e);
		return [[],[]];
	}
}

export const reset = (myDataStorage, myDataStorageArchived) => {
	console.log("reset")
	const defaultData = createDefaultData();
	myDataStorage.items = defaultData[0].items;
	myDataStorageArchived.items  = defaultData[1].items;
	//writeLS(myDataStorage, myDataStorageArchived);
	//readLS();
}

export const writeLS = (myDataStorage, myDataStorageArchived) => {
	console.log("writeLS");
	//console.log(myDataStorage);
	//console.log(myDataStorageArchived);
	try {
		localStorage.setItem("data", JSON.stringify(myDataStorage));
		localStorage.setItem("archivedData", JSON.stringify(myDataStorageArchived));
	}catch(e){
		// якщо перевищено ліміт
		 if (e.name == "QUOTA_EXCEEDED_ERR") alert('QUOTA_EXCEEDED_ERR:  localStorage перевищено допустимий ліміт');
		else alert(e);
	}
}

export const createDefaultData = () => {
	console.log("createDefaultData")
	//const randDate = () =>  {
	//	const d1 = new Date();
	//	//console.log(`${d1.getDate()}.${d1.getMonth()}.${d1.getFullYear()}`)
	//	return d1;
	//}

	const tempMyDataStorage = {
		items: [
			{	id: uuidv4(),
				name: "Shopping list",
				Created: new Date(),
				category: "Task",
				content: "Tomatoes, bread",
				dates: "5-55-5555",
			},
			{	id: uuidv4(),
				name: "The theory of evolution",
				Created: new Date(),
				category: "Random Thought",
				content: "The evolution lorum",
				dates: "",
			},
			{	id: uuidv4(),
				name: "New feature",
				Created: new Date(),
				category: "Idea",
				content: "Implement new feature",
				dates: "",
			},

		]};
	const tempMyDataStorageArchived = {
		items: [
			{	id: uuidv4(),
				name: "Shopping list a",
				Created: new Date(),
				category: "Task",
				content: "Tomatoes, bread, tea",
				dates: "",
			},
			{	id: uuidv4(),
				name: "The lol a",
				Created: new Date(),
				category: "Random Thought",
				content: "The lol kek",
				dates: "",
			},
			{	id: uuidv4(),
				name: "New text a",
				Created: new Date(),
				category: "Idea",
				content: "text ",
				dates: "",
			},

	]};
		return [tempMyDataStorage, tempMyDataStorageArchived];
}
	



