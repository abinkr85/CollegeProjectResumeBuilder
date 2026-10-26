// ADVANCED FEATURES (AI, ATS, EXPORT/IMPORT, TEMPLATES, PROFILES)

// --- DESIGN (Templates, Color, Font) ---
function switchTemplate(tpl, btn) {
    state.design.template = tpl;
    document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    updateData();
}

function setAccentColor(colorHex, hoverHex, btn) {
    state.design.color = colorHex;
    document.documentElement.style.setProperty('--r-accent', colorHex);
    document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
    btn.classList.add('active');
    updateData();
}

function setFont(font) {
    state.design.font = font;
    updateData();
}

function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.getElementById('darkToggle').innerText = isDark ? '🌙' : '☀️';
}
function initTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleDarkMode();
    }
}

// --- PROFILE MANAGEMENT ---
function loadProfiles() {
    const select = document.getElementById('profileSelect');
    if(!select) return;
    
    // Default option exists. Let's add custom ones from localstorage
    const profiles = [];
    for(let i=0; i<localStorage.length; i++) {
        const key = localStorage.key(i);
        if(key.startsWith('resumeForge_') && key !== 'resumeForge_default') {
            profiles.push(key.replace('resumeForge_', ''));
        }
    }
    
    // Clear and rebuild
    select.innerHTML = '<option value="default">— Default Profile —</option>';
    profiles.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p; opt.innerText = p;
        select.appendChild(opt);
    });
    select.value = currentProfile;
}

function loadSelectedProfile() {
    const val = document.getElementById('profileSelect').value;
    if(val) {
        currentProfile = val;
        if(!loadDataFromStorage(val)) {
            // New or empty profile
            state.personal.name = ''; // clear to show it's new
            renderBuilder();
            updateData();
        }
    }
}

function promptSaveProfile() {
    const name = prompt("Enter a name for this profile (e.g. 'Software Engineer Role'):");
    if(name && name.trim()) {
        currentProfile = name.trim();
        saveToStorage();
        loadProfiles();
        alert("Profile saved!");
    }
}

function saveNewProfile() {
    const name = document.getElementById('newProfileName').value;
    if(name && name.trim()) {
        currentProfile = name.trim();
        saveToStorage();
        loadProfiles();
        document.getElementById('newProfileName').value = '';
        alert("Saved as new profile!");
    }
}

function deleteSelectedProfile() {
    if(currentProfile === 'default') {
        alert("Cannot delete the default profile.");
        return;
    }
    if(confirm("Delete profile '" + currentProfile + "'?")) {
        localStorage.removeItem('resumeForge_' + currentProfile);
        currentProfile = 'default';
        loadProfiles();
        loadSelectedProfile();
    }
}

function clearAllData() {
    if(confirm("WARNING: This will delete ALL your resume data permanently. Continue?")) {
        localStorage.clear();
        location.reload();
    }
}

// --- JSON EXPORT / IMPORT ---
function exportJSON() {
    syncStateFromUI(); // Ensure latest
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `ResumeForge_${currentProfile}.json`);
    dlAnchorElem.click();
}

function importJSON(event) {
    const file = event.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if(imported && imported.personal) {
                state = imported;
                renderBuilder();
                updateData();
                saveToStorage();
                alert("Resume data imported successfully!");
            } else {
                alert("Invalid JSON format.");
            }
        } catch(err) {
            alert("Error parsing JSON file.");
        }
    };
    reader.readAsText(file);
}

// --- PDF EXPORT (with html2pdf) ---
function showPasswordPopup(){
    document.getElementById("passwordPopup").style.display = "flex";
    document.getElementById("userName").value = document.getElementById("name").value;
}

function generatePassword(){
    var name = document.getElementById("userName").value.trim();
    var dob = document.getElementById("userDOB").value;
    if(name.length < 4 || !dob){ alert("Enter valid name and DOB"); return; }
    var namePart = name.substring(0,4).toUpperCase();
    var date = new Date(dob);
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth()+1)).slice(-2);
    var password = namePart + day + month;
    document.getElementById("generatedPassword").innerText = "Password: " + password;
    state.pdfPassword = password; // store temporarily
}

function finalDownload(){
    if(!state.pdfPassword){ alert("Generate password first!"); return; }
    
    document.getElementById("passwordPopup").style.display = "none";
    
    const element = document.getElementById("resume");
    
    // Temporarily remove transform for mobile export so PDF renders at full scale
    element.style.transform = 'none';
    element.style.marginBottom = '0';
    
    const opt = {
        margin: [0, 0, 0, 0],
        filename: state.personal.name.replace(/\s+/g, '_') + '_Resume.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', encryption: { userPassword: state.pdfPassword, ownerPassword: state.pdfPassword, userPermissions: ["print", "copy"] } }
    };
    
    html2pdf().set(opt).from(element).save().then(() => {
        element.style.transform = '';
        element.style.marginBottom = '';
    });
}

// --- PREVIEW / SHARE ---
function previewResume(){
    updateData();
    let resumeHTML = document.getElementById("resume").cloneNode(true).outerHTML;
    let stylesHTML = `<link rel="stylesheet" href="css/style.css">`;
    let previewWindow = window.open("", "_blank");
    previewWindow.document.write(`
        <html><head><title>Preview - ${state.personal.name}</title>${stylesHTML}</head>
        <body style="display:flex;justify-content:center;background:#334155;padding:40px;">
        <div style="position:fixed;top:20px;right:20px;z-index:1000;display:flex;gap:10px;">
            <button onclick="window.print()" style="padding:10px 20px;background:#2563EB;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.3)">🖨 Print</button>
            <button onclick="window.close()" style="padding:10px 20px;background:#FFF;color:#0F172A;border:none;border-radius:8px;cursor:pointer;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.3)">✕ Close</button>
        </div>
        <div class="resume-wrapper" style="max-width:none">${resumeHTML}</div>
        </body></html>
    `);
    previewWindow.document.close();
}

function shareResume() {
    syncStateFromUI();
    const dataStr = encodeURIComponent(JSON.stringify(state));
    const url = window.location.origin + window.location.pathname + '?data=' + btoa(dataStr).substring(0, 500) + '... (Truncated for demo)';
    document.getElementById('shareLink').value = url;
    document.getElementById('shareModal').style.display = 'flex';
}

function copyShareLink() {
    const copyText = document.getElementById("shareLink");
    copyText.select();
    document.execCommand("copy");
    alert("Copied to clipboard!");
}

// --- ATS SCORE ANALYSIS ---
function checkATSScore() {
    syncStateFromUI();
    let score = 0;
    let feedback = [];
    
    // Simple heuristic analysis
    const p = state.personal;
    if(p.name && p.email && p.phone) { score += 20; feedback.push("✅ Contact info is complete (+20)"); }
    else feedback.push("❌ Missing contact info (-20)");
    
    if(p.profile && p.profile.length > 50) { score += 20; feedback.push("✅ Professional summary included (+20)"); }
    else feedback.push("❌ Missing or too short professional summary (-20)");
    
    if(state.skills.length >= 5) { score += 20; feedback.push("✅ Good amount of skills listed (+20)"); }
    else if(state.skills.length > 0) { score += 10; feedback.push("⚠️ Add more skills for better parsing (+10)"); }
    else feedback.push("❌ No skills found (-20)");
    
    if(state.experience.length >= 2) { score += 20; feedback.push("✅ Solid experience section (+20)"); }
    else if(state.experience.length === 1) { score += 10; feedback.push("⚠️ Consider adding more experience details (+10)"); }
    else feedback.push("❌ Experience section empty (-20)");
    
    if(state.education.length >= 1) { score += 20; feedback.push("✅ Education included (+20)"); }
    else feedback.push("❌ Missing education (-20)");

    let scoreColor = score >= 80 ? '#059669' : (score >= 50 ? '#D97706' : '#DC2626');
    
    document.getElementById('atsResult').innerHTML = `
        <div style="text-align:center; margin-bottom:20px;">
            <div style="font-size:48px; font-weight:800; color:${scoreColor}">${score}/100</div>
            <div style="color:var(--text-secondary)">ATS Compatibility Score</div>
        </div>
        <ul style="padding-left:20px; color:var(--text-secondary); font-size:14px; line-height:1.8">
            ${feedback.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <p style="font-size:12px; color:var(--text-muted); margin-top:20px; text-align:center;">
            *Note: This is an estimated score based on standard ATS parsers. Include relevant keywords from the job description to improve matching.
        </p>
    `;
    document.getElementById('atsModal').style.display = 'flex';
}

// --- AI SUMMARY GENERATOR (MOCK / DEMO) ---
function showAIModal() {
    document.getElementById('aiModal').style.display = 'flex';
}

function generateAISummary() {
    const title = document.getElementById('title').value || 'Professional';
    const years = document.getElementById('aiYears').value || 'several';
    const strength = document.getElementById('aiStrength').value || 'delivering high-quality results';
    const goal = document.getElementById('aiGoal').value || 'contribute to organizational success';
    
    const resultBox = document.getElementById('aiResult');
    resultBox.innerHTML = "<em>AI is thinking... ⏳</em>";
    
    // Simulate AI API Call Delay
    setTimeout(() => {
        const generatedText = `Results-driven ${title} with ${years} years of experience specializing in ${strength}. Proven track record of solving complex problems and driving efficiency. Looking to leverage my expertise to ${goal}.`;
        resultBox.innerHTML = `<strong>Suggested Summary:</strong><br><br><span id="generatedTextContent">${generatedText}</span>`;
        document.getElementById('aiApplyBtn').style.display = 'block';
    }, 1200);
}

function applySummary() {
    const text = document.getElementById('generatedTextContent').innerText;
    document.getElementById('profile').value = text;
    document.getElementById('aiModal').style.display = 'none';
    updateData();
}

function logout(){
    localStorage.removeItem("currentUser");
    window.location.href = "index.html"; // Assume index or login page
}

// --- MOBILE RESPONSIVE SCROLL INTERACTION ---
function toggleMobileView() {
    const editor = document.querySelector('.left-panel');
    const preview = document.querySelector('.resume-wrapper');
    const fab = document.getElementById('mobileFAP');
    
    if (!preview || !editor || !fab) return;
    
    const previewRect = preview.getBoundingClientRect();
    // If preview top is inside the viewport or near the viewport, we consider it active
    const isShowingPreview = previewRect.top < (window.innerHeight / 2);
    
    if (isShowingPreview) {
        editor.scrollIntoView({ behavior: 'smooth' });
        fab.innerHTML = '👁 Preview';
    } else {
        preview.scrollIntoView({ behavior: 'smooth' });
        fab.innerHTML = '✏️ Edit';
    }
}

// Update FAB text/icon on viewport scroll on mobile
window.addEventListener('scroll', () => {
    const fab = document.getElementById('mobileFAP');
    const preview = document.querySelector('.resume-wrapper');
    if (!fab || !preview) return;
    
    const previewRect = preview.getBoundingClientRect();
    const isShowingPreview = previewRect.top < (window.innerHeight / 2);
    
    if (isShowingPreview) {
        fab.innerHTML = '✏️ Edit';
    } else {
        fab.innerHTML = '👁 Preview';
    }
});
