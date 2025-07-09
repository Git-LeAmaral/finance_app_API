import { EmailAlreadyInUseError } from '../errors/user.js'
import bcrypt from 'bcrypt'

export class UpdateUserUseCase {
    constructor(getUserByEmailRepository, updateUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository
        this.updateUserRepository = updateUserRepository
    }

    async execute(userId, updateUserParams) {
        // 1. Se o e-mail estiver sendo atualizado, verificar se ele já está em uso

        if (updateUserParams.email) {
            const userWithProvidedEmail =
                await this.getUserByEmailRepository.execute(
                    updateUserParams.email,
                )

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        const user = {
            ...updateUserParams,
        }

        // 2. Se a senha estiver sendo atualizada, criptografá-la

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )

            user.password = hashedPassword
        }

        // 3. Chamar o repository para atualizar o usuário
        const updatedUser = await this.updateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
