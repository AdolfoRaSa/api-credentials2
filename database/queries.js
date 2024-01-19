export const userQueries = {
  getAllUsers: "SELECT * FROM users",
  addNewUser:
    "INSERT INTO users (user_id, user_name, user_lastname, user_position, user_roleSystem, user_email, user_password, role_id) VALUES (@user_id, @user_name, @user_lastname, @user_position, @user_roleSystem, @user_email, @user_password, @role_id)",
  getUserById: "SELECT * FROM users WHERE user_id = @user_id",
  deleteUserById: "DELETE FROM users WHERE user_id = @user_id",
  updateUserById:
    "UPDATE users SET user_name = @user_name, user_lastname = @user_lastname, user_position = @user_position, user_roleSystem = @user_roleSystem, user_email = @user_email, user_password = @user_password, role_id = @role_id WHERE user_id = @user_id",
};

export const processesQueries = {
  getAllProcesses: "SELECT * FROM processes",
  addNewUser:
    "INSERT INTO processes (process_id, process_name, process_category) VALUES (@process_id, @process_name, @process_category)",
  getUserById: "SELECT * FROM processes WHERE process_id = @process_id",
  deleteUserById: "DELETE FROM processes WHERE process_id = @process_id",
  updateUserById:
    "UPDATE processes SET process_name = @process_name, process_category = @process_category WHERE process_id = @process_id",
};
