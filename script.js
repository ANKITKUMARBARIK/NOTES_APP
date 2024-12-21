const btn = document.querySelector('#btn')
const notesContainer = document.querySelector('.notes-container')

document.addEventListener('DOMContentLoaded', showData)

btn.addEventListener('click', () => {
    const p = document.createElement('p')
    p.contentEditable = true
    p.style.flex = '1'
    p.style.outline = 'none'

    p.addEventListener('input', storeData)

    const deleteBtn = document.createElement('img')
    deleteBtn.className = 'delete-btn'
    deleteBtn.src = 'delete.png'
    deleteBtn.style.width = '28px'
    deleteBtn.addEventListener('click', () => {
        notesContainer.removeChild(noteDiv)
        storeData()
    });

    const noteDiv = document.createElement('div')
    noteDiv.className = 'note'
    noteDiv.appendChild(p)
    noteDiv.appendChild(deleteBtn)
    notesContainer.appendChild(noteDiv)
    p.focus()

    storeData()
})

function storeData() {
    const notes = []
    const noteDivs = document.querySelectorAll('.note')
    noteDivs.forEach(noteDiv => {
        const noteText = noteDiv.querySelector('p').innerText
        notes.push(noteText)
    })
    localStorage.setItem('data', JSON.stringify(notes))
}

function showData() {
    const savedNotes = JSON.parse(localStorage.getItem('data')) || []
    savedNotes.forEach(noteText => {
        const noteDiv = document.createElement('div')
        noteDiv.className = 'note'

        const p = document.createElement('p')
        p.contentEditable = true
        p.style.flex = '1'
        p.style.outline = 'none'
        p.innerText = noteText

        p.addEventListener('input', storeData)

        const deleteBtn = document.createElement('img')
        deleteBtn.className = 'delete-btn'
        deleteBtn.src = 'delete.png'
        deleteBtn.style.width = '28px'
        deleteBtn.addEventListener('click', () => {
            notesContainer.removeChild(noteDiv)
            storeData()
        })

        noteDiv.appendChild(p)
        noteDiv.appendChild(deleteBtn)
        notesContainer.appendChild(noteDiv)
    })
}
