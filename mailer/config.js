module.exports = {
    user: process.env.EMAIL_ADDRESS,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_ADDRESS,
    to: [process.env.EMAIL_ADDRESS]
};