export const mocks = {
    $auth: {
        login: jest.fn( () => Promise.resolve() ),
    },

    $route  : {},
    $router : {
        push: jest.fn(),
    },
}
