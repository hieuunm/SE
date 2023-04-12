// import productRouter from './productRoute';
// import userRouter from './userRoute';

const productRouter = require('./productRoute');
const userRouter = require('./userRoute');
const mainRouter = require('./mainRoute');
const adminRouter = require('./adminRoute');
const categoryRouter = require('./categoryRoute');
const cartRouter = require('./cartRoute');

function routesInit(app) {
  app.use('/admin', adminRouter);
  app.use('/', productRouter);
  app.use('/', userRouter);
  app.use('/', mainRouter);
  app.use('/', categoryRouter);
  app.use('/', cartRouter);
}

// export default routesInit;
module.exports = routesInit;
