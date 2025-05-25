let isEditMode = false;

// Fetch and display filières
async function fetchFilieres() {
  try {
    const response = await fetch('https://etud.onrender.com/filieres');
    const filieres = await response.json();
    renderFilieres(filieres);
  } catch (error) {
    console.error("Erreur lors de la récupération des filières:", error);
  }
}

// Render filières in table
function renderFilieres(filieres) {
  const tbody = document.querySelector('#filieres-table tbody');
  tbody.innerHTML = '';

  filieres.forEach(filiere => {
    const row = `
      <tr>
        <td>${filiere.idFil}</td>
        <td>${filiere.nom}</td>
        <td class="action-buttons">
          <button onclick="editFiliere(${filiere.idFil})" class="btn edit-btn">Modifier</button>
          <button onclick="deleteFiliere(${filiere.idFil})" class="btn delete-btn">Supprimer</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// Form submission handler
document.getElementById('filiere-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const filiereData = {
    nom: document.getElementById('nom').value
  };

  try {
    if (isEditMode) {
      const id = document.getElementById('filiere-id').value;
      await fetch(`https://etud.onrender.com/filieres/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filiereData)
      });
    } else {
      await fetch('https://etud.onrender.com/filieres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filiereData)
      });
    }

    resetForm();
    fetchFilieres();
  } catch (error) {
    console.error("Erreur lors de l'enregistrement:", error);
  }
});

// Edit filière
async function editFiliere(id) {
  try {
    const response = await fetch(`https://etud.onrender.com/filieres/${id}`);
    const filiere = await response.json();
    
    document.getElementById('filiere-id').value = filiere.idFil;
    document.getElementById('nom').value = filiere.nom;
    
    isEditMode = true;
  } catch (error) {
    console.error("Erreur lors de la modification:", error);
  }
}

// Delete filière
async function deleteFiliere(id) {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette filière ?")) {
    try {
      await fetch(`https://etud.onrender.com/filieres/${id}`, {
        method: 'DELETE'
      });
      fetchFilieres();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  }
}

// Reset form
function resetForm() {
  document.getElementById('filiere-form').reset();
  document.getElementById('filiere-id').value = '';
  isEditMode = false;
}

// Initial load
fetchFilieres();