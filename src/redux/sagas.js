import { call, put, take, fork, cancelled, cancel, all, takeLatest } from 'redux-saga/effects';
const listUser = [];
export const getAll = () => {
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
        .then((res) => res.json())
        .then((result) => {
            const values = result.map((user) => {
                return {
                    name: user.title,
                    password: user.id,
                };
            });
            listUser.push(values);
        });
};

const checkLogin = (username, password) => {
    const listUserLogin = listUser.flat(1);
    console.log('list', listUserLogin);
    for (var i = 0; i < listUserLogin.length; i++) {
        const checkUser =
            Object.values(listUserLogin[i]).includes(username) && Object.values(listUserLogin[i]).includes(password);
        if (checkUser === true) {
            return checkUser;
        }
    }
};

export function* authorize(username, password) {
    try {
        yield put({ type: 'WAIT_FOR_LOGIN_RESPONSE' });
        const isLoggedIn = yield call(checkLogin, username, password);

        if (isLoggedIn) {
            yield put({ type: 'LOGIN_SUCCEEDED' });
        } else {
            throw 'Username or password wrong';
        }
    } catch (error) {
        yield put({ type: 'LOGIN_ERROR', payload: { error } });
    } finally {
        if (yield cancelled()) {
            console.log('login cancelled');
            yield put({ type: 'LOGIN_CANCELLED' });
        }
    }
}

export function* loginFlow() {
    while (true) {
        console.log('login flow started');
        const {
            payload: { username, password },
        } = yield take('LOGIN_REQUESTED');
        console.log('username, password', username, password);
        const task = yield fork(authorize, username, password);
        const action = yield take(['LOGOUT_REQUESTED', 'LOGIN_ERROR']);
        if (action.type === 'LOGOUT_REQUESTED') {
            yield cancel(task);
        } else if (action.type === 'LOGIN_ERROR') {
            alert('LOGIN_ERROR');
        }

        yield put({ type: 'LOGOUT_SUCCEEDED' });
    }
}

export default function* rootSaga() {
    yield all([loginFlow()]);
}
