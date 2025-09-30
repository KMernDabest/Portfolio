# Portfolio Website - Troubleshooting Guide

## 🚀 **Quick Start**

Your portfolio website is ready! Here's how to run it:

### **Method 1: HTTP Server (Recommended)**
```bash
cd /d/ClassCodes/Portfolio1
npx http-server -p 3000
```
Then open: **http://localhost:3000**

### **Method 2: Alternative Ports**
If port 3000 is busy, try:
```bash
npx http-server -p 8080
npx http-server -p 4000
npx http-server -p 5000
```

### **Method 3: Python Server**
```bash
cd /d/ClassCodes/Portfolio1
python -m http.server 3000
```

## 🔧 **Common Issues & Solutions**

### **Issue: "Address already in use"**
**Solution:** Use a different port
```bash
npx http-server -p 4000  # Try different port numbers
```

### **Issue: "npx command not found"**
**Solution:** Install Node.js from https://nodejs.org/

### **Issue: TypeScript changes not showing**
**Solution:** Recompile TypeScript
```bash
cd /d/ClassCodes/Portfolio1
tsc  # Or npm run build
```

### **Issue: Styles not loading**
**Solution:** Check file paths and refresh browser (Ctrl+F5)

### **Issue: JavaScript not working**
**Solution:** 
1. Check browser console for errors (F12)
2. Recompile TypeScript: `tsc`
3. Hard refresh: Ctrl+Shift+R

## 📱 **Testing on Mobile**

Find your computer's IP address:
```bash
ipconfig  # Windows
ifconfig  # Mac/Linux
```

Then visit: `http://YOUR_IP:3000` on your mobile device

## 🎯 **Quick Development Commands**

```bash
# Compile TypeScript and watch for changes
npm run dev

# Compile TypeScript once
npm run build

# Start development server
npm run serve

# All in one - compile and serve
tsc && npx http-server -p 3000
```

## ✅ **Verification Checklist**

- [ ] Server starts without errors
- [ ] Website loads at http://localhost:3000
- [ ] Navigation menu works
- [ ] Smooth scrolling works
- [ ] Contact form validation works
- [ ] Mobile menu toggles (hamburger icon)
- [ ] Portfolio filters work
- [ ] Skills animations trigger on scroll
- [ ] Back to top button appears on scroll

## 🌐 **Current Status**

✅ **Server Running:** http://localhost:3000  
✅ **All Files Loading:** HTML, CSS, JavaScript  
✅ **No Critical Errors:** Ready to use!

---

**Need help?** Check the browser console (F12) for any error messages.