const users = new Map();
const failedAttempts = new Map();

function registerUser(username, password) {
    if (!username || !password) {
        throw new Error("Username and password are required");
    }

    if (users.has(username)) {
        throw new Error("User already exists");
    }

    users.set(username, password);
    failedAttempts.set(username, 0);

    return true;
}

function loginUser(username, password) {
    if (!username || !password) {
        return false;
    }

    if (!users.has(username)) {
        return false;
    }

    // Block login after 3 failed attempts
    if (failedAttempts.get(username) >= 3) {
        return false;
    }

    // Correct password
    if (users.get(username) === password) {
        failedAttempts.set(username, 0);
        return true;
    }

    // Wrong password
    const attempts = failedAttempts.get(username) + 1;
    failedAttempts.set(username, attempts);

    return false;
}

module.exports = {
    registerUser,
    loginUser
};