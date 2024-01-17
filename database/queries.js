export const userQueries = {
  getAllUsers: "SELECT * FROM users",
  addNewUser:
    "INSERT INTO users (user_id, user_name, user_lastname, user_email, user_role, user_password) VALUES (@user_id, @user_name, @user_lastname, @user_email, @user_role, @user_password)",
  getUserById: "SELECT * FROM users WHERE user_id = @user_id",
  deleteUserById: "DELETE FROM users WHERE user_id = @user_id",
  updateUserById:
    "UPDATE users SET user_name = @user_name, user_lastname = @user_lastname, user_email = @user_email, user_role = @user_role WHERE user_id = @user_id",
};
