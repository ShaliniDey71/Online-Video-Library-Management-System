document.addEventListener('DOMContentLoaded', () => {
    fetch('members.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayMembers(data);
        })
        .catch(error => console.error('Error fetching member data:', error));
});

let membersData = []; // Stores members for local manipulation

function displayMembers(data) {
    membersData = data;
    const tableBody = document.getElementById('member-table-body');
    tableBody.innerHTML = ''; // Clear existing table data

    membersData.forEach((member, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.status}</td>
            <td>${member.joiningDate}</td>
            <td>${member.subscriptionPlan}</td>
            <td>
                <button onclick="editMember(${index})">Edit</button>
                <button class="delete" onclick="deleteMember(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editMember(index) {
    const member = membersData[index];
    document.getElementById('member-id').value = index;
    document.getElementById('edit-name').value = member.name;
    document.getElementById('edit-email').value = member.email;
    document.getElementById('edit-status').value = member.status;
    document.getElementById('edit-joiningDate').value = member.joiningDate;

    // Dynamically handle subscription plan dropdown
    const subscriptionSelect = document.getElementById('edit-subscriptionPlan') || createSubscriptionPlanDropdown();
    subscriptionSelect.innerHTML = `
        <option value="Basic" ${member.subscriptionPlan === 'Basic' ? 'selected' : ''}>Basic</option>
        <option value="Premium" ${member.subscriptionPlan === 'Premium' ? 'selected' : ''}>Premium</option>
    `;

    document.getElementById('edit-member-form').style.display = 'block';
}

function createSubscriptionPlanDropdown() {
    const subscriptionSelect = document.createElement('select');
    subscriptionSelect.id = 'edit-subscriptionPlan';
    subscriptionSelect.required = true;

    const label = document.createElement('label');
    label.textContent = 'Subscription Plan:';
    label.htmlFor = 'edit-subscriptionPlan';

    const form = document.getElementById('form');
    form.insertBefore(label, form.lastChild);
    form.insertBefore(subscriptionSelect, form.lastChild);

    return subscriptionSelect;
}

function deleteMember(index) {
    if (confirm('Are you sure you want to delete this member?')) {
        membersData.splice(index, 1);
        displayMembers(membersData);
    }
}

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('edit-email').value;

    // Validate email contains .com
    if (!email.includes('.com')) {
        alert('Email must contain ".com"');
        return; // Stop form submission if email is invalid
    }

    const index = document.getElementById('member-id').value;
    membersData[index] = {
        name: document.getElementById('edit-name').value,
        email: email,
        status: document.getElementById('edit-status').value,
        joiningDate: document.getElementById('edit-joiningDate').value,
        subscriptionPlan: document.getElementById('edit-subscriptionPlan').value // Add subscription plan value
    };

    displayMembers(membersData);
    alert('Member details updated successfully!'); // Popup confirmation message
    cancelEdit();
});

function cancelEdit() {
    document.getElementById('edit-member-form').style.display = 'none';
    document.getElementById('form').reset();
}
