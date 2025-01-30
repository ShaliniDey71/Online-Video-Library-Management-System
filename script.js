const addItemForm = document.getElementById('add-item-form');
const itemList = document.getElementById('item-list').getElementsByTagName('tbody')[0];
let editRow = null;

addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const type = document.getElementById('type').value;
    const releasedYear = document.getElementById('released-year').value;
    const genre = document.getElementById('genre').value;

    if (editRow) {
        // Update the existing row
        editRow.cells[0].innerText = title;
        editRow.cells[1].innerText = type;
        editRow.cells[2].innerText = releasedYear;
        editRow.cells[3].innerText = genre;
        editRow = null;
        document.getElementById('submit-btn').value = 'Add Item';

        // Display success message
        alert("Details updated successfully!");
    } else {
        const itemHTML = `
            <tr>
                <td>${title}</td>
                <td>${type}</td>
                <td>${releasedYear}</td>
                <td>${genre}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            </tr>
        `;
        itemList.innerHTML += itemHTML;

        // Display success message
        alert("Item added successfully!");
    }

    // Clear the form fields
    document.getElementById('title').value = '';
    document.getElementById('type').value = '';
    document.getElementById('released-year').value = '';
    document.getElementById('genre').value = '';
});

// Add event listener to edit and delete buttons
itemList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentNode.parentNode.remove();
        // Display success message
        alert("Item deleted successfully!");
    } else if (e.target.classList.contains('edit-btn')) {
        editRow = e.target.parentNode.parentNode;
        document.getElementById('title').value = editRow.cells[0].innerText;
        document.getElementById('type').value = editRow.cells[1].innerText;
        document.getElementById('released-year').value = editRow.cells[2].innerText;
        document.getElementById('genre').value = editRow.cells[3].innerText;
        document.getElementById('submit-btn').value = 'Save';
    }
});
