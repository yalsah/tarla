# Land Distribution Web App

A modern, responsive web application that distributes land pieces equally among inheritors using a greedy balancing algorithm.

## Features

- 🎨 Beautiful gradient UI with modern design
- 📱 Fully responsive (works on mobile, tablet, and desktop)
- ⚡ Real-time input validation
- 🏷️ Named land pieces for easy identification
- 🔢 Multiplication factor for each piece (base area × factor = final area)
- 🔄 Multiple distribution solutions with randomized generation
- ✅ Strict fairness validation - only shows distributions where max difference < 5% of minimum allocation
- 📊 Detailed statistics for each solution (max, min, difference, percentage)
- ➕ Dynamic add/remove land pieces
- ⌨️ Live calculation of final areas
- 🗑️ Reset button to clear all solutions and start fresh
- 💾 Save data to file as JSON
- 📂 Load previously saved data from file
- 🔗 **Cloud Sharing** - Generate shareable links that work across devices
- 👥 **Multi-device Access** - Anyone with the link can view the same data
- ⚠️ Smart warnings if fair distribution isn't achievable
- 💡 Zero dependencies (runs directly in browser)

## Live Demo

Simply open `index.html` in any modern web browser - no installation or build process required!

## How It Works

### Algorithm
The app uses a **randomized greedy balancing algorithm** with strict fairness criteria:

1. **Sort land pieces** randomly (different each time)
2. **Initialize** each person with zero land
3. **For each land piece**:
   - Find the person who currently has the least total land
   - Assign this piece to that person
   - Update their total
4. **Validate fairness**: Only accept distributions where:
   - Maximum difference ÷ Minimum allocation < 5%
   - This ensures truly equal distribution

### Fairness Criterion Explained

The app only shows distributions that meet this strict requirement:

**Formula**: `(Max Allocation - Min Allocation) / Min Allocation × 100 < 5%`

**Example 1 (VALID ✓):**
- Person 1: 250 units (minimum)
- Person 2: 260 units
- Person 3: 262 units (maximum)
- Difference: 262 - 250 = 12 units
- Percentage: 12 ÷ 250 × 100 = 4.8% ✓ (less than 5%)

**Example 2 (INVALID ✗):**
- Person 1: 200 units (minimum)
- Person 2: 250 units
- Person 3: 280 units (maximum)
- Difference: 280 - 200 = 80 units
- Percentage: 80 ÷ 200 × 100 = 40% ✗ (exceeds 5%)

If the app cannot find a valid distribution after 1000 attempts, it shows the best distribution found (the one with the lowest maximum difference) marked as "Best Effort" with a warning suggesting you adjust your land sizes or factors.

### Example
**Input:**
- Land sizes: `100, 200, 150, 300, 50`
- Number of inheritors: `3`

**Process:**
1. Sort: [300, 200, 150, 100, 50]
2. Distribute:
   - Person 1 gets 300 (total: 300)
   - Person 2 gets 200 (total: 200)
   - Person 3 gets 150 (total: 150)
   - Person 3 gets 100 (total: 250)
   - Person 2 gets 50 (total: 250)

**Result:**
- Inheritor 1: 300 units (1 piece)
- Inheritor 2: 250 units (2 pieces: 200, 50)
- Inheritor 3: 250 units (2 pieces: 150, 100)
- Maximum difference: 50 units

## Usage

### Running Locally

1. Download the `index.html` file
2. Open it in any modern web browser (Chrome, Firefox, Safari, Edge)
3. Start using the calculator!

### Using the App

1. **Add land pieces:** 
   - Enter a name for each piece (e.g., "North Field", "River Plot")
   - Enter the base area (the original size)
   - Enter a multiplication factor (default is 1)
   - The final area is automatically calculated: Base Area × Factor
   - Click "+ Add Land Piece" to add more pieces
   - Click the "×" button to remove a piece

2. **Enter number of inheritors:** Type a positive integer
   - Example: `3`

3. **Generate distributions:** 
   - Click "Find Fair Distribution" to search for a valid solution
   - The app will try up to 1000 different combinations
   - Distributions meeting the 5% fairness criterion are marked as valid (green stats)
   - If no valid distribution is found, the best attempt (lowest max difference) is shown marked as "Best Effort" (orange badge and yellow stats)
   - Click "Find Another Solution" to generate additional distributions
   - Each attempt shows you the result even if it doesn't meet the 5% goal

4. **View solutions:** 
   - All distributions (valid and best-effort) are displayed stacked vertically
   - Valid solutions show a blue "Solution X" badge with green statistics
   - Best-effort solutions show an orange "Solution X (Best Effort)" badge with yellow statistics
   - Each solution shows detailed statistics:
     - Maximum allocation (highest amount given to one person)
     - Minimum allocation (lowest amount given to one person)
     - Difference (max - min)
     - Percentage (difference as % of minimum) - valid if < 5%
   - Compare different allocation strategies

5. **Save your work:**
   - Click "💾 Save to File" to download all your data as a JSON file
   - The file includes land pieces, number of inheritors, and all generated distributions
   - Files are saved with a timestamp (e.g., `land-distribution-1234567890.json`)
   - Store the file anywhere on your computer

6. **Load saved work:**
   - Click "📂 Load from File" and select a previously saved JSON file
   - All data (land pieces, inheritors, and solutions) will be restored
   - Continue working from where you left off

7. **Share with others (Cloud Sharing):**
   - Click "🔗 Share Link" to generate a shareable URL
   - A modal will appear with a unique link
   - Click "Copy" to copy the link to your clipboard
   - Share this link with family members, partners, or advisors
   - Anyone with the link can view your land distribution on any device
   - The data is stored in browser localStorage and accessible via the link
   - **Note:** The link works as long as it's accessed from a browser that has visited the page before, or from the same domain

8. **Reset:** Click "Reset All Solutions" to clear distributions and start over

### How the Fairness Validation Works

The app uses a randomized greedy algorithm that shuffles land pieces before each distribution attempt. It validates each result against the strict fairness criterion and only shows distributions where:

**(Max Allocation - Min Allocation) / Min Allocation × 100 < 5%**

**Why might you not find a valid distribution?**
- Land pieces are too varied in size
- Not enough pieces to balance across inheritors  
- Factors creating imbalanced final areas

**Solution**: Adjust land factors or split large pieces into smaller ones to enable fairer distribution.

### Example Use Case

**Scenario:** You have 4 land pieces with different quality factors:
- North Field: 100 units × 1.2 (fertile soil) = 120 units
- South Plot: 150 units × 0.8 (rocky terrain) = 120 units
- East Garden: 80 units × 1.5 (irrigation system) = 120 units
- West Pasture: 200 units × 1.0 (standard) = 200 units

The app will distribute these fairly among your inheritors based on the final calculated areas.

### Input Validation

The app automatically validates:
- Base area and factor must be positive numbers
- At least one valid land piece is required
- Number of inheritors must be a positive integer
- Empty or invalid inputs show helpful error messages
- Final area is calculated in real-time as you type

## Deployment Options

### Option 1: Direct File Hosting
Upload `index.html` to any web hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any traditional web host

### Option 2: GitHub Pages

1. Create a GitHub repository
2. Upload `index.html`
3. Go to Settings → Pages
4. Select main branch as source
5. Your app will be live at `https://yourusername.github.io/repo-name/`

### Option 3: Netlify Drop

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop the `index.html` file
3. Get an instant live URL

### Option 4: Local Server

Using Python:
```bash
python -m http.server 8000
```

Using Node.js:
```bash
npx http-server
```

Then visit `http://localhost:8000`

## Browser Compatibility

Works in all modern browsers:
- ✅ Chrome/Edge (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Opera (76+)

## Technical Details

- **Framework:** React 18 (loaded via CDN)
- **Styling:** Pure CSS with modern gradients
- **Build Process:** None required - single HTML file
- **Dependencies:** React and Babel loaded from CDN
- **File Size:** ~10KB

## Algorithm Complexity

- **Time Complexity:** O(n log n) where n is the number of land pieces (due to sorting)
- **Space Complexity:** O(p) where p is the number of people

## Customization

### Change Colors

Edit the gradient in the CSS:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Replace `#667eea` and `#764ba2` with your preferred colors.

### Change Max Width

Adjust the container width:
```css
.container {
    max-width: 900px; /* Change this value */
}
```

### Add Language Support

Modify the text strings in the JSX to translate the interface.

## Features Explained

### Real-time Validation
Input fields clear error messages as you type, providing a smooth user experience.

### Keyboard Support
Press Enter in any input field to trigger the calculation.

### Responsive Design
The layout automatically adapts to different screen sizes using CSS media queries.

### Visual Feedback
- Hover effects on cards and buttons
- Color-coded results
- Smooth transitions and animations

## Future Enhancements

Potential features to add:
- Export results to PDF or CSV
- Save/load distribution scenarios
- Visual chart showing distribution
- Named inheritors instead of numbers
- Constraint-based distribution
- Alternative algorithms (dynamic programming)
- Multi-language support
- Dark mode toggle
- Share results via URL

## License

Free to use and modify for any purpose.

## Contributing

Feel free to fork and enhance! Some ideas:
- Add data visualization with Chart.js
- Implement save/load functionality with localStorage
- Create a print-friendly view
- Add unit tests
- Optimize for accessibility (ARIA labels, keyboard navigation)

## Support

For issues or questions, please open an issue on the GitHub repository.

---

**Built with ❤️ using React and modern web technologies**

## Cloud Sharing Feature

The app now uses **JSONBin.io** - a real cloud database that stores data online, making sharing work across all devices!

**✅ Works on all devices** - Computer, phone, tablet - anywhere with internet
**✅ No setup required** - Just click "Share to Cloud" and it works
**✅ Free to use** - Uses a free cloud service

### How Cloud Sharing Works

1. **Generate a Share Link:**
   - Click the "🔗 Share to Cloud" button
   - The app uploads your data to JSONBin.io cloud servers
   - A unique shareable URL is generated (e.g., `https://yoursite.com/index.html?share=abc123xyz`)

2. **Share the Link:**
   - Copy the link using the "Copy" button
   - Send it via email, WhatsApp, text message, or any communication method
   - Anyone who opens the link will see your exact land distribution data

3. **Access Shared Data:**
   - When someone opens your shared link on ANY device, the app automatically downloads the data from the cloud
   - They can view all land pieces, inheritor counts, and distribution solutions
   - Works on phones, tablets, computers - any device with a browser

### Important Notes About Sharing

- **Internet Required:** Both sharing and loading shared links require an internet connection
- **Cloud Storage:** Data is stored on JSONBin.io servers (free tier: unlimited reads, reasonable storage limits)
- **Persistence:** Shared data persists indefinitely on the cloud
- **Privacy:** Links are unique but not password-protected. Anyone with the link can view the data
- **Free Service:** Uses JSONBin.io's free tier - no account or payment needed

### Best Practices

- **For Production Use:** Consider hosting the app on a web server (GitHub Pages, Netlify, etc.) for reliable sharing
- **For Private Sharing:** Only share links with trusted individuals
- **For Long-term Storage:** Use the "Save to File" feature to create backups
- **For Collaboration:** Generate new share links after making significant updates

### Alternative Sharing Methods

If cloud sharing doesn't work for your use case:
- Use "Save to File" and share the JSON file via email or cloud storage (Dropbox, Google Drive)
- Recipients can use "Load from File" to import the data

