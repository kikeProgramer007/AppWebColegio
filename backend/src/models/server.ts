import express, { Application } from 'express';
import cors from 'cors';

//routes
import routeCurso from '../routes/curso.routes';
import routeEstudiante from '../routes/estudiante.routes';
import routeUser from '../routes/user';
//models
import { User } from './user';
import { Curso } from './curso.model';
import { Materia} from './materia'
import { Estudiante } from './estudiante.model';
import { Licencia} from './licencia'
import { Asistencia} from './asistencia'
import { CursoEstudiante} from './curso_estudiante'
import { EstudianteMateria} from './estudiante-materia.model'
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
        this.app.use('/api/estudiantes',routeEstudiante);
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