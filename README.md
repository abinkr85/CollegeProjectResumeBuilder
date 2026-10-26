# 📄 Professional Resume Builder

A modern, feature-rich resume builder application that allows you to create, customize, and export professional resumes with ease. Built with vanilla JavaScript, CSS, and HTML for a smooth, client-side experience with no backend required.

## 🌟 Features

### Core Functionality
- **Multiple Resume Templates** - Choose from Modern, Classic, and Minimal designs
- **Live Preview** - Real-time resume preview as you type
- **Customizable Sections** - Personal info, experience, education, skills, projects, certifications, and more
- **Profile Management** - Save multiple resume versions for different job applications
- **Design Customization** - Change colors, fonts (Inter, Arial, Georgia), and layout options

### Advanced Features
- **PDF Export** - Download your resume as password-protected PDF
- **Data Backup** - Export/import resume data as JSON files
- **Local Storage** - All data saved locally in your browser (privacy-first approach)
- **QR Code Integration** - Optionally add QR codes linking to your website
- **Skill Ratings** - Add star ratings to showcase proficiency levels
- **Hobbies/Interests** - Add personal interests and hobbies section
- **Share Function** - Generate shareable resume links

### Data Management
- **One-Click Profile Switching** - Quickly switch between saved resume versions
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Dark/Light Theme** - Built-in theme options for comfortable viewing

## 🎨 Language Composition
- **JavaScript** - 44.1% (Interactive features & logic)
- **CSS** - 37.1% (Styling & responsive design)
- **HTML** - 18.8% (Semantic markup)

## 🚀 Live Demo

**[Click here to use the Resume Builder](https://abinkr85.github.io/CollegeProjectResumeBuilder/)**

Open the link above to start building your professional resume right now!

## 📖 How to Use

### Getting Started
1. Visit the [live demo](https://abinkr85.github.io/CollegeProjectResumeBuilder/)
2. Fill in your personal information in the **Info** tab
3. Add your experience, education, skills, and other sections
4. Customize the design in the **Design** tab
5. Preview your resume with the Preview button

### Save Your Work
- Your resume data is automatically saved to your browser's local storage
- Create multiple profiles for different job applications
- Use the **Data** tab to export/import your resume data

### Export Your Resume
1. Click the **Export PDF** button
2. Enter your name and date of birth (used to generate a PDF password)
3. Download your password-protected resume

### Share Your Resume
1. Complete your resume
2. Click the **Share** button
3. Share the generated link with recruiters and employers

## 💾 Installation (For Local Development)

```bash
# Clone the repository
git clone https://github.com/abinkr/Professional-Resume-Builder.git

# Navigate to the directory
cd Professional-Resume-Builder

# Open in a web browser
open index.html
# or
python -m http.server 8000  # Then visit http://localhost:8000
```

## 📁 Project Structure

```
Professional-Resume-Builder/
├── index.html          # Main application markup
├── css/
│   └── style.css       # All styling and responsive design
├── js/
│   ├── script.js       # Core resume builder logic
│   └── features.js     # PDF export, import/export, sharing
├── lib/
│   └── html2pdf.js     # PDF generation library
└── README.md          # This file
```

## 🔧 Technical Stack

- **Vanilla JavaScript** - No frameworks required
- **HTML5** - Semantic markup for better accessibility
- **CSS3** - Flexbox & Grid layouts for responsive design
- **html2pdf.js** - Client-side PDF generation
- **Local Storage API** - Browser-based data persistence

## ✨ Key Features Explained

### Multiple Templates
- **Modern** - Two-column dark sidebar layout with accent colors
- **Classic** - Top header with centered personal info
- **Minimal** - Clean, two-column text-based layout

### Design Customization
- Select accent color for your resume
- Choose from multiple font families
- Toggle QR code display
- Real-time preview updates

### Data Export & Import
- **Export JSON** - Create backups of your resume data
- **Import JSON** - Restore from previously saved backups
- Works across browsers by downloading/uploading files

### Password-Protected PDFs
- Automatic password generation based on name + DOB
- Secure your resume with encryption
- Prevents unauthorized editing and copying

## 🔒 Privacy & Security

- **100% Client-Side** - No data sent to any server
- **Local Storage Only** - Your resume data stays on your device
- **No Tracking** - No analytics or data collection
- **Optional PDF Protection** - Add password encryption to PDFs

## 🎯 Use Cases

- **Job Applications** - Create tailored resumes for different positions
- **Career Change** - Maintain multiple versions highlighting different skills
- **Portfolio** - Showcase your professional experience and projects
- **Networking** - Share your resume digitally with recruiters

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📝 License

This project is open source and available under the MIT License.

## 💡 Tips & Tricks

- **Pro Tip 1**: Save a profile template for quick resume creation
- **Pro Tip 2**: Use the JSON export to backup your data regularly
- **Pro Tip 3**: Test different templates and colors before final export
- **Pro Tip 4**: Add a QR code to your website in the resume for easy access
- **Pro Tip 5**: Keep skill ratings realistic (1-5 stars)

## 🐛 Troubleshooting

**Q: My data disappeared!**
- A: Check if you're using the same browser and haven't cleared local storage. Use the JSON export feature to backup your data.

**Q: PDF won't download**
- A: Make sure to generate a password before downloading. Check your browser's download settings.

**Q: How do I switch templates?**
- A: Go to the **Design** tab and select your preferred template from the dropdown menu.

**Q: Can I share my resume with others?**
- A: Yes! Click the **Share** button to generate a shareable link of your resume preview.

## 📞 Support

For issues, questions, or suggestions, please [open an issue](https://github.com/abinkr/Professional-Resume-Builder/issues) on GitHub.

---

**Built with ❤️ by [abinkr](https://github.com/abinkr)**

**[⭐ Star this repo if you find it helpful!](https://github.com/abinkr/Professional-Resume-Builder)**
