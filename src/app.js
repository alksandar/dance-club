import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dancerRouter from "./routers/dancerRouter";
import groupRouter from "./routers/groupRouter";
import paymentRouter from "./routers/paymentRouter";

const tables = require('../src/models/tables');

const app = express();

/**
 * Define body parser.
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

/**
 * Define cors
 */
app.use(cors({credentials: true, origin: true}));

/**
 * Register routers
 */
app.use('/dancer', dancerRouter);
app.use('/group', groupRouter);
app.use('/payment', paymentRouter);


// catch 404 and forward to error handler
app.use((req, res) => {
    const err = new Error('The requested page or resource was not found or is not available.');
    res.status(404).json({error: err.message});
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : { };

    // render the error page
    res.status(err.status || 500);
    res.json({ success: false, error: err.message });
});

module.exports = app;
