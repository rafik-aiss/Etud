// Fetch students with grades
async function fetchStudentsWithGrades() {
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
        <td>${student.idFil}</td>
        <td>
          <a href="/student-details.html?id=${student.idEtud}" class="btn">Détails</a>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// Show student details modal
async function showStudentDetails(studentId) {
  try {
    console.log("Fetching student details for ID:", studentId);
    const studentResponse = await fetch(`http://localhost:3000/etudiants/${studentId}`);
    if (!studentResponse.ok) throw new Error("Student not found");
    const student = await studentResponse.json();
    console.log("Student data:", student);

    console.log("Fetching grades for student ID:", studentId);
    const gradesResponse = await fetch(`http://localhost:3000/etudiants/${studentId}/grades`);
    if (!gradesResponse.ok) throw new Error("Grades not found");
    const grades = await gradesResponse.json();
    console.log("Grades data:", grades);

    // Update modal content
    document.getElementById('student-info').innerHTML = `
      <p><strong>Nom:</strong> ${student.nom}</p>
      <p><strong>Prénom:</strong> ${student.prenom}</p>
      <p><strong>Email:</strong> ${student.email}</p>
      <p><strong>Téléphone:</strong> ${student.tel || '-'}</p>
      <p><strong>Adresse:</strong> ${student.adresse || '-'}</p>
      <p><strong>Filière:</strong> ${student.idFil}</p>
    `;

    document.getElementById('student-grades').innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Module</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          ${grades.map(grade => `
            <tr>
              <td>${grade.module.nom}</td> <!-- Use module name instead of ID -->
              <td>${grade.note}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    // Show modal
    document.getElementById('student-details-modal').style.display = 'block';
  } catch (error) {
    console.error("Error loading details:", error);
    alert("Erreur lors du chargement des détails. Voir la console.");
  }
}

// Close modal
document.querySelector('.close-btn').addEventListener('click', () => {
  document.getElementById('student-details-modal').style.display = 'none';
});

// Initial load
fetchStudentsWithGrades();