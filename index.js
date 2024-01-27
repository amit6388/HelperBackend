require('dotenv').config();
require("./connection");
const express = require("express");
const cors = require("cors");
const passport = require('passport');
const cookieSession = require('cookie-session');
const CustomerRouter = require('./Routers/AuthRouters/customerRouter');
const ServiceRouter = require("./Routers/Services/ServicesRoutes");
const utilRouter = require("./Routers/utils");
const RolesRoutes = require("./Routers/RolesManageRoutes/RolesRoutes");
const EmployeeRoutes = require("./Routers/AuthRouters/OfficeRouter");
const ServiceRoutes = require("./Routers/AuthRouters/ServiceProviderRoutes");
const OrderRouters = require('./Routers/OrdersRoutes/BookingRoutes');
const EnquiryRouters = require('./Routers/enquiryRoutes');
const ExpenseRouters = require('./Routers/ExpensesRouters/ExpenseRouters');
const SuperAdminRoutes = require("./Routers/AuthRouters/SuperAdminRoutes");
const TestimonalRoute=require("./Routers/Testimonal/Testimonal")
const app = express();

// Middleware section
app.use(express.json());


app.use(
    cookieSession({
        name: "session",
        keys: ["helpers"],
        maxAge: 24 * 60 * 60 * 1000, // Fixed: Correct the maxAge value to milliseconds
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: ["http://ec2-3-111-248-12.ap-south-1.compute.amazonaws.com", "http://localhost:3000", "https://trackel-helper-frontend.vercel.app"],
        credentials: true,
    })
);

// Routes section
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Welcome to the Helper Services");
});

app.use("/customer", CustomerRouter);
app.use("/service", ServiceRouter);
app.use("/expense", ExpenseRouters);
app.use("/employee", EmployeeRoutes);
app.use("/service-provider", ServiceRoutes);
app.use("/roles", RolesRoutes);
app.use("/admin", SuperAdminRoutes);
app.use("/util", utilRouter);
app.use("/order", OrderRouters);
app.use('/enquiry', EnquiryRouters);
app.use('/api',TestimonalRoute)
// Static files
app.use(express.static("./static"));

// Start the server
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
