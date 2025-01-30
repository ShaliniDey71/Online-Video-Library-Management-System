document.addEventListener("DOMContentLoaded", () => {
  const addPlanForm = document.getElementById("add-plan-form");
  const tableBody = document.querySelector("table tbody");

  let isEditing = false;
  let editingPlanName = "";

  // Default plans to prepopulate
  const defaultPlans = [
    { name: "Basic", price: 100, duration: 30 },
    { name: "Premium", price: 200, duration: 90 }
  ];

  // Load saved plans or use default plans
  const savedPlans = JSON.parse(localStorage.getItem("subscriptionPlans")) || defaultPlans;
  savedPlans.forEach(plan => addPlanToTable(plan));

  // Save default plans to local storage if empty
  if (!localStorage.getItem("subscriptionPlans")) {
    localStorage.setItem("subscriptionPlans", JSON.stringify(defaultPlans));
  }

  // Handle form submission
  addPlanForm.addEventListener("submit", event => {
    event.preventDefault();

    const planName = document.getElementById("plan-name").value.trim();
    const planPrice = document.getElementById("plan-price").value;
    const planDuration = document.getElementById("plan-duration").value;

    if (!planName || !planPrice || !planDuration) {
      alert('Please fill out all fields.');
      return;
    }

    const newPlan = {
      name: planName,
      price: parseFloat(planPrice),
      duration: parseInt(planDuration, 10)
    };

    if (isEditing) {
      updatePlan(newPlan);
      isEditing = false;
      editingPlanName = "";
    } else {
      addPlanToTable(newPlan);
      savePlan(newPlan);
    }

    addPlanForm.reset();
  });

  // Add plan to table
  function addPlanToTable(plan) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${plan.name}</td>
      <td>${plan.price}</td>
      <td>${plan.duration} months</td>
      <td>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </td>
    `;

    // Event listeners for delete and edit
    row.querySelector(".delete").addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this plan?")) {
        row.remove();
        deletePlan(plan.name);
      }
    });

    row.querySelector(".edit").addEventListener("click", () => {
      isEditing = true;
      editingPlanName = plan.name;

      // Populate form with current plan data
      document.getElementById("plan-name").value = plan.name;
      document.getElementById("plan-price").value = plan.price;
      document.getElementById("plan-duration").value = plan.duration;
    });

    tableBody.appendChild(row);
  }

  // Save new plan to local storage
  function savePlan(plan) {
    const plans = JSON.parse(localStorage.getItem("subscriptionPlans")) || [];
    plans.push(plan);
    localStorage.setItem("subscriptionPlans", JSON.stringify(plans));
  }

  // Update plan in table and local storage
  function updatePlan(updatedPlan) {
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach(row => {
      const planNameCell = row.querySelector("td:first-child");
      if (planNameCell.textContent === editingPlanName) {
        planNameCell.textContent = updatedPlan.name;
        row.querySelector("td:nth-child(2)").textContent = updatedPlan.price;
        row.querySelector("td:nth-child(3)").textContent = `${updatedPlan.duration} months`;
      }
    });

    const plans = JSON.parse(localStorage.getItem("subscriptionPlans")) || [];
    const updatedPlans = plans.map(plan => {
      if (plan.name === editingPlanName) {
        return updatedPlan;
      }
      return plan;
    });
    localStorage.setItem("subscriptionPlans", JSON.stringify(updatedPlans));
  }

  // Delete plan from local storage
  function deletePlan(planName) {
    const plans = JSON.parse(localStorage.getItem("subscriptionPlans")) || [];
    const updatedPlans = plans.filter(plan => plan.name !== planName);
    localStorage.setItem("subscriptionPlans", JSON.stringify(updatedPlans));
  }
});
