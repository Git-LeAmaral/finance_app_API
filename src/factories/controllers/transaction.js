import {
    CreateTransactionController,
    DeleteTransactionController,
    GetTransactionsByUserIdController,
    UpdateTransactionController,
} from '../../controllers/index.js'
import {
    PostgresCreateTransactionRepository,
    PostgresDeleteTransactionsRepository,
    PostgresGetTransactionsByUserIdRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateTransactionRepository,
} from '../../repositories/postgres/index.js'
import {
    CreateTransactionUseCase,
    DeleteTransactionUseCase,
    GetTransactionsByUSerIdUseCase,
    UpdateTransactionUseCase,
} from '../../use-cases/index.js'

export const makeCreateTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository()

    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        getUserByIdRepository,
    )

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    )

    return createTransactionController
}

export const makeGetTransactionsByUserIdController = () => {
    const getTransactionsByUserIdRepository =
        new PostgresGetTransactionsByUserIdRepository()

    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getTransactionsByUserIdUseCase = new GetTransactionsByUSerIdUseCase(
        getTransactionsByUserIdRepository,
        getUserByIdRepository,
    )

    const getTransactionsByUserIdController =
        new GetTransactionsByUserIdController(getTransactionsByUserIdUseCase)

    return getTransactionsByUserIdController
}

export const makeUpdateTransactionController = () => {
    const updateTransactionRepository =
        new PostgresUpdateTransactionRepository()

    const updateTransactionUseCase = new UpdateTransactionUseCase(
        updateTransactionRepository,
    )

    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase,
    )

    return updateTransactionController
}

export const makeDeleteTransactionController = () => {
    const deleteTransactionRepository =
        new PostgresDeleteTransactionsRepository()

    const deleteTransactionUseCase = new DeleteTransactionUseCase(
        deleteTransactionRepository,
    )

    const deleteTransactionController = new DeleteTransactionController(
        deleteTransactionUseCase,
    )

    return deleteTransactionController
}
