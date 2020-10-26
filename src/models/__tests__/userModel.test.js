import model from "../userModel";

describe("User model", () => {
  test("username property", () => {
    const username = model.schema.obj.username;
    expect(username).toEqual({ type: String, required: true, unique: true });
  });

  test("email property", () => {
    const email = model.schema.obj.email;
    expect(email).toEqual({ type: String, required: true, unique: true });
  });

  test("password property", () => {
    const password = model.schema.obj.password;
    expect(password).toEqual({ type: String, required: true });
  });

  test("emailOptIn property", () => {
    const emailOptIn = model.schema.obj.emailOptIn;
    expect(emailOptIn).toEqual({ type: Boolean, default: false });
  });
});
