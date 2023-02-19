-- SELECT role.id AS id, role.title AS title, role.salary AS salary, department.name AS department
-- FROM role
-- JOIN department ON role.department_id = department.id;

-- SELECT role.id AS Id, role.title AS Role, role.salary AS Salary, department.name AS department
-- From Role
-- JOIN department ON role.department_id = department.id

-- , department.name AS Dept FROM department JOIN department ON role.department_id = department.id;

SELECT employee.id AS ID, CONCAT(employee.first_name, ' ', employee.last_name) AS Name, role.title AS Role, role.salary AS Salary, department.name AS Department, IF(employee.manager_id IS NULL, 'Manager', CONCAT(employee2.first_name,' ', employee2.last_name)) AS Manager
From employee
JOIN role ON employee.role_id = role.id
JOIN department on role.department_id = department.id
LEFT JOIN employee employee2 ON employee.manager_id = employee2.id


`