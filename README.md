
# MotoNest - Car Resellig Web Application

MotoNest is a full-stack MERN application designed for luxury car reselling. It features a responsive UI, advanced filtering, admin dashboard, enquiry management, and secure backend APIs.

## Features

🔍 User-Side (Customer Portal)

Browse Luxury Cars with high-quality images and detailed specs.

Advanced Filters (brand, model, year, body type, price range, fuel type).

Car Detail Page with EMI calculator, image carousel, and WhatsApp enquiry.

Wishlist / Bookmark Support (if added).

Responsive UI for a seamless experience on all devices.

🛠️ Admin Panel

Dashboard Overview

Total users

Total cars

Total enquiries

Recently added cars & enquiries

Car Management

Add, edit, delete car listings

Upload multiple images

Manage car specs (year, km driven, fuel, transmission, etc.)

User Management (view & manage registered users)

Enquiry Management

Update enquiry status (Pending/Completed)

View enquiry details with linked car

Payment / Booking Token Option (optional feature for high-value cars)


## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB Atlas 

**Payment Integration:** Razorpay 


## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=8080`


// JWT SECRET KEY

`JWT_SECRET= YOUR_SECRET_KEY`

// MongoDB

`MONGO_URI=MONGODB_URL`

// RAZORPAY INTEGRATION

`rzp_test_key_id=RAZORPAY_TEST_KEY`
`rzp_test_secret_key=RAZORPAY_TEST_SECRET_KEY`


## Run Locally

Clone the project

```bash
  git clone https://github.com/kunjchapadiya/MotoNest
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server & react 

```bash
  npm run dev
```


## Authors

- [@kunjchapadiya](https://www.github.com/kunjchapadiya) 

