import express, { Application } from 'express';
import cors from 'cors';

import { User } from './user';
import routeCurso from '../routes/curso';
import routeUser from '../routes/user';
import { Curso } from './curso';
import { Materia} from './materia'
import { Estudiante } from './estudiante';
import { Licencia} from './licencia'
import { Asistencia} from './asistencia'
import { CursoEstudiante} from './curso_estudiante'
import { EstudianteMateria} from './estudiante_materia'
import  Aviso from './aviso'

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        })
    }

    routes() {
        this.app.use('/api/users',routeUser);
        this.app.use('/api/cursos',routeCurso);
    }

    midlewares() {
        // Parseo body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());
    }

    async dbConnect() {
        try {
   
            await User.sync();
            await Curso.sync()
            await Materia.sync()
            await Estudiante.sync()
            await Licencia.sync()
            await Asistencia.sync()
            await CursoEstudiante.sync()
            await EstudianteMateria.sync()
            await Aviso.sync()
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;