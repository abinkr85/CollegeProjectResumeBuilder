# ResumeForge – Professional Resume Builder

A modern resume builder for creating polished, professional resumes with live editing, multiple templates, ATS-friendly content, and export capabilities. Built with pure HTML, CSS, and JavaScript for a lightweight, browser-based experience.

## Features

- Multiple resume templates: Modern, Classic, and Minimal
- Live preview while editing
- Personal, skills, education, experience, project, and custom section management
- Save multiple resume profiles for different job applications
- Design customization with accent colors, fonts, and dark mode
- ATS score analysis for keyword optimization
- JSON export/import for backup and restore
- Password-protected PDF export
- Shareable resume link generation
- AI-powered summary generation
- QR code support for portfolio/website links
- Responsive layout for desktop and mobile viewing

## Live Demo

Visit the app here:

https://abinkr85.github.io/CollegeProjectResumeBuilder/

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- html2pdf.js
- QRCode.js
- Browser localStorage for persistence

## Project Structure

```text
CollegeProjectResumeBuilder/
├── assets/
│   └── logo.png
├── css/
│   └── style.css
├── js/
│   ├── features.js
│   └── script.js
├── index.html
├── README.md
└── combine2.html
```

## Getting Started

### Option 1: Run locally in a browser

```bash
git clone https://github.com/abinkr85/CollegeProjectResumeBuilder.git
cd CollegeProjectResumeBuilder
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Option 2: Open directly

You can also open `index.html` directly in a browser, though a local server is recommended for the most consistent experience.

## How to Use

1. Open the app in your browser.
2. Fill in your personal details, education, experience, skills, and projects.
3. Switch between templates and customize the design.
4. Preview the resume live in the right panel.
5. Save profiles or export/import resume data from the Data tab.
6. Use the PDF export option to generate a protected resume document.
7. Share your resume using the share link feature.

## Features in Detail

### Resume Templates

Choose from:

- Modern: clean and professional layout with a sidebar
- Classic: balanced, traditional resume style
- Minimal: simple and content-focused layout

### ATS Analysis

The app includes a built-in ATS score check to help identify weak sections and improve keyword alignment.

### Data Backup

You can back up your resume as a JSON file and restore it later whenever needed.

### PDF Export

The PDF export workflow includes a password generation process based on your name and date of birth for added document protection.

## Privacy and Data Handling

This project stores data locally in the browser using `localStorage`, so your resume content stays on your device unless you intentionally export or share it.

## Contributing

Contributions are welcome. If you would like to improve the app, fix bugs, or add new features:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For questions, bug reports, or feature requests, please open an issue here:

https://github.com/abinkr85/CollegeProjectResumeBuilder/issues

## License

This repository does not currently include a license file. If you plan to reuse or distribute the project, add an appropriate open-source license before publishing externally.

---

Built with ❤️ for creating cleaner, more professional resumes.
