const container = document.querySelector(".container");
const newBtn = document.querySelector(".new-note");
newBtn.addEventListener("click", () => createNote());

const updateLSData = () => {
	const allTextArea = document.querySelectorAll(".note-txt");
	const notes = [];
	allTextArea.forEach((element) => {
		return notes.push(`${element.value}`);
	});
	localStorage.setItem("notes", JSON.stringify(notes));
};

const createNote = (text = "") => {
	const note = document.createElement("div");
	note.classList.add("note");
	const htmlData = `
    <div class="action">
	    <button class="btn edit" "><i class="fas"></i></button>
	    <button class="btn delete" " ><i class="fas fa-trash-alt"></i></button>
	  </div>
    <div class="note-div ${text ? "" : "hidden"}">${text}</div>
	  <textarea class=" note-txt ${text ? "hidden" : ""} " ></textarea>
  `;
	note.insertAdjacentHTML("afterbegin", htmlData);
	container.appendChild(note);

	const editButton = note.querySelector(".edit");
	const deleteBtn = note.querySelector(".delete");
	const noteDiv = note.querySelector(".note-div");
	const noteText = note.querySelector(".note-txt");

	//If creating new note focus textarea
	if (!text) {
		noteText.focus();
		editButton.firstElementChild.classList.add("fa-save");
	} else {
		editButton.firstElementChild.classList.add("fa-edit");
	}
	noteDiv.innerHTML = text;
	noteText.value = text;
	//Deleting the note
	deleteBtn.addEventListener("click", () => {
		note.remove();
		updateLSData();
	});

	//editButton
	editButton.addEventListener("click", () => {
		noteDiv.classList.toggle("hidden");
		noteText.classList.toggle("hidden");
		noteText.focus();
		editButton.firstElementChild.classList.toggle("fa-save");
		editButton.firstElementChild.classList.toggle("fa-edit");
	});

	noteText.addEventListener("change", () => {
		noteDiv.innerHTML = noteText.value;
		updateLSData();
	});
};

const notes = localStorage.getItem("notes");
if (notes) {
	const notes = JSON.parse(localStorage.getItem("notes"));
	console.log(notes);
	notes.forEach((element) => {
		createNote(element);
	});
}
