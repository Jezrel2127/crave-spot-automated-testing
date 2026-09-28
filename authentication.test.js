const { registerUser, loginUser } = require("./authentication");

describe("Crave Spot Authentication", () => {

    test("should register a new user", () => {
        expect(registerUser("jezrel", "12345")).toBe(true);
    });

    test("should login with correct credentials", () => {
        expect(loginUser("jezrel", "12345")).toBe(true);
    });

    test("should reject incorrect password", () => {
        expect(loginUser("jezrel", "wrongpassword")).toBe(false);
    });

    test("should reject unknown user", () => {
        expect(loginUser("unknown", "12345")).toBe(false);
    });

    test("should require username and password", () => {
        expect(loginUser("", "")).toBe(false);
    });

    test("should lock the user after 3 failed attempts", () => {
        registerUser("lockeduser", "correct123");

        // Three incorrect attempts
        expect(loginUser("lockeduser", "wrong")).toBe(false);
        expect(loginUser("lockeduser", "wrong")).toBe(false);
        expect(loginUser("lockeduser", "wrong")).toBe(false);

        // Correct password is rejected because account is locked
        expect(loginUser("lockeduser", "correct123")).toBe(false);
    });

});