import bodyParser from "body-parser";
import express from "express";
import multer, { DiskStorageOptions, Multer } from "multer";
import path from "path"
import { v4 as uuid } from 'uuid';import 'dotenv/config'
import { Request } from "express";

//RUTAS
import userRoutes from "./routes/users"
import productRoutes from "./routes/products"

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req:Request, file:Express.Multer.File , cb: DestinationCallback, filename: string) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
}as DiskStorageOptions) 
app.use(multer({storage}).single('image'));


// configuración de cabeceras
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Controll-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
	next();
});
app.disable('etag');

//rutas base
app.use('/api', userRoutes);
app.use('/api', productRoutes);

export default app;