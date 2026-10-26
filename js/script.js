// CORE STATE
let state = {
    personal: { name: 'Hari Krishna', title: 'Full Stack Developer', phone: '+1 (656) 153-6577', email: 'harikrishna@gmail.com', address: '148 Side Street, CA', website: 'www.harikrishna.dev', profile: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. Skilled in React, Node.js, and cloud technologies.', photo: 'https://via.placeholder.com/120' },
    skills: [{val: 'React & TypeScript', rating: 5}, {val: 'Node.js & Express', rating: 4}, {val: 'AWS & Docker', rating: 4}],
    languages: [{val: 'English - Native', rating: 5}, {val: 'Spanish - Fluent', rating: 4}],
    education: [['B.Sc. Computer Science', 'Stanford University (2016-2020)', 'Graduated with honors.']],
    experience: [['Senior Developer', 'TechCorp Inc. 2021-Present', 'Led team of 5 developers to build scalable microservices.']],
    projects: ['ResumeBuilder - Advanced React/Node application'],
    certifications: ['AWS Certified Solutions Architect'],
    hobbies: ['Photography', 'Open Source Contributor'],
    references: [['Jane Doe', 'Engineering Manager, TechCorp', 'jane@example.com']],
    customSections: [],
    design: { template: 'modern', color: '#2563EB', font: 'Inter', showQR: false }
};

let currentProfile = 'default';

// INITIALIZATION
window.onload = function() {
    initTabs();
    initTheme();
    loadProfiles();
    if (!loadDataFromStorage(currentProfile)) {
        renderBuilder();
        updateData();
    }
};

function initTabs() {
    window.showTab = function(tabId, btn) {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
        document.getElementById(tabId).classList.remove('hidden');
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    };
}

// STORAGE
function loadDataFromStorage(profileId) {
    const dataStr = localStorage.getItem('resumeForge_' + profileId);
    if (dataStr) {
        try {
            state = JSON.parse(dataStr);
            renderBuilder();
            updateData();
            return true;
        } catch(e) { console.error('Failed to parse data'); }
    }
    return false;
}

function saveToStorage() {
    localStorage.setItem('resumeForge_' + currentProfile, JSON.stringify(state));
}

// DATA BINDING (UI to State)
function syncStateFromUI() {
    // Personal
    ['name', 'title', 'phone', 'email', 'address', 'website', 'profile'].forEach(id => {
        const el = document.getElementById(id);
        if(el) state.personal[id] = el.value;
    });
    
    // Arrays
    state.skills = getDynamicValues('#skillsContainer');
    state.languages = getDynamicValues('#langContainer');
    state.education = getDynamicValues('#eduContainer', 3);
    state.experience = getDynamicValues('#expContainer', 3);
    state.projects = getDynamicValues('#projContainer', 1);
    state.certifications = getDynamicValues('#certContainer', 1);
    state.references = getDynamicValues('#refContainer', 3);
    state.customSections = getDynamicValues('#customContainer', 2);
    
    // Hobbies (Tags)
    state.hobbies = Array.from(document.querySelectorAll('#hobbyContainer .tag span')).map(s => s.previousSibling.textContent.trim());

    // Design
    const qrToggle = document.getElementById('qrToggle');
    if(qrToggle) state.design.showQR = qrToggle.checked;
    
    saveToStorage();
}

function getDynamicValues(selector, numFields = null) {
    const items = [];
    document.querySelectorAll(`${selector} > div`).forEach(box => {
        if(numFields === null) {
            // Skill/Lang with stars
            const input = box.querySelector('input');
            const rating = box.querySelectorAll('.stars .active').length;
            if(input) items.push({val: input.value, rating});
        } else if(numFields === 1) {
            const el = box.querySelector('input, textarea');
            if(el) items.push(el.value);
        } else {
            const els = Array.from(box.querySelectorAll('input, textarea'));
            items.push(els.map(e => e.value));
        }
    });
    return items;
}

// BUILDER RENDERER (State to UI)
function renderBuilder() {
    // Personal
    Object.keys(state.personal).forEach(k => {
        if(k === 'photo') {
            document.getElementById('photoPreview').src = state.personal[k] || 'https://via.placeholder.com/70?text=📷';
        } else {
            const el = document.getElementById(k);
            if(el) el.value = state.personal[k] || '';
        }
    });

    // Dynamic Lists
    renderDynamicList('skillsContainer', state.skills, createSkillLangBox);
    renderDynamicList('langContainer', state.languages, createSkillLangBox);
    renderDynamicList('eduContainer', state.education, createMultiBox, ['Degree/Certificate', 'Institution & Year', 'Description...']);
    renderDynamicList('expContainer', state.experience, createMultiBox, ['Job Title', 'Company & Year', 'Description...']);
    renderDynamicList('projContainer', state.projects, createMultiBox, ['Project details...']);
    renderDynamicList('certContainer', state.certifications, createMultiBox, ['Certification Title...']);
    renderDynamicList('refContainer', state.references, createMultiBox, ['Name', 'Title/Company', 'Contact Info']);
    renderDynamicList('customContainer', state.customSections, createMultiBox, ['Section Title', 'Content...']);
    
    // Hobbies
    const hBox = document.getElementById('hobbyContainer');
    if(hBox) {
        hBox.innerHTML = '';
        state.hobbies.forEach(h => {
            const t = document.createElement('div'); t.className = 'tag';
            t.innerHTML = `${h} <span onclick="this.parentElement.remove(); updateData()">✕</span>`;
            hBox.appendChild(t);
        });
    }

    // Design Elements
    document.documentElement.style.setProperty('--r-accent', state.design.color);
    document.getElementById('fontSelect').value = state.design.font;
    document.getElementById('qrToggle').checked = state.design.showQR;
    
    document.querySelectorAll('.color-dot').forEach(d => {
        d.classList.toggle('active', d.style.backgroundColor === state.design.color);
    });
    document.querySelectorAll('.template-card').forEach(c => {
        c.classList.toggle('active', c.querySelector('span').innerText.toLowerCase() === state.design.template);
    });
}

// UI HELPERS
function renderDynamicList(containerId, items, createFn, placeholders = []) {
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = '';
    items.forEach(item => {
        container.appendChild(createFn(item, placeholders));
    });
}

function createSkillLangBox(data) {
    const div = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'text'; input.value = data.val; input.oninput = updateData;
    const stars = document.createElement('div'); stars.className = 'stars';
    for(let i=1; i<=5; i++){
        const s = document.createElement('span');
        s.innerHTML = '★'; if(i <= data.rating) s.classList.add('active');
        s.onclick = () => { Array.from(stars.children).forEach((ch, idx) => ch.classList.toggle('active', idx < i)); updateData(); };
        stars.appendChild(s);
    }
    const del = document.createElement('button'); del.className = 'del-btn'; del.innerText = 'Delete';
    del.onclick = () => { div.remove(); updateData(); };
    div.append(input, stars, del);
    return div;
}

function createMultiBox(data, placeholders) {
    const div = document.createElement('div');
    const isArray = Array.isArray(data);
    placeholders.forEach((ph, i) => {
        const val = isArray ? (data[i] || '') : (i===0 ? data : '');
        const el = document.createElement(i === placeholders.length - 1 && placeholders.length > 1 ? 'textarea' : 'input');
        if(el.tagName === 'INPUT') el.type = 'text';
        el.placeholder = ph; el.value = val; el.oninput = updateData;
        div.appendChild(el);
    });
    const del = document.createElement('button'); del.className = 'del-btn'; del.innerText = 'Delete';
    del.onclick = () => { div.remove(); updateData(); };
    div.appendChild(del);
    return div;
}

// ACTION HANDLERS
function addSkill() { document.getElementById('skillsContainer').appendChild(createSkillLangBox({val:'', rating:0})); updateData(); }
function addLanguage() { document.getElementById('langContainer').appendChild(createSkillLangBox({val:'', rating:0})); updateData(); }
function addEducation() { document.getElementById('eduContainer').appendChild(createMultiBox(['','',''], ['Degree', 'Institution', 'Details'])); updateData(); }
function addExperience() { document.getElementById('expContainer').appendChild(createMultiBox(['','',''], ['Title', 'Company', 'Details'])); updateData(); }
function addProject() { document.getElementById('projContainer').appendChild(createMultiBox('', ['Project Details'])); updateData(); }
function addCertification() { document.getElementById('certContainer').appendChild(createMultiBox('', ['Certification Title'])); updateData(); }
function addReference() { document.getElementById('refContainer').appendChild(createMultiBox(['','',''], ['Name', 'Company', 'Contact'])); updateData(); }
function addCustomSection() { document.getElementById('customContainer').appendChild(createMultiBox(['',''], ['Section Title', 'Content'])); updateData(); }

function addHobby() {
    const inp = document.getElementById('hobbyInput');
    const val = inp.value.trim();
    if(val) {
        const hBox = document.getElementById('hobbyContainer');
        const t = document.createElement('div'); t.className = 'tag';
        t.innerHTML = `${val} <span onclick="this.parentElement.remove(); updateData()">✕</span>`;
        hBox.appendChild(t);
        inp.value = '';
        updateData();
    }
}
document.getElementById('hobbyInput')?.addEventListener('keypress', e => { if(e.key === 'Enter') addHobby(); });

function loadPhoto(event) {
    const reader = new FileReader();
    reader.onload = function() {
        state.personal.photo = reader.result;
        document.getElementById('photoPreview').src = reader.result;
        updateData();
    };
    if(event.target.files[0]) reader.readAsDataURL(event.target.files[0]);
}

// UPDATE PREVIEW
function updateData() {
    syncStateFromUI();
    renderResume();
}

function renderResume() {
    const res = document.getElementById('resume');
    res.setAttribute('data-template', state.design.template);
    res.style.fontFamily = state.design.font;
    
    // Build HTML based on template
    let html = '';
    const p = state.personal;
    
    const sidebarHtml = `
        <div class="sidebar">
            ${p.photo ? `<img src="${p.photo}">` : ''}
            
            ${state.design.template !== 'modern' ? `
                <div class="r-header">
                    <h1 class="r-name">${p.name}</h1>
                    <p class="r-title">${p.title}</p>
                </div>
            ` : ''}

            ${p.phone || p.email || p.address || p.website ? `
                <div class="r-section">
                    <h3 class="r-section-title">Contact</h3>
                    ${p.phone ? `<div class="r-contact-item"><span class="r-contact-icon">📞</span> ${p.phone}</div>` : ''}
                    ${p.email ? `<div class="r-contact-item"><span class="r-contact-icon">✉️</span> ${p.email}</div>` : ''}
                    ${p.address ? `<div class="r-contact-item"><span class="r-contact-icon">📍</span> ${p.address}</div>` : ''}
                    ${p.website ? `<div class="r-contact-item"><span class="r-contact-icon">🌐</span> ${p.website}</div>` : ''}
                </div>
            ` : ''}
            
            ${state.skills.length ? `
                <div class="r-section">
                    <h3 class="r-section-title">Skills</h3>
                    ${state.skills.map(s => `<div class="r-skill-row"><span>${s.val}</span> <span>${'★'.repeat(s.rating)}${'☆'.repeat(5-s.rating)}</span></div>`).join('')}
                </div>
            ` : ''}
            
            ${state.languages.length ? `
                <div class="r-section">
                    <h3 class="r-section-title">Languages</h3>
                    ${state.languages.map(s => `<div class="r-skill-row"><span>${s.val}</span> <span>${'★'.repeat(s.rating)}${'☆'.repeat(5-s.rating)}</span></div>`).join('')}
                </div>
            ` : ''}
            
            ${state.hobbies.length ? `
                <div class="r-section">
                    <h3 class="r-section-title">Hobbies</h3>
                    <p class="r-text">${state.hobbies.join(', ')}</p>
                </div>
            ` : ''}

            ${state.design.showQR ? `<div class="r-qr" id="qrContainer"></div>` : ''}
        </div>
    `;

    const contentHtml = `
        <div class="content">
            ${state.design.template === 'modern' ? `
                <div class="r-header">
                    <h1 class="r-name">${p.name}</h1>
                    <p class="r-title">${p.title}</p>
                </div>
            ` : ''}
            
            ${p.profile ? `
                <div class="r-section">
                    <h3 class="r-section-title">Profile</h3>
                    <p class="r-text">${p.profile.replace(/\\n/g, '<br>')}</p>
                </div>
            ` : ''}
            
            ${state.experience.length ? `
                <div class="r-section">
                    <h3 class="r-section-title">Experience</h3>
                    ${state.experience.map(e => `
                        <div class="r-item">
                            <p class="r-item-title">${e[0] || ''}</p>
                            <p class="r-item-sub">${e[1] || ''}</p>
                            <p class="r-item-desc">${(e[2] || '').replace(/\\n/g, '<br>')}</p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${state.education.length ? `
                <div class="r-section">
                    <h3 class="r-section-title">Education</h3>
                    ${state.education.map(e => `
                        <div class="r-item">
                            <p class="r-item-title">${e[0] || ''}</p>
                            <p class="r-item-sub">${e[1] || ''}</p>
                            <p class="r-item-desc">${(e[2] || '').replace(/\\n/g, '<br>')}</p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${state.projects.length ? `
                <div class="r-section">
                    <h3 class="r-section-title">Projects</h3>
                    ${state.projects.map(p => `<p class="r-text">• ${p}</p>`).join('')}
                </div>
            ` : ''}
            
            ${state.certifications.length ? `
                <div class="r-section">
                    <h3 class="r-section-title">Certifications</h3>
                    ${state.certifications.map(c => `<p class="r-text">• ${c}</p>`).join('')}
                </div>
            ` : ''}

            ${state.references.length ? `
                <div class="r-section">
                    <h3 class="r-section-title">References</h3>
                    ${state.references.map(r => `
                        <div class="r-item" style="display:inline-block; width:48%; vertical-align:top;">
                            <p class="r-item-title">${r[0] || ''}</p>
                            <p class="r-item-sub">${r[1] || ''}</p>
                            <p class="r-item-desc">${r[2] || ''}</p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${state.customSections.length ? `
                ${state.customSections.map(c => `
                    <div class="r-section">
                        <h3 class="r-section-title">${c[0] || 'Custom Section'}</h3>
                        <p class="r-text">${(c[1] || '').replace(/\\n/g, '<br>')}</p>
                    </div>
                `).join('')}
            ` : ''}
        </div>
    `;

    res.innerHTML = sidebarHtml + contentHtml;
    
    // Generate QR
    if(state.design.showQR && typeof QRCode !== 'undefined') {
        setTimeout(() => {
            const qr = document.getElementById('qrContainer');
            if(qr && state.personal.website) {
                qr.innerHTML = '';
                new QRCode(qr, { text: state.personal.website, width: 80, height: 80 });
            }
        }, 100);
    }
}
