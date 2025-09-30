# Portfolio Website

A modern, responsive portfolio website built with TypeScript, featuring a clean design and smooth animations.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with full responsiveness across all devices
- **Modern Dark Theme**: Professional dark color scheme with gradient accents
- **TypeScript**: Fully typed JavaScript for better development experience
- **Smooth Animations**: CSS3 and JavaScript animations for engaging user experience
- **Interactive Elements**: Portfolio filtering, skill bars, contact form validation
- **SEO Optimized**: Semantic HTML structure and meta tags
- **Performance Optimized**: Efficient JavaScript and CSS loading
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Flexbox, Grid, and animations
- **TypeScript**: Type-safe JavaScript development
- **Font Awesome**: Icon library
- **Google Fonts**: Poppins font family

## 📁 Project Structure

```
Portfolio1/
├── src/
│   ├── scripts/
│   │   └── portfolio.ts          # Main TypeScript file
│   └── styles/
│       ├── main.css              # Main stylesheet
│       └── responsive.css        # Responsive design
├── dist/
│   └── scripts/
│       ├── portfolio.js          # Compiled JavaScript
│       ├── portfolio.d.ts        # Type definitions
│       └── portfolio.js.map      # Source map
├── assets/
│   └── images/                   # Portfolio images
├── index.html                    # Main HTML file
├── package.json                  # Node.js dependencies
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TypeScript (installed globally)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd Portfolio1
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Compile TypeScript:

   ```bash
   npm run build
   ```

4. Start development server (optional):

   ```bash
   npm run serve
   ```

### Development

- **Build TypeScript**: `npm run build`
- **Watch mode**: `npm run dev`
- **Serve locally**: `npm run serve`

## 🎨 Customization

### Colors

Update CSS custom properties in `src/styles/main.css`:

```css
:root {
  --primary-color: #00d4ff;
  --secondary-color: #ff6b6b;
  --accent-color: #4ecdc4;
  /* ... */
}
```

### Content

- Update personal information in `index.html`
- Replace placeholder images in `assets/images/`
- Modify social links and contact information

### Sections

The website includes:

- **Home**: Hero section with introduction
- **About**: Personal information and statistics
- **Portfolio**: Project showcase with filtering
- **Skills**: Technical skills with progress bars
- **Contact**: Contact form with validation
- **Footer**: Additional links and social media

## 📱 Responsive Breakpoints

- **Mobile**: < 576px
- **Tablet**: 576px - 991px
- **Desktop**: > 991px
- **Large Desktop**: > 1200px

## ✨ Features Details

### Navigation

- Fixed navigation bar with scroll effects
- Mobile hamburger menu
- Smooth scrolling to sections
- Active section highlighting

### Portfolio Filtering

- Filter projects by category (All, Web, Mobile, Design)
- Animated transitions
- Responsive grid layout

### Contact Form

- Real-time validation
- Email format checking
- Required field validation
- Loading states and feedback

### Performance

- Intersection Observer for animations
- Throttled scroll events
- Optimized CSS animations
- Lazy loading considerations

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Rith Seyhak**

- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn URL]
- GitHub: [Your GitHub URL]
- Email: <rith.seyhak@example.com>

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Notes

- Replace placeholder images in the portfolio section
- Update social media links in the footer
- Customize the contact form submission to integrate with your backend
- Add Google Analytics or other tracking if needed
- Consider adding a blog section for additional content

## 🔧 Troubleshooting

### TypeScript Compilation Issues

- Ensure TypeScript is installed globally: `npm install -g typescript`
- Check `tsconfig.json` for correct configuration
- Run `tsc --version` to verify installation

### CSS Not Loading

- Check file paths in HTML
- Ensure CSS files are in the correct directory
- Verify responsive.css is loaded after main.css

### JavaScript Errors

- Check browser console for errors
- Ensure compiled JavaScript file exists in `dist/scripts/`
- Verify all DOM elements exist before JavaScript execution

---

Built with ❤️ by Rith Seyhak
