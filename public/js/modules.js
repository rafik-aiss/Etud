let isEditMode = false;



// Fetch and display modules
async function fetchModules() {
  try {
    const response = await fetch('https://etud.onrender.com/modules');
    const modules = await response.json();
    renderModules(modules);
  } catch (error) {
    console.error("Erreur lors de la récupération des modules:", error);
  }
}

// Render modules
function renderModules(modules) {
  const tbody = document.querySelector('#modules-table tbody');
  tbody.innerHTML = '';

  modules.forEach(module => {
    const row = `
      <tr>
        <td>${module.idMod}</td>
        <td>${module.nom}</td>
        <td>${module.coeff}</td>
        <td class="action-buttons">
          <button onclick="editModule(${module.idMod})" class="btn edit-btn">Modifier</button>
          <button onclick="deleteModule(${module.idMod})" class="btn delete-btn">Supprimer</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}
async function populateFilieresDropdown() {
  try {
    const response = await fetch('https://etud.onrender.com/filieres');
    const filieres = await response.json();
    const dropdown = document.getElementById('filiereId');
    
    dropdown.innerHTML = '<option value="">Sélectionnez une filière</option>';
    filieres.forEach(filiere => {
      const option = document.createElement('option');
      option.value = filiere.idFil;
      option.textContent = filiere.nom;
      dropdown.appendChild(option);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des filières:", error);
  }
}
// Form submission handler
document.getElementById('module-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const moduleData = {
    nom: document.getElementById('nom').value.trim(),
    coeff: parseFloat(document.getElementById('coeff').value)
  };

  // Validate module name uniqueness
  const existingModules = await fetch('https://etud.onrender.com/modules').then(res => res.json());
  const duplicate = existingModules.some(
    mod => mod.nom.toLowerCase() === moduleData.nom.toLowerCase() && mod.idMod !== parseInt(document.getElementById('module-id').value)
  );

  if (duplicate) {
    alert("Un module avec ce nom existe déjà !");
    return;
  }

  try {
    if (isEditMode) {
      const id = document.getElementById('module-id').value;
      await fetch(`https://etud.onrender.com/modules/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moduleData)
      });
    } else {
      await fetch('https://etud.onrender.com/modules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moduleData)
      });
    }

    const filiereData = {
  nom: document.getElementById('nom').value.trim()
};

// Validate uniqueness
const existingFilieres = await fetch('https://etud.onrender.com/filieres').then(res => res.json());
const duplicate = existingFilieres.some(
  fil => fil.nom.toLowerCase() === filiereData.nom.toLowerCase() && fil.idFil !== parseInt(document.getElementById('filiere-id').value)
);

if (duplicate) {
  alert("Une filière avec ce nom existe déjà !");
  return;
}

    resetForm();
    fetchModules();
  } catch (error) {
    console.error("Erreur lors de l'enregistrement:", error);
  }

});

// Edit module
async function editModule(id) {
  try {
    const response = await fetch(`https://etud.onrender.com/modules/${id}`);
    const module = await response.json();
    
    document.getElementById('module-id').value = module.idMod;
    document.getElementById('nom').value = module.nom;
    document.getElementById('coeff').value = module.coeff;
    
    isEditMode = true;
  } catch (error) {
    console.error("Erreur lors de la modification:", error);
  }
}

// Delete module
async function deleteModule(id) {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce module ?")) {
    try {
      await fetch(`https://etud.onrender.com/modules/${id}`, {
        method: 'DELETE'
      });
      fetchModules();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  }
}



// Reset form
function resetForm() {
  document.getElementById('module-form').reset();
  document.getElementById('module-id').value = '';
  isEditMode = false;
}



// Initial load
  populateFilieresDropdown();
fetchModules();