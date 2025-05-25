async function fetchStudents() {
  try {
    const response = await fetch('https://etud.onrender.com/etudiants');
    const students = await response.json();
    displayStudents(students);
  } catch (error) {
    console.error("Failed to fetch students:", error);
  }
}

function displayStudents(students) {
  const table = document.getElementById('students-table');
  table.innerHTML = `
    <tr>
      <th>Nom</th>
      <th>Prénom</th>
      <th>Email</th>
      <th>Filière</th>
    </tr>
    ${students.map(student => `
      <tr>
        <td>${student.nom}</td>
        <td>${student.prenom}</td>
        <td>${student.email}</td>
        <td>${student.idFil}</td>
      </tr>
    `).join('')}
  `;
}

// Call on page load
fetchStudents();

document.getElementById('add-student-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const studentData = {
    nom: formData.get('nom'),
    prenom: formData.get('prenom'),
    email: formData.get('email'),
    idFil: parseInt(formData.get('idFil')),
  };

  try {
    const response = await fetch('https://etud.onrender.com/etudiants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    if (response.ok) {
      fetchStudents(); // Refresh the list
      e.target.reset();
    }
  } catch (error) {
    console.error("Failed to add student:", error);
  }
});