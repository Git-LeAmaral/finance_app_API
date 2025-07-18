import { UserNotFoundError } from '../../errors/user.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    requiredFieldsIsMissingResponse,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js'

export class GetTransactionsByUserId {
    constructor(getTransactionsByUSerIdUseCase) {
        this.getTransactionsByUSerIdUseCase = getTransactionsByUSerIdUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId

            // verificar se o userId foi passado como parâmetro
            if (!userId) {
                return requiredFieldsIsMissingResponse('userId')
            }

            // verificar se o userId é um ID válido
            const userIdIsValid = checkIfIdIsValid(userId)

            if (!userIdIsValid) {
                return invalidIdResponse()
            }

            // chamar o user case
            const transactions =
                await this.getTransactionsByUSerIdUseCase.execute({
                    userId,
                })

            // retornar resposta http
            return ok(transactions)
        } catch (error) {
            console.error(error)

            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse()
            }
            return serverError()
        }
    }
}
