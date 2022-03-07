import "../../../database/index";
import { UserService } from "../services/UserService";

const userService = new UserService();

describe("Test user service update", () => {
  let user;
  beforeAll(async () => {
    user = await userService.create({
      name: "Teste",
      email: "update@update.com",
    });
  } )

  it("should successfully update a user", async () => {

    const updatedUser = await userService.update(user.data.id, {
      name: "Teste do meu update",
      email: "update@update.com",
    });

    expect(user.error).toBe(false);
    expect(updatedUser.data.getDataValue("name")).toBe("Teste do meu update");
  });
});
