import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        
        // Verificar se o e-mail foi enviado
        if(!email) {
            throw new Error("E-mail incorrect!");
        }

        // Verificar se esse e-mail já está cadastrado na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if(userAlreadyExists) {
            throw new Error("User already exists!");
        }

        // Criptografar senha do usuário
        const passwordHash = await hash(password, 8);

        // Cadastrar o usuário no BD
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

        return user;
    }
}

export { CreateUserService };