if (localStorage.getItem('isAuthenticated')) {
    window.location.href = "login.html";
}
function addExperience() {
    const expField = document.createElement('div');
    expField.className = 'experience-entry form-grid';
    expField.innerHTML = `
        <div class="form-group">
            <label>Job Title</label>
            <input type="text" name="jobTitle[]" placeholder="Senior Developer">
        </div>
        <div class="form-group">
            <label>Company</label>
            <input type="text" name="company[]" placeholder="Tech Corp Inc.">
        </div>
        <div class="form-group">
            <label>Start Date</label>
            <input type="month" name="startDate[]">
        </div>
        <div class="form-group">
            <label>End Date</label>
            <input type="month" name="endDate[]">
        </div>
        <div class="form-group" style="grid-column: span 2">
            <label>Description</label>
            <textarea name="jobDescription[]" placeholder="Your responsibilities and achievements..."></textarea>
        </div>
        <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()" style="grid-column: span 2">
            <i class="fas fa-trash"></i> Remove Experience
        </button>
    `;
    document.getElementById('experienceFields').appendChild(expField);
}
const savedResume = localStorage.getItem('resumeData');
if (savedResume) {
    const data = JSON.parse(savedResume);

    document.getElementById('name').value = data.personal.name || '';
    document.getElementById('email').value = data.personal.email || '';
    document.getElementById('phone').value = data.personal.phone || '';
    document.getElementById('linkedin').value = data.personal.linkedin || '';

    document.getElementById('summary').value = data.summary || '';
    document.getElementById('skills').value = data.skills?.join(', ') || '';

    document.querySelector('[name="degree"]').value = data.education.degree || '';
    document.querySelector('[name="university"]').value = data.education.university || '';
    document.querySelector('[name="graduationYear"]').value = data.education.graduationYear || '';

    if (Array.isArray(data.experience)) {
        data.experience.forEach(exp => {
            addExperience();
            const entries = document.querySelectorAll('.experience-entry');
            const lastEntry = entries[entries.length - 1];
            lastEntry.querySelector('[name="jobTitle[]"]').value = exp.jobTitle || '';
            lastEntry.querySelector('[name="company[]"]').value = exp.company || '';
            lastEntry.querySelector('[name="startDate[]"]').value = exp.startDate || '';
            lastEntry.querySelector('[name="endDate[]"]').value = exp.endDate || '';
            lastEntry.querySelector('[name="jobDescription[]"]').value = exp.description || '';
        });
    }
}
document.getElementById('resumeForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        personal: {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            linkedin: document.getElementById('linkedin').value
        },
        summary: document.getElementById('summary').value,
        skills: document.getElementById('skills').value.split(',').map(skill => skill.trim()),
        experience: [],
        education: {
            degree: document.querySelector('[name="degree"]').value,
            university: document.querySelector('[name="university"]').value,
            graduationYear: document.querySelector('[name="graduationYear"]').value
        }
    };

    document.querySelectorAll('.experience-entry').forEach(entry => {
        formData.experience.push({
            jobTitle: entry.querySelector('[name="jobTitle[]"]').value,
            company: entry.querySelector('[name="company[]"]').value,
            startDate: entry.querySelector('[name="startDate[]"]').value,
            endDate: entry.querySelector('[name="endDate[]"]').value,
            description: entry.querySelector('[name="jobDescription[]"]').value
        });
    });

    const submitBtn = document.querySelector('#resumeForm [type="submit"]');
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

    setTimeout(() => {
        localStorage.setItem('resumeData', JSON.stringify(formData));
        window.location.href = "resume.html";
    }, 1500);
});
function clearResumeData() {
    localStorage.removeItem('resumeData');
    location.reload();
}
