import "../../../database/index";
import { UserService } from "../services/UserService";

const userService = new UserService();

describe("Test user service create", () => {
  it("should successfully create an user", async () => {
    const user = await userService.create({
      name: "Teste",
      email: "createUser@createUser.com",
    });

    expect(user.error).toBe(false);
    expect(user.data).toHaveProperty("id");
  });
});
