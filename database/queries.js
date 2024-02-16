export const usersQueries = {
  getAllUsers: "SELECT * FROM users",
  addNewUser:
    "INSERT INTO users (user_id, user_name, user_lastname, user_position, user_roleSystem, user_email, user_password, user_status) VALUES (@user_id, @user_name, @user_lastname, @user_position, @user_roleSystem, @user_email, @user_password, @user_status)",
  getUserById: "SELECT * FROM users WHERE user_id = @user_id",
  getUserByEmail: "select * from users where user_email = @user_email",
  getUserRole: "SELECT role_id FROM user_process WHERE user_id = @user_id",
  getUserRoleForProcess:
    "SELECT role_id FROM user_process WHERE user_id = @user_id AND process_id = @process_id",
  deleteUserById: "DELETE FROM users WHERE user_id = @user_id",
  deactiveUserById: "UPDATE users SET user_status = 0 WHERE user_id = @user_id",
  updateUserById:
    "UPDATE users SET user_name = @user_name, user_lastname = @user_lastname, user_position = @user_position, user_roleSystem = @user_roleSystem, user_email = @user_email, user_password = @user_password, user_status = @user_status WHERE user_id = @user_id",
};

export const processesQueries = {
  getAllProcesses: "SELECT * FROM processes",
  addNewProcess:
    "INSERT INTO processes (process_id, process_name, process_category) VALUES (@process_id, @process_name, @process_category)",
  getProcessById: "SELECT * FROM processes WHERE process_id = @process_id",
  getLeaderByProcessId:
    "SELECT user_name, user_lastname FROM user_process JOIN users on user_process.user_id = users.user_id WHERE process_id = @process_id AND role_id = 2",
  deleteProcessById: "DELETE FROM processes WHERE process_id = @process_id",
  updateProcessById:
    "UPDATE processes SET process_name = @process_name, process_category = @process_category WHERE process_id = @process_id",
};

export const userProcessQueries = {
  getAllUserProcess: "SELECT * FROM user_process",
  getProcessByUserId:
    "SELECT process_id FROM user_process WHERE user_id = @user_id",
  addNewUserProcess:
    "INSERT INTO user_process (user_id, process_id, role_id) VALUES (@user_id, @process_id, @role_id)",
  getUserProcessById:
    "SELECT * FROM user_process WHERE user_process_id = @user_process_id",
  deleteUserProcessById:
    "DELETE FROM user_process WHERE user_process_id = @user_process_id",
  updateUserProcessById:
    "UPDATE user_process SET user_id = @user_id, process_id = @process_id, role_id = @role_id WHERE user_process_id = @user_process_id",
};

export const documentsQueries = {
  getAllDocuments: "SELECT * FROM documents",
  getDocumentById: "SELECT * FROM documents WHERE document_id = @document_id",
  getProceduresByProcessId:
    "select document_id, document_name, document_version, process_name, user_name, doctype_name from documents join processes on documents.process_id = processes.process_id join users on documents.user_id = users.user_id join doctypes on documents.doctype_id = doctypes.doctype_id where documents.process_id = @process_id AND documents.doctype_id = 2",
  addNewDocument:
    "INSERT INTO documents (document_id, document_name, document_version, process_id, user_id, doctype_id, document_date) VALUES (UPPER(@document_id), @document_name, convert(float, @document_version), @process_id, @user_id, @doctype_id, getDate())",
};

export const uploadsQueries = {
  getAllUploads: "SELECT * FROM uploads",
  addNewUpload:
    "INSERT INTO uploads (upload_name, upload_newname, upload_path, document_id, upload_date, filetype_id) VALUES (@upload_name, @upload_newname, @upload_path, UPPER(@document_id), getDate(), @filetype_id)",
};

export const instructionsQueries = {
  getAllInstructions: "SELECT * FROM instructions",
  addNewInstruction:
    "INSERT INTO instructions (instruction_id, instruction_name, instruction_version, instruction_date, document_id, user_id, doctype_id) VALUES (upper(@instruction_id), @instruction_name, convert(float, @instruction_version), getDate(), upper(@document_id), @user_id, @doctype_id)",
};

export const registersQueries = {
  getAllRegisters: "SELECT * FROM registers",
  addNewRegister:
    "INSERT INTO registers (register_id, register_name, register_version, register_responsible, register_retentionTime, register_disposition, register_date, document_id, user_id, doctype_id) VALUES (upper(@register_id), @register_name, convert(float, @register_version), @register_responsible, @register_retentionTime, @register_disposition, getDate(), upper(@document_id), @user_id, @doctype_id)",
};

export const indicatorsQueries = {
  getAllIndicators: "SELECT * FROM indicators",
  addNewIndicator:
    "INSERT INTO indicators (indicator_activity, indicator_name, indicator_goal, indicator_measureMode, indicator_charControl, indicator_frequency, indicator_document, indicator_responsible, document_id, user_id) VALUES (@indicator_activity, @indicator_name, @indicator_goal, @indicator_measureMode, @indicator_charControl, @indicator_frequency, @indicator_document, @indicator_responsible, upper(@document_id), @user_id)",
};

export const risksQueries = {
  getAllRisks: "SELECT * FROM risks",
  addNewRisk:
    "INSERT INTO risks (risk_code, risk_activity, risk_description, risk_type, risk_factor, risk_consequence, risk_probability, risk_impact, risk_quadrant, risk_administration, risk_controls, risk_controlType, risk_controlActivity, risk_responsible, risk_startDate, risk_finishDate, document_id, user_id) VALUES (upper(@risk_code), @risk_activity, @risk_description, @risk_type, @risk_factor, @risk_consequence, convert(int, @risk_probability), convert(int, @risk_impact), convert(int, @risk_quadrant), @risk_administration, convert(bit, @risk_controls), @risk_controlType, @risk_controlActivity, @risk_responsible, @risk_startDate, @risk_finishDate, upper(@document_id), @user_id)",
  getAllRisksByProcedureId:
    "SELECT * FROM risks WHERE document_id = @document_id",
};
