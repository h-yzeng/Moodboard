# MoodBoard 💭

## 🌐 Live Demo

**Try MoodBoard now:** [https://mood-board-tracking-app.vercel.app/](https://mood-board-tracking-app.vercel.app/)

## 🌟 Project Overview

MoodBoard is a privacy-focused web application that helps users track their emotional well-being through daily mood logging. The application is built with modern web technologies, providing an intuitive and beautiful user interface for recording moods,analyzing patterns, and gaining insights into emotional trends over time.

MoodBoard allows users to build self-awareness through consistent emotional check-ins. The application features:

- **100% Private Data**: All data is stored locally in your browser - no servers, no accounts, complete privacy
- **Responsive Design**: Beautiful gradient UI that works seamlessly across all devices

### Key Features

#### Daily Entries Page

- **Daily Mood Logging**: Select from 20 different moods with intensity ratings (1-10)
- **Rich Context**: Add notes, tags, and quick tags to track what influences your emotions
- Collapsible entry history with toggle button
- Success confirmation with smooth animations

#### Trends Page

- **Statistics View**:
- **Trend Analysis**: Visualize mood patterns with statistics and calendar views
- **Advanced Filtering**: Filter mood data by time range and specific moods
  - Detailed mood breakdown with visual bars
  - Top influences from tags
- **Calendar View**:
  - Monthly calendar with mood emojis on each day
  - Multiple entries per day support
  - Easy navigation between months
  - Hover tooltips showing entry details

## 🛠️ Technologies Used

### Core Technologies

- **React 19.1.1**: Modern component-based UI framework with hooks
- **Vite 7.1.7**: Next-generation frontend build tool for fast development
- **JavaScript (ES2025)**: Modern JavaScript features and syntax

### Styling & UI

- **Tailwind CSS 4.1.16**: Utility-first CSS framework for rapid UI development
- **CSS3 Animations**: Custom keyframe animations for smooth transitions

### State Management

- **React Hooks**: useState, useEffect for local component state
- **Local Storage API**: Browser-based persistent storage for entries

### Development Tools

- **ESLint**: Code quality and style enforcement
- **React Compiler**: Experimental compiler for optimized React code
- **Vite HMR**: Hot Module Replacement for instant feedback during development

### Build & Deployment

- **Vite Build**: Optimized production builds with code splitting
- **Modern Browser APIs**: LocalStorage, Date, Array methods

## 📚 Lessons Learned

### Technical Insights

1. **State Management Simplicity**
   - Learned that for small to medium apps, React's built-in hooks (useState, useEffect) are often sufficient
   - Local storage provides a simple and effective persistence layer without backend complexity
   - Component-level state with prop drilling works well for shallow component trees

2. **CSS Animations Performance**
   - Discovered that animating `transform` and `opacity` properties provides the smoothest animations
   - Using `animation-delay` with inline styles enables good animations
   - Custom CSS animations have faster loading than JS-based animation libraries for simple effects

3. **Responsive Design with Tailwind**
   - Tailwind's mobile-first approach (default → sm → md → lg → xl) creates naturally responsive designs
   - Utility classes reduce CSS file size and prevent style conflicts
   - Custom animations can be seamlessly integrated with Tailwind

4. **User Experience Design**
   - Collapsible sections (like the entry history) reduce cognitive load and improve focus
   - Visual feedback (hover effects, active states) is crucial for user confidence
   - Loading animations and transitions make the app feel more polished and responsive

5. **Data Visualization**
   - Simple statistics like percentages and numbers are more useful than complex charts
   - Calendar views provide intuitive context for tracking habits
   - Color-coded mood indicators helps with quick pattern recognition

## 🚀 Future Scope

### Feature Enhancements

1. **Data Export/Import**
   - Export mood data as JSON or CSV for backup
   - Import data from other mood tracking apps
   - Share sanitized mood reports (without personal notes)

2. **Advanced Analytics**
   - Machine learning insights: "You tend to feel anxious on Mondays"
   - Correlation analysis: "You feel happier when you exercise"
   - Streak tracking: consecutive days of logging
   - Mood predictions based on historical patterns

3. **Customization Options**
   - Custom mood creation with emoji picker
   - Personalized color themes
   - Configurable quick tags
   - Custom intensity scale ranges

4. **Enhanced Visualizations**
   - Interactive charts (line graphs, pie charts) using Chart.js
   - Mood heatmaps showing intensity patterns
   - Weekly/monthly mood comparison views

5. **Reminders & Notifications**
   - Daily reminder notifications to log mood
   - Browser push notifications (opt-in)
   - Customizable reminder times

### Technical Improvements

1. **Progressive Web App (PWA)**
   - Service worker for offline functionality
   - Install to home screen capability
   - Background sync for future cloud features
   - App-like experience on mobile devices

2. **Accessibility Enhancements**
   - ARIA labels for all interactive elements
   - Keyboard navigation improvements
   - Screen reader optimization
   - High contrast mode option
   - Font size customization

3. **Integration Features**
   - Export to popular journaling apps
   - Calendar integration (Google Calendar, Apple Calendar)
   - Health app integration (Apple Health, Google Fit)

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/h-yzeng/Moodboard/

# Navigate to project directory
cd Moodboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
