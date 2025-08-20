# FIST Gym - DigitalOcean Deployment Guide

## Overview
This guide covers deploying your FIST Gym React + Express.js application to DigitalOcean App Platform.

## Prerequisites
- DigitalOcean account
- GitHub repository with your code
- MongoDB Atlas account (recommended for production database)

## Deployment Options

### Option 1: DigitalOcean App Platform (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git push origin main
   ```

2. **Create MongoDB Atlas Database**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create a new cluster
   - Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/fistgym`)

3. **Deploy on DigitalOcean**
   - Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
   - Click "Create App"
   - Connect your GitHub repository
   - Use the `.do/app.yaml` configuration file
   - Set environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A secure random string
     - `EMAIL_USER`: Your Gmail address
     - `EMAIL_PASS`: Your Gmail app password
     - `OPENAI_API_KEY`: Your OpenAI API key (if using AI features)

### Option 2: DigitalOcean Droplet with Docker

1. **Create a Droplet**
   - Ubuntu 22.04 LTS
   - At least 1GB RAM

2. **Install Docker**
   ```bash
   sudo apt update
   sudo apt install docker.io docker-compose -y
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

3. **Deploy with Docker Compose**
   ```bash
   git clone your-repo-url
   cd senjitsu
   cp .env.example .env
   # Edit .env with your actual values
   sudo docker-compose up -d
   ```

## Environment Variables Required

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fistgym
JWT_SECRET=your-super-secret-jwt-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
NODE_ENV=production
PORT=3001
OPENAI_API_KEY=your-openai-key
```

## Post-Deployment Checklist

- [ ] Test user registration and login
- [ ] Verify email notifications work
- [ ] Test booking functionality
- [ ] Check MongoDB connection
- [ ] Verify file uploads work
- [ ] Test responsive design on mobile

## Monitoring

- Monitor app logs in DigitalOcean dashboard
- Set up alerts for downtime
- Monitor database performance in MongoDB Atlas

## Troubleshooting

**Common Issues:**
1. **Build fails**: Check Node.js version compatibility
2. **Database connection fails**: Verify MongoDB URI and network access
3. **Email not working**: Check Gmail app password settings
4. **CORS errors**: Update CORS origins in backend configuration

## Scaling

- Increase instance size in DigitalOcean App Platform
- Add database read replicas in MongoDB Atlas
- Implement Redis for session storage (optional)

## Security Notes

- Never commit `.env` files to Git
- Use strong JWT secrets
- Enable MongoDB Atlas IP whitelist
- Set up SSL/TLS (automatic with App Platform)
- Regular security updates
