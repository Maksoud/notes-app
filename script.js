const addBtn = document.getElementById("add");

addBtn.addEventListener("click", () => {
    addNewNote();
});
    
//******************//

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
    notes.forEach(note => {
        addNewNote(note);
    });
}// if (notes)

function addNewNote(text = "") {
    
    const note = document.createElement("div");
    note.classList.add("note");
    
    //******************//
    
    note.innerHTML = `
        <div class="notes">
            <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main hidden">
                <!-- main content -->
            </div>
            <textarea></textarea>
        </div>
    `;
    
    //******************//
    
    const editBtn   = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");
    const main      = note.querySelector(".main");
    const textArea  = note.querySelector("textarea");
    
    //******************//
    
    // Recover previous saved text
    if (text) {
        
        textArea.value = text;
        main.innerHTML = marked(text);
    
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
        
    }// if (text)
    
    //******************//
    
    // Edit button 
    editBtn.addEventListener("click", () => {
        
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
        
    });
    
    //******************//
    
    // Delete button
    deleteBtn.addEventListener("click", () => {
        
        note.remove();
        
        updateLS();
        
    });
    
    //******************//
    
    // Text area content saver
    textArea.addEventListener("input", (event) => {
        
        const {value} = event.target;
        
        main.innerHTML = marked(value);
        
        updateLS();
        
    });
    
    //******************//
    
    document.body.appendChild(note);
    
}

function updateLS() {
    
    const notesText = document.querySelectorAll("textarea");
    
    const notes = [];
    
    notesText.forEach(note => {
        notes.push(note.value);
    });
    
    localStorage.setItem("notes", JSON.stringify(notes));
    
}



