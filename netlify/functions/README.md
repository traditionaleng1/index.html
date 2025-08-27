# Support Validation Site

A professional validation site with login functionality that sends form submissions to your email.

## Features

- Clean, responsive design
- Login form with username/password fields
- Email integration via Netlify Functions
- Form validation
- Professional styling
- Mobile-friendly interface

## Setup Instructions

### 1. Deploy to Netlify

1. Create a new repository on GitHub and upload these files
2. Connect your GitHub repository to Netlify
3. Deploy the site

### 2. Configure Environment Variables

In your Netlify dashboard, go to Site Settings > Environment Variables and add:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Important**: For Gmail, you need to:
1. Enable 2-factor authentication
2. Generate an "App Password" (not your regular password)
3. Use the app password in the EMAIL_PASS variable

### 3. Install Dependencies

The site will automatically install dependencies during deployment. The main dependency is `nodemailer` for sending emails.

### 4. Test the Site

1. Visit your deployed site
2. Fill out the validation form
3. Submit the form
4. Check your email (doveheart100@gmail.com) for the validation details

## File Structure

```
├── index.html              # Main HTML file
├── styles.css              # Styling
├── script.js               # Frontend JavaScript
├── netlify.toml            # Netlify configuration
├── package.json            # Dependencies
├── netlify/functions/
│   └── submit-validation.js # Serverless function for email
└── README.md               # This file
```

## Customization

### Styling
Edit `styles.css` to change colors, fonts, or layout.

### Form Fields
Modify `index.html` to add/remove form fields as needed.

### Email Template
Update the email content in `netlify/functions/submit-validation.js`.

### Validation Rules
Add custom validation in `script.js`.

## Security Notes

- All form submissions are sent via HTTPS
- Sensitive data is processed server-side
- Environment variables keep email credentials secure
- Form includes basic validation and sanitization

## Support

If you need help with deployment or customization, check the Netlify documentation or contact support.

## License

MIT License - feel free to modify and use as needed.
