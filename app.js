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
	  <textarea class=" note-txt" ${text ? "readonly" : ""} >${text}</textarea>
  `;
	note.insertAdjacentHTML("afterbegin", htmlData);
	container.appendChild(note);

	const editButton = note.querySelector(".edit");
	const deleteBtn = note.querySelector(".delete");
	const noteText = note.querySelector(".note-txt");

	//First view deal with focus and edit icon
	if (!text) {
		noteText.focus();
		editButton.firstElementChild.classList.add("fa-save");
	} else {
		editButton.firstElementChild.classList.add("fa-edit");
	}

	//Deleting the note
	deleteBtn.addEventListener("click", () => {
		note.remove();
		updateLSData();
	});

	//editButton
	editButton.addEventListener("click", () => {
		noteText.toggleAttribute("readonly");
		noteText.focus();
		editButton.firstElementChild.classList.toggle("fa-save");
		editButton.firstElementChild.classList.toggle("fa-edit");
	});

	noteText.addEventListener("change", updateLSData);
};

const notes = localStorage.getItem("notes");
if (notes) {
	const notes = JSON.parse(localStorage.getItem("notes"));
	notes.forEach((element) => {
		createNote(element);
	});
}
