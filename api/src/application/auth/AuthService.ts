import { CredentialRepository } from "../../infrastructure/db/CredentialRepository";
import { InsuranceRepository } from "../../infrastructure/db/InsuranceRepository";
import { SafeProducerRepository } from "../../infrastructure/db/SafeProducerRepository";
import { hashPassword, comparePassword } from "../../infrastructure/security/password";
import { generateToken } from "../../infrastructure/security/jwt";
import { Credential } from "../../domain/entities/Credential";

export class AuthService {
    private credentialRepo = new CredentialRepository();
    private insuranceRepo = new InsuranceRepository();
    private producerRepo = new SafeProducerRepository();

    // Registro (aseguradora o productor)
    async register(data: any) {
        const { type, email, password } = data;

        const existing = await this.credentialRepo.findByEmail(email);
        if (existing) throw new Error("Email already registered");

        let reference;
        if (type === "Insurance") {
            reference = await this.insuranceRepo.create(data);
        } else if (type === "SafeProducer") {
            reference = await this.producerRepo.create(data);
        } else {
            throw new Error("Invalid user type");
        }

        const hashed = await hashPassword(password);
        const reference_id =
            'id_insurance' in reference
            ? reference.id_insurance
            : reference.id_producer;

        const cred: Credential = {
            id: "",
            email,
            password: hashed,
            rol: type,
            reference_id,
        };

        const created = await this.credentialRepo.create(cred);
        const token = generateToken({ id: created.id, email, type });

        return { token, userType: type, reference };
    }

    // Login genérico
    async login(email: string, password: string) {
        const cred = await this.credentialRepo.findByEmail(email);
        if (!cred) throw new Error("Invalid credentials");

        const valid = await comparePassword(password, cred.password);
        if (!valid) throw new Error("Invalid credentials");

        const token = generateToken({ id: cred.id, email: cred.email, type: cred.rol });
        return { token, type: cred.rol };
    }
}
