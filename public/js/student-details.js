// Get student ID from URL
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');

// Fetch student details and grades
async function loadStudentData() {
  try {
    // Fetch student info
    const studentResponse = await fetch(`https://etud.onrender.com/etudiants/${studentId}`);
    const student = await studentResponse.json();

    // Fetch grades
    const gradesResponse = await fetch(`https://etud.onrender.com/etudiants/${studentId}/grades`);
    const grades = await gradesResponse.json();

    // Display student info
    document.getElementById('student-info').innerHTML = `
      <p><strong>Nom:</strong> ${student.nom}</p>
      <p><strong>Prénom:</strong> ${student.prenom}</p>
      <p><strong>Email:</strong> ${student.email}</p>
      <p><strong>Téléphone:</strong> ${student.tel || '-'}</p>
      <p><strong>Adresse:</strong> ${student.adresse || '-'}</p>
      <p><strong>Filière:</strong> ${student.idFil}</p>
    `;

    // Display grades
    const gradesTbody = document.querySelector('#grades-table tbody');
    gradesTbody.innerHTML = grades.map(grade => `
      <tr>
        <td>${grade.module.nom}</td>
        <td>${grade.note}</td>
      </tr>
    `).join('');
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
    alert("Impossible de charger les détails. Vérifiez la console.");
  }
}

// Load data on page load
loadStudentData();