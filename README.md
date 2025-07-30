# Habit Tracker PWA

A modern Progressive Web App (PWA) for tracking and building better habits. Built with vanilla JavaScript, HTML, and CSS.

## Features

- ✅ **PWA Ready** - Install on your phone/desktop
- ✅ **Offline Support** - Works without internet connection
- ✅ **Local Storage** - Data persists on your device
- ✅ **Streak Tracking** - Monitor your progress and streaks
- ✅ **Progress Visualization** - See your completion rates
- ✅ **Responsive Design** - Works on all devices
- ✅ **Modern UI** - Clean, intuitive interface
- ✅ **Real-time Updates** - Instant feedback and notifications

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for development)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd habitTracker
   ```

2. **Start a local server**
   
   **Option 1: Using Python**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option 2: Using Node.js**
   ```bash
   npx serve .
   ```

   **Option 3: Using PHP**
   ```bash
   php -S localhost:8000
   ```

3. **Open in browser**
   - Navigate to `http://localhost:8000`
   - The app should load and be ready to use

### Installing as PWA

1. **On Desktop (Chrome/Edge)**
   - Open the app in your browser
   - Look for the install icon in the address bar
   - Click "Install" to add to your desktop

2. **On Mobile**
   - Open the app in Chrome/Safari
   - Tap the share button
   - Select "Add to Home Screen"
   - The app will now appear as a native app

## Usage

### Adding Habits
1. Click the "+" button in the top right
2. Enter a habit name (required)
3. Add an optional description
4. Choose frequency (daily/weekly/monthly)
5. Click "Add Habit"

### Tracking Progress
- Click "Mark Complete" to log today's completion
- View your current streak and longest streak
- See progress bars for the last 7 days
- Toggle completion status anytime

### Managing Habits
- Delete habits you no longer want to track
- All data is stored locally on your device
- No account or internet required

## Features in Detail

### PWA Capabilities
- **Installable** - Add to home screen/desktop
- **Offline First** - Works without internet
- **App-like Experience** - Full-screen, no browser UI
- **Background Sync** - Ready for future enhancements

### Habit Tracking
- **Streak Calculation** - Current and longest streaks
- **Progress Visualization** - Weekly completion rates
- **Flexible Frequency** - Daily, weekly, or monthly habits
- **Date-based Tracking** - Accurate completion logging

### Data Management
- **Local Storage** - Data stays on your device
- **No Backend Required** - Completely self-contained
- **Privacy First** - No data sent to servers

## File Structure

```
habitTracker/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── app.js             # Main JavaScript application
├── manifest.json      # PWA manifest
├── sw.js             # Service worker
├── icons/            # App icons (to be added)
└── README.md         # This file
```

## Browser Support

- ✅ Chrome 42+
- ✅ Firefox 44+
- ✅ Safari 11.1+
- ✅ Edge 17+

## Development

### Adding Icons

To complete the PWA setup, you'll need to add icons to the `icons/` directory. The manifest.json expects these sizes:

- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512

You can generate these using tools like:
- [PWA Builder](https://www.pwabuilder.com/imageGenerator)
- [Favicon Generator](https://realfavicongenerator.net/)

### Customization

The app is built with vanilla JavaScript and can be easily customized:

- **Colors**: Modify CSS variables in `styles.css`
- **Features**: Add new functionality in `app.js`
- **UI**: Update the HTML structure in `index.html`

## Future Enhancements

- [ ] Push notifications for habit reminders
- [ ] Data export/import functionality
- [ ] Habit categories and tags
- [ ] Advanced analytics and insights
- [ ] Cloud sync (optional)
- [ ] Dark mode theme
- [ ] Habit templates and suggestions

## Contributing

Feel free to fork this project and submit pull requests for improvements!

## License

This project is open source and available under the MIT License.

---

**Happy habit building! 🚀** 