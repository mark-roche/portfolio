# 🎯 Quick Customization Guide for Mark

This guide will help you quickly customize your resume with your real information.

## 🚀 Getting Started - 5 Minutes

### Step 1: Open `index.html` in a text editor
Use any text editor (VS Code, Sublime, even TextEdit) to edit the files.

### Step 2: Update Your Basic Info

**Find this section and replace with your info:**

```html
<!-- Navigation (Line ~12) -->
<span class="brand-text">Mark Roche</span>

<!-- Hero Section (Line ~45) -->
<h1 class="hero-title-modern">
    <span class="gradient-text">Full Stack Developer</span>
    <br>Building the future, one line at a time
</h1>
<p class="hero-description">
    I create exceptional digital experiences using modern technologies 
    and AI-driven development practices.
</p>

<!-- Contact Section (Line ~500+) -->
<span class="contact-value">mark.roche@example.com</span>
<span class="contact-value">linkedin.com/in/markroche</span>
<span class="contact-value">github.com/markroch</span>
```

### Step 3: Update Your Skills

**Find the skills section and adjust percentages:**

```html
<!-- Around line 150+ -->
<div class="skill-header">
    <span class="skill-name">React/Next.js</span>
    <span class="skill-percentage">90%</span> <!-- Change this -->
</div>
<div class="skill-progress" data-progress="90"> <!-- And this -->
```

**Add/Remove Technologies:**
- Copy a skill block to add new skills
- Delete entire skill blocks to remove skills
- Update the tech names and percentages

### Step 4: Update Projects

**Replace the 3 project cards with your real projects:**

```html
<!-- Around line 200+ -->
<h3 class="project-title">Your Project Name</h3>
<p class="project-description">
    Your project description here
</p>
<div class="tech-stack">
    <span class="tech-badge">Your Tech 1</span>
    <span class="tech-badge">Your Tech 2</span>
</div>
```

### Step 5: Update Experience Timeline

**Replace work experience:**

```html
<!-- Around line 350+ -->
<div class="timeline-date">2022 - Present</div>
<h3>Your Job Title</h3>
<h4>Your Company</h4>
<p>Your job description and achievements</p>
```

## 🎨 Quick Color Changes

**To change the main color scheme, edit `style.css`:**

```css
/* Find these lines around line 20 */
:root {
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Replace with your colors */
    --gradient-primary: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}
```

**Popular color combinations:**
- Green: `#10b981 0%, #059669 100%`
- Purple: `#8b5cf6 0%, #7c3aed 100%`
- Orange: `#f97316 0%, #ea580c 100%`
- Pink: `#ec4899 0%, #db2777 100%`

## 🤖 AI Chat Customization

**Edit `script.js` to update AI responses (around line 200):**

```javascript
this.chatResponses = {
    'react': "Mark has X years of experience with React...", // Update with your info
    'experience': "Mark has worked at...", // Your experience
    'skills': "Mark's skills include...", // Your skills
    'projects': "Mark's projects include...", // Your projects
    'python': "Mark uses Python for...", // Your Python experience
    'contact': "You can reach Mark at...", // Your contact info
};
```

## 📱 Testing Your Resume

### Local Testing
1. **Double-click `index.html`** - It should open in your browser
2. **Test responsiveness** - Make your browser window smaller/larger
3. **Test interactions** - Click buttons, try the AI chat, test the contact form

### Mobile Testing
1. **Open in browser** on your phone
2. **Use browser dev tools** - Press F12, click the mobile icon
3. **Test all features** - Navigation, animations, scrolling

## 🚀 Publishing to GitHub Pages

### Option 1: Simple Upload
1. **Create GitHub account** if you don't have one
2. **Create new repository** named `your-username.github.io`
3. **Upload all 4 files** (index.html, style.css, script.js, README.md)
4. **Enable Pages** in repository Settings → Pages
5. **Visit** `https://your-username.github.io`

### Option 2: Using Git (if you know Git)
```bash
git init
git add .
git commit -m "Initial resume"
git branch -M main
git remote add origin https://github.com/your-username/your-username.github.io.git
git push -u origin main
```

## 🎯 Quick Wins for Employers

### 1. Quantify Everything
```html
<!-- Instead of: -->
<p>Improved application performance</p>

<!-- Write: -->
<p>Improved application performance by 40%, reducing load time from 3s to 1.8s</p>
```

### 2. Add Real Links
```html
<!-- Add real GitHub links -->
<button class="card-action" onclick="window.open('https://github.com/your-username/project', '_blank')">
    <i class="fab fa-github"></i>
</button>

<!-- Add real demo links -->
<button class="card-action" onclick="window.open('https://your-project-demo.com', '_blank')">
    <i class="fas fa-external-link-alt"></i>
</button>
```

### 3. Update Stats
```html
<!-- Make these numbers real -->
<span class="stat-number" data-target="50">0</span> <!-- Projects -->
<span class="stat-number" data-target="3">0</span>  <!-- Years -->
<span class="stat-number" data-target="25">0</span> <!-- Technologies -->
<span class="stat-number" data-target="15">0</span> <!-- Clients -->
```

## 🔧 Common Issues & Fixes

### **Fonts not loading:**
- Check internet connection
- Font Awesome and Google Fonts need internet

### **Animations not working:**
- Open browser console (F12)
- Look for JavaScript errors
- Ensure all files are in the same folder

### **Mobile layout broken:**
- Check CSS media queries
- Test on actual mobile device
- Use browser dev tools

### **GitHub Pages not updating:**
- Wait 5-10 minutes
- Check repository settings
- Ensure files are in root directory

## 📋 Pre-Launch Checklist

- [ ] Updated all personal information
- [ ] Added real project links
- [ ] Updated skill percentages honestly
- [ ] Added real work experience
- [ ] Updated contact information
- [ ] Tested on mobile
- [ ] Checked all links work
- [ ] Spell-checked everything
- [ ] Asked someone to review it

## 🎉 You're Ready!

Once you've customized everything:
1. **Test thoroughly** on desktop and mobile
2. **Share with friends** for feedback
3. **Upload to GitHub Pages**
4. **Add the link to your LinkedIn**
5. **Use in job applications**

**Your resume will stand out from 99% of other candidates!** 🚀

---

Need help? The main README.md has more detailed instructions and troubleshooting tips. 