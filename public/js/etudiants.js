let isEditMode = false;

// Fetch and display students
async function fetchStudents() {
  try {
    const response = await fetch('http://localhost:3000/etudiants');
    const students = await response.json();
    renderStudents(students);
  } catch (error) {
    console.error("Erreur lors de la récupération des étudiants:", error);
  }
}

// Render students in table
function renderStudents(students) {
  const tbody = document.querySelector('#students-table tbody');
  tbody.innerHTML = '';

  students.forEach(student => {
    const row = `
      <tr>
        <td>${student.idEtud}</td>
        <td>${student.nom}</td>
        <td>${student.prenom}</td>
        <td>${student.email}</td>
        <td>${student.tel || '-'}</td>
        <td>${student.adresse || '-'}</td>
        <td>${student.idFil}</td>
        <td class="action-buttons">
          <button onclick="editStudent(${student.idEtud})" class="btn edit-btn">Modifier</button>
          <button onclick="deleteStudent(${student.idEtud})" class="btn delete-btn">Supprimer</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// Form submission handler
document.getElementById('student-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const studentData = {
    nom: document.getElementById('nom').value,
    prenom: document.getElementById('prenom').value,
    email: document.getElementById('email').value,
    tel: document.getElementById('tel').value || null,
    adresse: document.getElementById('adresse').value || null,
    idFil: parseInt(document.getElementById('idFil').value)
  };

  try {
    if (isEditMode) {
      const id = document.getElementById('student-id').value;
      await fetch(`http://localhost:3000/etudiants/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });
    } else {
      await fetch('http://localhost:3000/etudiants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });
    }

    resetForm();
    fetchStudents();
  } catch (error) {
    console.error("Erreur lors de l'enregistrement:", error);
  }
});

// Edit student
async function editStudent(id) {
  try {
    const response = await fetch(`http://localhost:3000/etudiants/${id}`);
    const student = await response.json();
    
    document.getElementById('student-id').value = student.idEtud;
    document.getElementById('nom').value = student.nom;
    document.getElementById('prenom').value = student.prenom;
    document.getElementById('email').value = student.email;
    document.getElementById('tel').value = student.tel || '';
    document.getElementById('adresse').value = student.adresse || '';
    document.getElementById('idFil').value = student.idFil;
    
    isEditMode = true;
  } catch (error) {
    console.error("Erreur lors de la modification:", error);
  }
}

// Delete student
async function deleteStudent(id) {
  if (confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) {
    try {
      await fetch(`http://localhost:3000/etudiants/${id}`, {
        method: 'DELETE'
      });
      fetchStudents();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  }
}

// Reset form
function resetForm() {
  document.getElementById('student-form').reset();
  document.getElementById('student-id').value = '';
  isEditMode = false;
}
// Fetch filières and populate dropdown
async function populateFilieresDropdown() {
  try {
    const response = await fetch('http://localhost:3000/filieres');
    const filieres = await response.json();
    const dropdown = document.getElementById('idFil');
    
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

// Call this on page load
fetchStudents();
populateFilieresDropdown();
// Initial load
fetchStudents();