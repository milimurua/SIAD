import { UserRepository } from "../../infrastructure/db/UserRepository";
import { InsuranceRepository } from "../../infrastructure/db/InsuranceRepository";
import { ProducerRepository } from "../../infrastructure/db/ProducerRepository";
import { hashPassword, comparePassword } from "../../infrastructure/security/password";
import { generateToken } from "../../infrastructure/security/jwt";
import { UserData } from "../../domain/shared";
import { v4 as uuidv4 } from 'uuid';

export class AuthService {
    private userRepo = new UserRepository();
    private insuranceRepo = new InsuranceRepository();
    private producerRepo = new ProducerRepository();

    // Registro (aseguradora o productor)
    async register(data: any) {
        const { type, email, password, name } = data;

        const existing = await this.userRepo.findByEmail(email);
        if (existing) throw new Error("Email already registered");

        let reference;
        if (type === "insurance") {
            reference = await this.insuranceRepo.create(data);
        } else if (type === "producer") {
            reference = await this.producerRepo.create(data);
        } else {
            throw new Error("Invalid user type");
        }

        const hashed = await hashPassword(password);

        const user: UserData = {
            id: uuidv4(),
            email,
            password: hashed,
            type: type,
        };

        const created = await this.userRepo.create(user);
        const token = generateToken({ id: created.id, email, type });

        return { token, userType: type, reference };
    }

    // Login genérico
    async login(email: string, password: string) {
        const cred = await this.userRepo.findByEmail(email);
        if (!cred) throw new Error("Invalid credentials");

        const valid = await comparePassword(password, cred.password);
        if (!valid) throw new Error("Invalid credentials");

        const token = generateToken({ id: cred.id, email: cred.email, type: cred.type });
        return { token, type: cred.type };
    }
}
