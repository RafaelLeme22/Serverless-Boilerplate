import "../../../database/index";
import { UserService } from "../services/UserService";

const userService = new UserService();

describe("Test user service delete", () => {
  it("should successfully delete an user", async () => {
    const user = await userService.create({
      name: "Teste",
      email: "deleteUser@deleteUser.com",
    });

    const deletedUser = await userService.delete(user.data.id);

    expect(user.error).toBe(false);
    expect(deletedUser.data.getDataValue("deletedAt")).not.toBeNull();
  });
});
