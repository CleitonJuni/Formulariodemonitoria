document.addEventListener('DOMContentLoaded', function () {
    const professorSelect = document.getElementById('professor');
    const alunoSelect = document.getElementById('aluno');
    const crCurso = document.getElementById('crCurso');
    const crCursoValue = document.getElementById('crCursoValue');
    const porcentagemCurso = document.getElementById('porcentagemCurso');
    const porcentagemCursoValue = document.getElementById('porcentagemCursoValue');

    const professors = ['Prof. A', 'Prof. B', 'Prof. C'];
    const students = {
        'Prof. A': ['Aluno 1A', 'Aluno 1B'],
        'Prof. B': ['Aluno 2A', 'Aluno 2B'],
        'Prof. C': ['Aluno 3A', 'Aluno 3B']
    };

    professors.forEach(prof => {
        let option = document.createElement('option');
        option.value = prof;
        option.textContent = prof;
        professorSelect.appendChild(option);
    });

    professorSelect.addEventListener('change', function () {
        alunoSelect.innerHTML = '<option value="">-Select-</option>';
        const selectedProf = professorSelect.value;
        if (students[selectedProf]) {
            students[selectedProf].forEach(student => {
                let option = document.createElement('option');
                option.value = student;
                option.textContent = student;
                alunoSelect.appendChild(option);
            });
        }
    });

    crCurso.addEventListener('input', function () {
        crCursoValue.textContent = crCurso.value + '%';
    });

    porcentagemCurso.addEventListener('input', function () {
        porcentagemCursoValue.textContent = porcentagemCurso.value + '%';
    });
});
