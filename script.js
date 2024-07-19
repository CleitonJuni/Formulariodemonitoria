const API_KEY = 'api';
const SHEET_ID = '1cGovKfDU9zKlSVvImRWyY3qBfFbAI2OT-OnCKJUQljM';
const RANGE = 'Página1!A1:D5';

document.addEventListener('DOMContentLoaded', function () {
    const professorSelect = document.getElementById('professor');
    const alunoSelect = document.getElementById('aluno');
    const crCursoSelect = document.getElementById('crCurso');
    const porcentagemCursoSelect = document.getElementById('porcentagemCurso');

    const professors = new Set();
    const dataMap = new Map();

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${'1cGovKfDU9zKlSVvImRWyY3qBfFbAI2OT-OnCKJUQljM'}/values/${'Página1!A1:D5'}?key=${'api'}`)
        .then(response => response.json())
        .then(data => {
            data.values.forEach(row => {
                const [prof, student, cr, percentage] = row;
                if (!dataMap.has(prof)) {
                    dataMap.set(prof, []);
                }
                dataMap.get(prof).push({ student, cr, percentage });
                professors.add(prof);
            });

            professors.forEach(prof => {
                let option = document.createElement('option');
                option.value = prof;
                option.textContent = prof;
                professorSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    professorSelect.addEventListener('change', function () {
        alunoSelect.innerHTML = '<option value="">-Select-</option>';
        crCursoSelect.innerHTML = '<option value="">-Select-</option>';
        porcentagemCursoSelect.innerHTML = '<option value="">-Select-</option>';
        const selectedProf = professorSelect.value;
        if (dataMap.has(selectedProf)) {
            dataMap.get(selectedProf).forEach(({ student, cr, percentage }) => {
                let option = document.createElement('option');
                option.value = student;
                option.textContent = student;
                option.dataset.cr = cr;
                option.dataset.percentage = percentage;
                alunoSelect.appendChild(option);
            });
        }
    });

    alunoSelect.addEventListener('change', function () {
        const selectedOption = alunoSelect.selectedOptions[0];
        crCursoSelect.innerHTML = `<option value="${selectedOption.dataset.cr}">${selectedOption.dataset.cr}</option>`;
        porcentagemCursoSelect.innerHTML = `<option value="${selectedOption.dataset.percentage}">${selectedOption.dataset.percentage}</option>`;
    });
});
