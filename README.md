# 🚀 Mark Roch - Interactive Resume

A modern, interactive resume built with cutting-edge design principles inspired by [21st.dev](https://21st.dev/home). This resume showcases technical skills through live demonstrations, smooth animations, and professional presentation.

## ✨ Features

### 🎨 Modern Design
- **21st.dev inspired components** - Professional, cutting-edge design system
- **Smooth animations** and micro-interactions
- **Responsive design** - Perfect on desktop, tablet, and mobile
- **Dark/Light mode** toggle
- **Gradient backgrounds** and modern color schemes

### 🤖 Interactive Elements
- **AI Chat Assistant** - Visitors can ask questions about your experience
- **Animated skill bars** with progress indicators
- **Live counters** for stats and achievements
- **Floating tech cards** with hover effects
- **Timeline animations** for career progression

### 🛠️ Technical Features
- **GitHub Pages ready** - Deploy instantly for free
- **Performance optimized** - Fast loading and smooth scrolling
- **SEO friendly** - Meta tags and semantic HTML
- **Accessibility focused** - Screen reader friendly
- **Mobile-first design** - Responsive and touch-friendly

## 🚀 Quick Start

### 1. **Set Up GitHub Repository**
```bash
# Create a new repository on GitHub
# Name it: your-username.github.io (for personal site)
# Or: interactive-resume (for project site)
```

### 2. **Upload Your Files**
- Upload all files from this folder to your GitHub repository
- Ensure `index.html` is in the root directory

### 3. **Enable GitHub Pages**
1. Go to repository **Settings**
2. Scroll to **Pages** section
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

### 4. **Access Your Live Resume**
Your resume will be available at:
- Personal site: `https://your-username.github.io/`
- Project site: `https://your-username.github.io/repository-name/`

## 🎯 Customization Guide

### Personal Information
Edit `index.html` to update:

```html
<!-- Update navigation brand -->
<span class="brand-text">Your Name</span>

<!-- Update hero section -->
<h1 class="hero-title-modern">
    <span class="gradient-text">Your Title</span>
    <br>Your tagline here
</h1>

<!-- Update contact information -->
<span class="contact-value">your.email@example.com</span>
```

### Skills & Experience
Update skill percentages and add your technologies:

```html
<!-- Skill bars -->
<div class="skill-header">
    <span class="skill-name">Your Technology</span>
    <span class="skill-percentage">85%</span>
</div>
<div class="skill-progress" data-progress="85">
```

### Projects
Replace project cards with your own work:

```html
<div class="project-card-21st">
    <div class="card-header">
        <div class="project-icon">
            <i class="fas fa-your-icon"></i>
        </div>
    </div>
    <div class="card-content">
        <h3 class="project-title">Your Project Name</h3>
        <p class="project-description">Your project description</p>
        <div class="tech-stack">
            <span class="tech-badge">Technology 1</span>
            <span class="tech-badge">Technology 2</span>
        </div>
    </div>
</div>
```

### Colors & Branding
Modify CSS variables in `style.css`:

```css
:root {
    /* Primary colors */
    --primary-500: #3b82f6;  /* Your brand color */
    --primary-600: #2563eb;
    
    /* Gradients */
    --gradient-primary: linear-gradient(135deg, #your-color 0%, #your-color-2 100%);
}
```

### AI Chat Responses
Update `script.js` to customize AI assistant responses:

```javascript
this.chatResponses = {
    'your-skill': "Your response about this skill...",
    'your-experience': "Your response about experience...",
    // Add more responses
};
```

## 📱 Responsive Breakpoints

The resume automatically adapts to different screen sizes:

- **Desktop**: 1200px+ (Full layout with animations)
- **Tablet**: 768px-1199px (Adapted grid layouts)
- **Mobile**: <768px (Stacked layout, mobile navigation)

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#667eea to #764ba2)
- **Secondary**: Various accent gradients
- **Neutrals**: Gray scale from 50 to 900
- **Semantic**: Success, warning, error colors

### Typography
- **Font**: Inter (modern, professional)
- **Hierarchy**: 6 levels from xs to 6xl
- **Weights**: 300, 400, 500, 600, 700, 800

### Spacing
- **Scale**: 0.25rem to 6rem
- **Consistent**: Using CSS custom properties
- **Responsive**: Adapts to screen size

## 🛠️ Advanced Customization

### Adding New Sections
1. **HTML Structure**:
```html
<section id="new-section" class="new-section-21st">
    <div class="container">
        <div class="section-header">
            <span class="section-label">New Section</span>
            <h2 class="section-title">Section Title</h2>
        </div>
        <!-- Your content -->
    </div>
</section>
```

2. **CSS Styling**:
```css
.new-section-21st {
    padding: var(--space-24) 0;
    background: var(--white);
}
```

3. **Navigation Link**:
```html
<a href="#new-section" class="nav-link">New Section</a>
```

### Adding Animations
Use the intersection observer pattern:

```javascript
// In script.js, add to observeElements()
document.querySelectorAll('.your-new-element').forEach(el => {
    this.observer.observe(el);
});
```

### Custom Icons
Replace Font Awesome icons with your own:
1. Add SVG files to a new `icons/` folder
2. Replace `<i class="fas fa-icon"></i>` with your SVG
3. Apply CSS styling for consistency

## 📈 SEO Optimization

### Meta Tags
Update `index.html` head section:

```html
<meta name="description" content="Your professional description">
<meta name="keywords" content="your, skills, technologies">
<meta property="og:title" content="Your Name - Interactive Resume">
<meta property="og:description" content="Your description">
<meta property="og:image" content="https://your-site.com/preview-image.jpg">
```

### Performance Tips
- **Optimize images** - Use WebP format when possible
- **Minimize JavaScript** - Remove unused features
- **Enable caching** - Add service worker for offline access
- **Compress assets** - Use build tools for production

## 🔧 Troubleshooting

### Common Issues

**GitHub Pages not updating:**
- Check repository settings
- Ensure main branch is selected
- Wait 5-10 minutes for deployment

**Animations not working:**
- Check browser compatibility
- Ensure JavaScript is enabled
- Open browser console for errors

**Mobile layout issues:**
- Test on actual devices
- Use browser dev tools
- Check CSS media queries

**Font loading problems:**
- Verify Google Fonts CDN
- Add fallback fonts
- Check internet connection

## 🚀 Deployment Options

### GitHub Pages (Free)
- **Pros**: Free, easy setup, automatic updates
- **Cons**: Public repositories only (unless paid)

### Netlify (Free tier)
- **Pros**: Custom domains, form handling, continuous deployment
- **Setup**: Connect GitHub repo to Netlify

### Vercel (Free tier)
- **Pros**: Excellent performance, serverless functions
- **Setup**: Import from GitHub

### Custom Domain
1. Purchase domain from registrar
2. Configure DNS settings
3. Add CNAME file to repository
4. Update GitHub Pages settings

## 📞 Support & Updates

### Getting Help
- **Issues**: Check browser console for errors
- **Customization**: Refer to code comments
- **Design**: Use 21st.dev documentation
- **GitHub**: Search issues in popular resume repositories

### Staying Updated
- **Follow trends**: Check 21st.dev for new components
- **Update dependencies**: Keep Font Awesome and fonts current
- **Browser support**: Test in latest browsers
- **Mobile optimization**: Regular testing on devices

## 🎉 Tips for Maximum Impact

### Content Strategy
1. **Quality over quantity** - Showcase your best work
2. **Tell a story** - Connect experiences logically
3. **Use metrics** - Quantify achievements
4. **Keep updated** - Regular content refresh

### Technical Demonstration
1. **Live projects** - Link to working demos
2. **Code samples** - GitHub repository links
3. **Problem-solving** - Explain challenges overcome
4. **Growth mindset** - Show continuous learning

### Professional Presentation
1. **Consistent branding** - Colors, fonts, messaging
2. **Fast loading** - Optimize for performance
3. **Error-free** - Test thoroughly before sharing
4. **Contact clarity** - Make it easy to reach you

---

## 🌟 Built With Love

This resume template combines modern design principles with practical functionality. It's inspired by the excellent work at [21st.dev](https://21st.dev/home) and built to showcase your technical skills while maintaining professional standards.

**Remember**: This resume is just the beginning. Customize it, make it yours, and let your unique personality and skills shine through!

Good luck with your job search! 🚀 