import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    // Validamos si el usuario ya existe en la base de datos
    const user = await User.findOne({ where: { username: username } });

    if(user) {
       return res.status(400).json({
            mensaje: `Ya existe un usuario con el nombre ${username}`
        })
    } 
 
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        // Guardarmos usuario en la base de datos
        await User.create({
            username: username,
            password: hashedPassword
        })
    
        res.json({
            mensaje: `Usuario ${username} creado exitosamente!`
        })
    } catch (error) {
        res.status(400).json({
            mensaje: 'Upps ocurrio un error',
            error
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {

    const { username, password } = req.body;
    
   // Validamos si el usuario existe en la base de datos
   const user: any = await User.findOne({ where: { username: username } });

   if(!user) {
        return res.status(403).json({
            mensaje: `No existe un usuario con el nombre ${username} en la base datos`
        })
   }

   // Validamos password
   const passwordValid = await bcrypt.compare(password, user.password)
   if(!passwordValid) {
    return res.status(403).json({
        mensaje: `Password Incorrecta`
    })
   }
   let id = user.id;
   // Generamos token
   const token = jwt.sign({
    id: id,
    username: username
   }, process.env.SECRET_KEY || 'test123');
   
   res.json(token);
}